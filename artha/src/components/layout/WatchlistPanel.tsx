"use client";

import { type Dispatch, useEffect, type SetStateAction } from "react";
import { useWatchlist } from "@/contexts/watchlist-context";
import {
    WatchlistPanel as ChartWatchlistPanel,
    type WatchlistConfig,
} from "@/components/charting/widgets/WatchlistPanel";

interface WatchlistPanelProps {
    config: WatchlistConfig;
    onConfigChange: Dispatch<SetStateAction<WatchlistConfig>>;
}

export function WatchlistPanel({ config, onConfigChange }: WatchlistPanelProps) {
    const { isWatchlistOpen, closeWatchlist } = useWatchlist();

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeWatchlist();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [closeWatchlist]);

    return (
        isWatchlistOpen ? (
            <div className="fixed right-0 bottom-0 top-14 z-30 flex">
                <ChartWatchlistPanel
                    config={config}
                    onConfigChange={onConfigChange}
                    onClose={closeWatchlist}
                    onSymbolSelect={() => closeWatchlist()}
                />
            </div>
        ) : null
    );
}
