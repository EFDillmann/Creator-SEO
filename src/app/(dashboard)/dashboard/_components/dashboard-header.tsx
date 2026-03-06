"use client";

import { useCallback, useRef, useState } from "react";
import { Icon } from "@/shared/components/ui/icon";

interface DashboardHeaderProps {
  onSearch: (term: string) => void;
}

export function DashboardHeader({ onSearch }: DashboardHeaderProps) {
  const [value, setValue] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setValue(term);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => onSearch(term), 300);
    },
    [onSearch]
  );

  return (
    <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-gray-100 bg-white/90 px-8 py-4 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-black">Dashboard</h2>
      <div className="relative w-96">
        <Icon
          name="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400"
        />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Buscar videos por título..."
          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-black placeholder-gray-400 transition-all focus:border-gray-400 focus:outline-none focus:ring-0"
        />
      </div>
    </header>
  );
}
