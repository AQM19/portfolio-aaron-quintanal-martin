export interface Skill {
    nemonic: string;
    name: string;
    alt: Map<string, string>;
    isEnabled: boolean;
    isFavourite: boolean;
    type: SkillType;
    /** Defaults to `/svg/{nemonic}.svg`. */
    iconUrl?: string;
}

type SkillType = 'language' | 'framework' | 'library' | 'tool';