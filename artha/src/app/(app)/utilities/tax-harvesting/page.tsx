"use client";

import React, { useState } from "react";
import { Scissors, Share2, Info, ArrowRight } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LTCG_LIMIT = 125000;
const LTCG_TAX_RATE = 0.125;

export default function TaxHarvestingPage() {
    const [fundName, setFundName] = useState("My Equity Fund");
    const [totalUnits, setTotalUnits] = useState<number>(1000);
    const [buyNav, setBuyNav] = useState<number>(100);
    const [currentNav, setCurrentNav] = useState<number>(150);

    const profitPerUnit = Math.max(0, currentNav - buyNav);
    const totalUnrealizedGain = profitPerUnit * totalUnits;

    // Prevent division by zero or negative profit
    const maxTaxFreeUnits = profitPerUnit > 0 ? Math.floor(LTCG_LIMIT / profitPerUnit) : totalUnits;

    // We can't sell more units than we have
    const unitsToSell = Math.min(totalUnits, maxTaxFreeUnits);

    const harvestedGain = unitsToSell * profitPerUnit;
    const sellValue = unitsToSell * currentNav;

    // Tax saved by harvesting this amount under the 1.25L limit instead of paying 12.5%
    const taxSaved = harvestedGain * LTCG_TAX_RATE;

    const remainingLtcgLimit = Math.max(0, LTCG_LIMIT - harvestedGain);
    const remainingUnits = totalUnits - unitsToSell;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-1 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <Scissors size={24} style={{ color: "var(--accent-brand)" }} />
                    Mutual Fund Tax Harvesting Optimizer
                </h1>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Optimize your ₹1.25 Lakh tax-free limit. Calculate exactly how many units of an equity fund to sell and buy back.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-6">
                {/* Input Section */}
                <div className="lg:col-span-1 p-5 rounded-xl border space-y-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                    <h2 className="text-sm font-semibold mb-2 uppercase tracking-widest text-[#6b7280]">Fund Details (<span className="lowercase">&gt;</span>1 year old)</h2>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Fund Name</label>
                        <Input type="text" value={fundName} onChange={(e) => setFundName(e.target.value)} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Total Eligible Units</label>
                        <Input type="number" value={totalUnits || ""} onChange={(e) => setTotalUnits(Number(e.target.value))} className="font-mono" />
                        <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>Units held for more than 365 days.</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Avg Buy NAV</label>
                            <Input type="number" value={buyNav || ""} onChange={(e) => setBuyNav(Number(e.target.value))} className="font-mono" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Current NAV</label>
                            <Input type="number" value={currentNav || ""} onChange={(e) => setCurrentNav(Number(e.target.value))} className="font-mono" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 pt-2">
                        <label className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Total Unrealized Gain</label>
                        <div className="p-2.5 rounded-md border font-mono text-sm bg-black/5 flex justify-between">
                            <span>{formatINR(totalUnrealizedGain)}</span>
                            <span style={{ color: profitPerUnit > 0 ? "var(--positive)" : "var(--negative)" }}>{profitPerUnit > 0 ? "+" : ""}{formatINR(profitPerUnit)}/unit</span>
                        </div>
                    </div>

                    <Button onClick={() => navigator.clipboard.writeText(window.location.href)} variant="outline" className="w-full text-xs gap-1.5 mt-2">
                        <Share2 size={13} /> Share Tool
                    </Button>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="p-6 rounded-xl border relative overflow-hidden" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                        {/* Highlight bar */}
                        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "var(--accent-brand)" }}></div>

                        <h2 className="text-lg font-medium mb-1" style={{ color: "var(--text-primary)" }}>Action Plan: Harvest {formatINR(sellValue)}</h2>
                        <p className="text-sm mb-6 pb-4 border-b" style={{ color: "var(--text-secondary)", borderColor: "var(--border-subtle)" }}>
                            To perfectly utilize your ₹1.25L tax-free bucket without overshooting, execute the following trades immediately (on the same day).
                        </p>

                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-widest text-[#6b7280]">Step 1: Sell</span>
                                <div className="mt-2 text-3xl font-mono font-bold" style={{ color: "var(--text-primary)" }}>
                                    {unitsToSell.toLocaleString()} <span className="text-sm font-sans font-normal" style={{ color: "var(--text-secondary)" }}>units</span>
                                </div>
                            </div>

                            <div>
                                <span className="text-xs font-semibold uppercase tracking-widest text-[#6b7280]">Step 2: Buy Back Immediately</span>
                                <div className="mt-2 text-3xl font-mono font-bold" style={{ color: "var(--text-primary)" }}>
                                    {formatINR(sellValue)} <span className="text-sm font-sans font-normal" style={{ color: "var(--text-secondary)" }}>value</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: "var(--border-subtle)" }}>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-green-500/10 text-green-500">
                                    ₹
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-widest font-medium text-[#6b7280]">Tax Saved Today</div>
                                    <div className="text-lg font-mono font-bold text-green-500">{formatINR(taxSaved)}</div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-xs uppercase tracking-widest font-medium text-[#6b7280]">LTCG Utilized</div>
                                <div className="text-sm font-mono" style={{ color: "var(--text-primary)" }}>
                                    {formatINR(harvestedGain)} <span className="text-[#6b7280]">/ {formatINR(LTCG_LIMIT)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl border flex items-start gap-3 text-sm" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)", color: "var(--text-secondary)" }}>
                        <Info size={16} className="mt-0.5 shrink-0" style={{ color: "var(--accent-brand)" }} />
                        <div>
                            <strong style={{ color: "var(--text-primary)" }}>Why do this?</strong> By selling {unitsToSell.toLocaleString()} units and immediately buying them back, your new "Average Buy NAV" for these units becomes {formatINR(currentNav)}. Next year, if the NAV hits ₹200, your taxable profit is calculated from {formatINR(currentNav)}, not {formatINR(buyNav)}, saving you thousands in LTCG tax.
                        </div>
                    </div>

                    {remainingUnits > 0 && profitPerUnit > 0 && (
                        <div className="text-sm px-2 text-orange-500/80">
                            <strong>Note:</strong> You still have {remainingUnits.toLocaleString()} units with an unrealized gain of {formatINR(remainingUnits * profitPerUnit)}. Selling more will trigger 12.5% tax. Harvest them next financial year!
                        </div>
                    )}
                </div>
            </div>

            {/* SEO Guide & Content Below Fold */}
            <div className="mt-16  mx-auto space-y-12 pb-10" style={{ color: "var(--text-primary)" }}>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">What is Mutual Fund Tax Harvesting?</h2>
                    <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        Tax Harvesting is a completely legal, highly effective wealth optimization strategy in India. Under current income tax laws (as of the recent budget), Long-Term Capital Gains (LTCG) on Equity Mutual Funds are <strong>tax-free up to ₹1.25 Lakhs per financial year</strong>. Any gains above ₹1.25 Lakhs are taxed at a flat 12.5%.
                    </p>
                    <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        If you don&apos;t use this ₹1.25L limit by March 31st, it expires. You cannot carry it forward to the next year. Tax Harvesting solves this "use it or lose it" problem.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">How does the Tax Harvesting Strategy work?</h2>
                    <div className="grid sm:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 rounded-lg border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                            <h3 className="font-medium text-lg mb-2 text-[var(--accent-brand)]">Step 1: The Sell</h3>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                You systematically sell just enough units of your mutual fund to book exactly ₹1.25 Lakhs of profit. Because this profit is within the exempt limit, you pay absolute zero tax on this withdrawal.
                            </p>
                        </div>
                        <div className="p-5 flex items-center justify-center -my-2 sm:hidden">
                            <ArrowRight size={24} className="rotate-90 text-neutral-400" />
                        </div>
                        <div className="hidden sm:flex items-center justify-center -mx-4 z-10 w-8 h-full"></div>
                        <div className="p-5 rounded-lg border relative" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                            <div className="hidden sm:block absolute -left-7 top-1/2 -translate-y-1/2 bg-neutral-100 rounded-full p-1 dark:bg-neutral-800 border">
                                <ArrowRight size={16} className="text-neutral-500" />
                            </div>
                            <h3 className="font-medium text-lg mb-2 text-green-500">Step 2: The Buyback</h3>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                                On the exact same day, you reinvest the entire amount back into the exact same mutual fund. Your portfolio value remains unchanged, but your <strong>Purchase Price (NAV) artificially jumps up</strong> to today&apos;s price. This mathematically permanently erases ₹1.25L of future taxable gains.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">The Rules of Harvesting</h2>
                    <ul className="list-disc pl-5 space-y-2" style={{ color: "var(--text-secondary)" }}>
                        <li><strong>The 365 Day Rule:</strong> This only applies to units held for more than 1 year. Units sold before 1 year incur Short-Term Capital Gains (STCG) tax at 20%. Our calculator assumes you are entering units older than 1 year.</li>
                        <li><strong>Exit Loads:</strong> Most equity funds charge a 1% exit load if you sell within a year. Since tax harvesting only applies to units &gt; 1 year old, exit loads are generally zero.</li>
                        <li><strong>Same-Day Execution:</strong> You must buy back the units on the same day to minimize the risk of the NAV changing between your sell and buy orders. Some platforms offer instant SWP/STP to automate this.</li>
                    </ul>
                </section>

            </div>
        </div>
    );
}
