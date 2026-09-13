import { Sun, Moon, Palette } from 'lucide-react';

export type Theme = 'light' | 'dark' | 'sepia';

interface ThemeToggleProps {
  theme: Theme;
  onChange: (theme: Theme) => void;
}

const themes: { value: Theme; label: string; tooltip: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', tooltip: 'Analog Paper (#FAF7F2)', icon: Sun },
  { value: 'sepia', label: 'Sepia', tooltip: 'Vintage Book Warmth', icon: Palette },
  { value: 'dark', label: 'Dark', tooltip: 'Darkroom / Studio Film', icon: Moon },
];

export function ThemeToggle({ theme, onChange }: ThemeToggleProps) {
  return (
    <div
      className="flex items-center gap-0.5 rounded-xl border border-paper-border bg-surface/70 p-0.5 shadow-inner"
      role="radiogroup"
      aria-label="Theme selector"
    >
      {themes.map(({ value, label, tooltip, icon: Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            role="radio"
            aria-checked={isActive}
            aria-label={`${label} mode`}
            className={`flex items-center justify-center rounded-lg p-1.5 transition-all duration-200 active:scale-95 ${
              isActive
                ? 'bg-accent text-paper shadow-xs font-bold'
                : 'text-ink-subtle hover:text-ink hover:bg-surface-hover'
            }`}
            title={tooltip}
          >
            <Icon size={14} />
          </button>
        );
      })}
    </div>
  );
}

