import type { Category } from '../types';
import { recipes } from '../data/recipes';
import { useLanguage } from '../context/LanguageContext';

interface FilterPillsProps {
  active: Category | 'All';
  onChange: (category: Category | 'All') => void;
}

export function FilterPills({ active, onChange }: FilterPillsProps) {
  const { strings } = useLanguage();

  const pills: { value: Category | 'All'; label: string }[] = [
    { value: 'All', label: `${strings.filterAll} (${recipes.length})` },
    { value: 'Portraits', label: strings.filterPortraits },
    { value: 'Cinema/Film', label: strings.filterCinema },
    { value: 'Landscape/Macro', label: strings.filterLandscape },
    { value: 'Street/B&W', label: strings.filterStreet },
  ];

  return (
    <div
      className="no-scrollbar flex gap-2 overflow-x-auto py-0.5"
      role="tablist"
      aria-label="Filter pills"
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
