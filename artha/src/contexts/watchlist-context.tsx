'use client';

import React, { createContext, useContext, useState } from "react";

interface WatchlistContextValue {
  isWatchlistOpen: boolean;
  toggleWatchlist: () => void;
  openWatchlist: () => void;
  closeWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextValue>({
  isWatchlistOpen: false,
  toggleWatchlist: () => { },
  openWatchlist: () => { },
  closeWatchlist: () => { },
});

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

  const toggleWatchlist = () => setIsWatchlistOpen(prev => !prev);
  const openWatchlist = () => setIsWatchlistOpen(true);
  const closeWatchlist = () => setIsWatchlistOpen(false);

  return (
    <WatchlistContext.Provider value={{
      isWatchlistOpen,
      toggleWatchlist,
      openWatchlist,
      closeWatchlist,
    }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}
