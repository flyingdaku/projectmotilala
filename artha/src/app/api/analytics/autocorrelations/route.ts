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
        const maxLagStr = searchParams.get('maxLag') || '10';
        
        if (!assetsStr) {
            return NextResponse.json({ error: 'Assets are required' }, { status: 400 });
        }

        const maxLag = parseInt(maxLagStr, 10) || 10;
        const assets = assetsStr.split(',').filter(a => a.trim().length > 0);

        const adapter = await getDataAdapter();
        
        const now = new Date();
        const start = new Date();
        if (periodStr === '1y') start.setFullYear(now.getFullYear() - 1);
        else if (periodStr === '5y') start.setFullYear(now.getFullYear() - 5);
        else start.setFullYear(now.getFullYear() - 3);

        const startStr = start.toISOString().split('T')[0];
        
        const results: Record<string, number[]> = {};
        
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
                
                // compute daily returns
                const returns: number[] = [];
                for (let i = 1; i < prices.length; i++) {
                    const prev = prices[i - 1].close;
                    const curr = prices[i].close;
                    if (prev > 0) {
                        returns.push((curr - prev) / prev);
                    } else {
                        returns.push(0);
                    }
                }
                
                // compute autocorrelations up to maxLag
                const autoCorr: number[] = [];
                for (let lag = 1; lag <= maxLag; lag++) {
                    if (returns.length > lag) {
                        const r1 = returns.slice(lag);
                        const r2 = returns.slice(0, returns.length - lag);
                        autoCorr.push(pearsonCorrelation(r1, r2));
                    } else {
                        autoCorr.push(0);
                    }
                }
                results[assetId] = autoCorr;
            } else {
                results[assetId] = Array(maxLag).fill(0);
            }
        }
        
        return NextResponse.json({ results, assets });
    } catch (error) {
        console.error('Autocorrelation API error:', error);
        return NextResponse.json(
            { error: 'Failed to calculate autocorrelations', details: String(error) },
            { status: 500 }
        );
    }
}
