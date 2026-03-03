import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Advanced FIRE Calculator India | Early Retirement Planner | Artha',
    description: 'Calculate your exact Financial Independence (FIRE) target corpus and required monthly SIP. Adjusts for Indian inflation, life expectancy, and post-retirement returns.',
    keywords: ['fire calculator india', 'early retirement calculator', 'financial independence retire early', 'how much money needed to retire in india', 'sip for retirement calculator', '4 percent rule india'],
    openGraph: {
        title: 'Advanced FIRE Calculator | Artha',
        description: 'When can you retire? Stop guessing. Build your exact FIRE timeline, adjusted for high Indian inflation and changing post-retirement returns.',
        type: 'website',
    },
};

export default function FireCalculatorLayout({
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
                name: 'How much money do I need to retire early in India?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The exact amount depends on your current expenses and the inflation rate. Because of India\'s higher inflation (typically 6-7%), the standard "4% Rule" from the US often fails. This calculator finds your exact target corpus by simulating a drawdown phase that factors in your specific life expectancy and post-retirement safe-withdrawal return rate.',
                },
            },
            {
                '@type': 'Question',
                name: 'Does this calculator account for inflation?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. It calculates the future value of your current expenses at your desired retirement age, and then continues to inflate those expenses every single year during your retirement (drawdown) phase until your life expectancy age.',
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
