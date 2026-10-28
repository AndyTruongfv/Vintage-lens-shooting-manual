import { useLanguage } from '../context/LanguageContext';
import type { LensVaultItem, Language } from '../types';

export interface TranslatedLens {
  displayName: string;
  name: string;
  location: string;
  category: string;
  condition: string;
  history: string;
  strengths: string;
  milestones: string;
  goldenMilestones: string;
  nickname: string;
  mount: string;
  specialFeatures: string[];
  acquisition?: LensVaultItem['acquisition'];
  media?: LensVaultItem['media'];
  content?: LensVaultItem['content'];
}

export function getTranslatedLens(lens: LensVaultItem, currentLang: Language = 'vi'): TranslatedLens {
  const isEn = currentLang === 'en';

  const history =
    lens.content?.history?.[currentLang] ||
    (isEn ? lens.historyEn || lens.history : lens.history) ||
    '';

  const strengths =
    lens.content?.strengths?.[currentLang] ||
    (isEn ? lens.strengthsEn || lens.strengths : lens.strengths) ||
    '';

  const milestones =
    lens.content?.milestones?.[currentLang] ||
    (isEn ? lens.goldenMilestonesEn || lens.goldenMilestones : lens.goldenMilestones) ||
    '';

  const condition =
    lens.acquisition?.condition?.[currentLang] ||
    (typeof lens.acquisition?.notes === 'string'
      ? lens.acquisition.notes
      : lens.acquisition?.notes?.[currentLang] || '');

  const location =
    lens.location ||
    (lens.base === 'Vietnam'
      ? (isEn ? 'Vietnam Base' : 'Việt Nam Base')
      : (isEn ? 'Finland Base' : 'Phần Lan Base'));

  const specialFeatures =
    lens.content?.features?.[currentLang] ||
    (isEn ? lens.specialFeaturesEn || lens.specialFeatures : lens.specialFeatures) ||
    [];

  return {
    displayName: lens.displayName || lens.name,
    name: lens.name,
    location,
    category: lens.category || (isEn ? 'Vintage Classic' : 'Kinh điển Cổ xưa'),
    condition,
    history,
    strengths,
    milestones,
    goldenMilestones: milestones,
    nickname: (isEn ? lens.nicknameEn || lens.nickname : lens.nickname) || '',
    mount: (isEn ? lens.mountEn || lens.mount : lens.mount) || '',
    specialFeatures,
    acquisition: lens.acquisition,
    media: lens.media,
  };
}

/**
 * React hook to translate a lens according to current app language or custom language
 */
export function useLensTranslation(lens?: LensVaultItem | null, customLang?: Language): TranslatedLens | null {
  const { lang } = useLanguage();
  const currentLang = customLang || lang;
  if (!lens) return null;
  return getTranslatedLens(lens, currentLang);
}
