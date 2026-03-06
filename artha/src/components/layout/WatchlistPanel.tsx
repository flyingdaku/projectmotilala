"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type Dispatch, useEffect, type SetStateAction } from "react";
import { useWatchlist } from "@/contexts/watchlist-context";
import {
    WatchlistPanel as ChartWatchlistPanel,
    getWatchlistPanelWidth,
    type WatchlistConfig,
} from "@/components/charting/widgets/WatchlistPanel";

interface WatchlistPanelProps {
    config: WatchlistConfig;
    onConfigChange: Dispatch<SetStateAction<WatchlistConfig>>;
}

export function WatchlistPanel({ config, onConfigChange }: WatchlistPanelProps) {
    const { isWatchlistOpen, closeWatchlist } = useWatchlist();
    const panelWidth = getWatchlistPanelWidth(config);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeWatchlist();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [closeWatchlist]);

    return (
        <AnimatePresence>
            {isWatchlistOpen && (
                <motion.div
                    initial={{ x: panelWidth }}
                    animate={{ x: 0 }}
                    exit={{ x: panelWidth }}
                    transition={{ type: "spring", damping: 25, stiffness: 220 }}
                    className="fixed right-0 bottom-0 top-14 z-30 flex"
                >
                    <ChartWatchlistPanel
                        config={config}
                        onConfigChange={onConfigChange}
                        onClose={closeWatchlist}
                        onSymbolSelect={() => closeWatchlist()}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
