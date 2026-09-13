import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle"
        size={17}
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm theo tên recipe (C-1, Portra), lens (Bokina, Tokina), ánh sáng..."
        className="w-full rounded-2xl border border-paper-border bg-paper-card py-2.5 pl-10 pr-10 text-xs sm:text-sm text-ink placeholder-ink-subtle shadow-xs transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        aria-label="Tìm kiếm công thức màu"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1 text-ink-subtle transition-colors hover:bg-surface-hover hover:text-ink"
          aria-label="Xóa tìm kiếm"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}

