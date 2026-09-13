import { Camera, Aperture, Focus, X } from 'lucide-react';
import type { CameraBody, CameraInfo } from '../types';
import { cameras } from '../data/cameras';

interface BodySelectorProps {
  active: CameraBody | null;
  onChange: (body: CameraBody | null) => void;
}

const iconMap = {
  Camera: Camera,
  Aperture: Aperture,
  Focus: Focus,
};

export function BodySelector({ active, onChange }: BodySelectorProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
      <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-subtle">
        Body Hub
      </span>
      <div className="flex items-center gap-1.5">
        {cameras.map((cam: CameraInfo) => {
          const Icon = iconMap[cam.icon as keyof typeof iconMap] ?? Camera;
          const isActive = active === cam.body;
          return (
            <button
              key={cam.body}
              onClick={() => onChange(isActive ? null : cam.body)}
              className={`group flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-accent text-paper shadow-sm ring-2 ring-accent/30'
                  : 'border border-paper-border bg-paper-card text-ink-muted hover:border-accent/40 hover:text-ink hover:shadow-xs'
              }`}
              aria-pressed={isActive}
              aria-label={`Chọn thân máy ${cam.label}`}
            >
              <Icon size={14} className={isActive ? 'text-paper' : 'text-accent group-hover:scale-110 transition-transform'} />
              <span className="font-mono font-bold">{cam.body}</span>
            </button>
          );
        })}
      </div>
      {active && (
        <button
          onClick={() => onChange(null)}
          className="flex items-center gap-1 rounded-lg border border-transparent bg-surface px-2 py-1.5 text-[11px] font-medium text-ink-subtle transition-colors hover:border-paper-border hover:bg-surface-hover hover:text-ink"
          aria-label="Bỏ chọn thân máy"
          title="Bỏ lọc thân máy"
        >
          <X size={13} />
          <span>Tất cả</span>
        </button>
      )}
    </div>
  );
}

