import type { Category } from '../types';

interface FilterPillsProps {
  active: Category | 'All';
  onChange: (category: Category | 'All') => void;
}

const pills: { value: Category | 'All'; label: string }[] = [
  { value: 'All', label: 'Tất cả (13)' },
  { value: 'Portraits', label: 'Portraits' },
  { value: 'Cinema/Film', label: 'Cinema / Film' },
  { value: 'Landscape/Macro', label: 'Macro & Tĩnh vật' },
  { value: 'Street/B&W', label: 'Street / B&W' },
];

export function FilterPills({ active, onChange }: FilterPillsProps) {
  return (
    <div
      className="no-scrollbar flex gap-2 overflow-x-auto py-0.5"
      role="tablist"
      aria-label="Danh mục công thức màu"
    >
      {pills.map(({ value, label }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            role="tab"
            aria-selected={isActive}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-xs font-bold transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-accent text-paper shadow-sm ring-1 ring-accent/30'
                : 'border border-paper-border bg-paper-card text-ink-muted hover:border-accent/40 hover:text-ink'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

