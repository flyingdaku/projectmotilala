"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { apiGet } from "@/lib/api-client";
import type { StockSummary } from "@/lib/api-types";
import { cn } from "@/lib/utils";

interface AssetSearchProps {
  onSelect: (symbol: string) => void;
  placeholder?: string;
  className?: string;
}

interface SearchResult {
  symbol: string;
  name: string;
  exchange?: string;
}

export function AssetSearch({ onSelect, placeholder = "Search assets...", className }: AssetSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await apiGet<{ results: StockSummary[] }>("/api/search", { q: query, limit: 10 });
        setResults((data.results || []).map((item) => ({
          symbol: item.symbol,
          name: item.name,
          exchange: item.exchange,
        })));
        setIsOpen(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const updateDropdownPos = useCallback((attempts: number | any = 0) => {
    // If called from an event listener, attempts will be an Event object
    const actualAttempts = typeof attempts === 'number' ? attempts : 0;
    
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      
      // If position is (0,0) and we haven't reached max attempts, retry next frame
      // This handles the case where the element is still being animated or mounted
      if (rect.top === 0 && rect.left === 0 && actualAttempts < 10) {
        requestAnimationFrame(() => updateDropdownPos(actualAttempts + 1));
        return;
      }
      
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      updateDropdownPos(0);
      const handleRefresh = () => updateDropdownPos(0);
      window.addEventListener("scroll", handleRefresh, true);
      window.addEventListener("resize", handleRefresh);
      return () => {
        window.removeEventListener("scroll", handleRefresh, true);
        window.removeEventListener("resize", handleRefresh);
      };
    }
  }, [isOpen, updateDropdownPos]);

  const handleSelect = (symbol: string) => {
    onSelect(symbol);
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <div ref={inputRef} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim() && results.length > 0) setIsOpen(true);
            updateDropdownPos();
          }}
          placeholder={placeholder}
          className="pl-9 pr-9"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {isOpen && typeof document !== "undefined" && createPortal(
        <div 
          className="absolute z-[9999] mt-1 bg-popover border border-border rounded-md shadow-lg overflow-hidden flex flex-col pointer-events-auto"
          style={{ 
            top: `${dropdownPos.top}px`, 
            left: `${dropdownPos.left}px`, 
            width: dropdownPos.width,
            maxHeight: '240px'
          }}
          onMouseDown={e => e.preventDefault()}
        >
          {results.length > 0 ? (
            <div className="overflow-y-auto w-full">
              {results.map((result) => (
                <button
                  key={result.symbol}
                  onClick={() => handleSelect(result.symbol)}
                  className="w-full px-3 py-2 text-left hover:bg-accent transition-colors flex items-center justify-between group"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{result.symbol}</span>
                    {result.name && (
                      <span className="text-xs text-muted-foreground truncate">{result.name}</span>
                    )}
                  </div>
                  {result.exchange && (
                    <span className="text-xs text-muted-foreground">{result.exchange}</span>
                  )}
                </button>
              ))}
            </div>
          ) : query.trim() && !isLoading && (
            <div className="p-3">
              <p className="text-sm text-muted-foreground text-center">No results found</p>
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}
