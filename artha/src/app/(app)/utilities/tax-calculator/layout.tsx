import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Old vs New Tax Regime Calculator FY 2024-25 | Artha',
    description: 'Advanced India income tax calculator for salary and capital gains (STCG/LTCG). Compare old vs new regime slabs and find out which saves you more.',
    keywords: ['old vs new tax regime calculator', 'income tax calculator india', 'salary after tax calculator', 'capital gains tax calculator india', 'stcg tax', 'ltcg tax'],
    openGraph: {
        title: 'Old vs New Tax Regime Calculator | Artha',
        description: 'Calculate your exact tax liability under the Old and New regimes. Fully integrates Salary, 80C, HRA, and Equity Capital Gains (STCG/LTCG).',
        type: 'website',
    },
};

export default function TaxCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Does the calculator include tax on Mutual Funds and Stocks?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Unlike basic income tax calculators, this tool accurately integrates Long-Term Capital Gains (12.5% above ₹1.25L) and Short-Term Capital Gains (20%) into your overall slab calculations for both regimes.',
                },
            },
            {
                '@type': 'Question',
                name: 'What happens if my salary is below the Basic Exemption Limit but I have Capital Gains?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The calculator follows the Income Tax Act rules for resident Indians: any shortfall in the basic exemption limit (₹2.5L in Old Regime, ₹3L in New Regime) is first adjusted against your STCG and LTCG, thereby reducing your capital gains tax liability.',
                },
            }
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
