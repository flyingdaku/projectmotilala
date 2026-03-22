import { NextResponse } from 'next/server';
import { getDataAdapter } from '../../../../lib/data';

// Helper to compute pearson correlation
function pearsonCorrelation(x: number[], y: number[]) {
    if (x.length !== y.length || x.length === 0) return 0;
    const n = x.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumX2 += x[i] * x[i];
        sumY2 += y[i] * y[i];
    }
    const numerator = (n * sumXY) - (sumX * sumY);
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    if (denominator === 0) return 0;
    return numerator / denominator;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const assetsStr = searchParams.get('assets');
        const periodStr = searchParams.get('period') || '3y'; // 1y, 3y, 5y
        
        if (!assetsStr) {
            return NextResponse.json({ error: 'Assets are required' }, { status: 400 });
        }

        const assets = assetsStr.split(',').filter(a => a.trim().length > 0);
        if (assets.length < 2) {
            return NextResponse.json({ error: 'At least two assets are required' }, { status: 400 });
        }

        const adapter = await getDataAdapter();
        
        const now = new Date();
        const start = new Date();
        if (periodStr === '1y') start.setFullYear(now.getFullYear() - 1);
        else if (periodStr === '5y') start.setFullYear(now.getFullYear() - 5);
        else start.setFullYear(now.getFullYear() - 3);

        const startStr = start.toISOString().split('T')[0];
        
        // Dictionary to hold daily prices
        const priceData: Record<string, Record<string, number>> = {};
        const allDates = new Set<string>();
        
        // Fetch dates
        for (const assetId of assets) {
            let resolvedId = -1;
            
            if (!isNaN(parseInt(assetId))) {
                const stock = await adapter.stocks.getById(parseInt(assetId));
                if (stock) resolvedId = stock.id;
            }
            
            if (resolvedId === -1) {
                const stock = await adapter.stocks.getBySymbol(assetId);
                if (stock) resolvedId = stock.id;
            }
            
            if (resolvedId !== -1) {
                const prices = await adapter.prices.getPrices(resolvedId, { startDate: startStr });
                priceData[assetId] = {};
                for (const p of prices) {
                    priceData[assetId][p.date] = p.close;
                    allDates.add(p.date);
                }
            } else {
                priceData[assetId] = {};
            }
        }
        
        // Sort dates to compute returns
        const sortedDates = Array.from(allDates).sort();
        
        // Compute daily returns
        const returnData: Record<string, number[]> = {};
        for (const asset of assets) {
            returnData[asset] = [];
            let prevPrice: number | null = null;
            
            for (const date of sortedDates) {
                const currentPrice = priceData[asset][date];
                if (currentPrice !== undefined && prevPrice !== null) {
                    returnData[asset].push((currentPrice - prevPrice) / prevPrice);
                } else if (currentPrice !== undefined) {
                    // Start of sequence for this asset
                } else {
                    // Missing data, maybe push 0 or drop? Let's push 0 for now
                    returnData[asset].push(0);
                }
                if (currentPrice !== undefined) {
                    prevPrice = currentPrice;
                }
            }
        }
        
        // Compute correlation matrix
        const matrix: Record<string, Record<string, number>> = {};
        for (const a1 of assets) {
            matrix[a1] = {};
            for (const a2 of assets) {
                if (a1 === a2) {
                    matrix[a1][a2] = 1.0;
                } else if (returnData[a1] && returnData[a2] && returnData[a1].length > 0 && returnData[a1].length === returnData[a2].length) {
                    matrix[a1][a2] = pearsonCorrelation(returnData[a1], returnData[a2]);
                } else {
                    matrix[a1][a2] = 0;
                }
            }
        }
        
        return NextResponse.json({ matrix, assets, priceData });
    } catch (error) {
        console.error('Correlation API error:', error);
        return NextResponse.json(
            { error: 'Failed to calculate correlations', details: String(error) },
            { status: 500 }
        );
    }
}
