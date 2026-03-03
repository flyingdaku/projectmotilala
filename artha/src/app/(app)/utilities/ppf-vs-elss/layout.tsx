import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PPF vs ELSS Calculator | Compare 15 Year Returns | Artha',
    description: 'Visually compare the true cost of locking your money in PPF at 7.1% versus investing in an ELSS mutual fund. Includes exact post-tax corpus calculations.',
    keywords: ['ppf calculator', 'elss calculator', 'ppf vs elss', 'ppf interest rate calculator', 'elss mutual fund return calculator', 'tax saving investment calculator'],
    openGraph: {
        title: 'PPF vs ELSS Calculator | Artha',
        description: 'Stop guessing about 80C tax saving. Use real mathematics to find out exactly how much wealth you lose by choosing the "safe" PPF over Equity.',
        type: 'website',
    },
};

export default function PpfVsElssLayout({
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
                name: 'Is PPF better than ELSS for long-term investing?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Mathematically, ELSS has historically generated significantly higher returns than PPF over 15-year periods. While PPF is risk-free and tax-free (EEE), an ELSS fund growing at 12-14% vastly outperforms the 7.1% PPF rate, even after deducting the 12.5% Long-Term Capital Gains (LTCG) tax.',
                },
            },
            {
                '@type': 'Question',
                name: 'Does this calculator include LTCG tax on ELSS?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. To provide a fair "Apples to Apples" comparison with the tax-free PPF, this calculator automatically deducts the 12.5% Long-Term Capital Gains (LTCG) tax from the final ELSS maturity amount.',
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
