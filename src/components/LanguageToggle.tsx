import { useLanguage } from '../context/LanguageContext';

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="flex items-center gap-0.5 rounded-xl border border-paper-border bg-surface/70 p-0.5 shadow-inner"
      role="group"
      aria-label="Language selector"
    >
      <button
        onClick={() => setLang('vi')}
        className={`flex items-center justify-center rounded-lg px-2 py-1 font-mono text-[10px] sm:text-[11px] font-extrabold transition-all duration-200 active:scale-95 ${
          lang === 'vi'
            ? 'bg-accent text-paper shadow-xs'
            : 'text-ink-subtle hover:text-ink hover:bg-surface-hover'
        }`}
        title="Tiếng Việt (Vietnamese)"
        aria-pressed={lang === 'vi'}
      >
        VI
      </button>
      <button
        onClick={() => setLang('en')}
        className={`flex items-center justify-center rounded-lg px-2 py-1 font-mono text-[10px] sm:text-[11px] font-extrabold transition-all duration-200 active:scale-95 ${
          lang === 'en'
            ? 'bg-accent text-paper shadow-xs'
            : 'text-ink-subtle hover:text-ink hover:bg-surface-hover'
        }`}
        title="English"
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  );
}
