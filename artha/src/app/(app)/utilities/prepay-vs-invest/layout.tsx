import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Prepay Home Loan vs Invest in SIP Calculator | Artha',
    description: 'Mathematically compare whether you should prepay your home loan EMI or invest that extra money in mutual funds. Includes India LTCG tax calculations.',
    keywords: ['prepay home loan vs invest calculator', 'home loan prepayment calculator', 'invest or pay off mortgage calculator india', 'home loan emi calculator', 'prepayment vs sip'],
    openGraph: {
        title: 'Prepay Home Loan vs Invest in SIP Calculator | Artha',
        description: 'Stop guessing. Use real mathematics to find out if you should prepay your loan or invest in an index fund for higher net worth.',
        type: 'website',
    },
};

export default function PrepayVsInvestLayout({
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
                name: 'Should I prepay my home loan or invest in mutual funds?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Mathematically, if your expected post-tax return from investing (e.g., 10-12% from equity SIPs) is higher than your home loan interest rate (e.g., 8.5%), you will end up with a higher net worth by investing. However, prepaying a loan offers guaranteed, risk-free savings and psychological peace of mind. This calculator helps you compare the exact rupee difference between the two strategies.',
                },
            },
            {
                '@type': 'Question',
                name: 'Does this calculator factor in Income Tax (LTCG)?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. For the investment scenario, the calculator deducts the 12.5% Long-Term Capital Gains (LTCG) tax (applicable after the ₹1.25 Lakh tax-free limit) from your final mutual fund corpus to provide an accurate, post-tax comparison against loan prepayment.',
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
