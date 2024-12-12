export interface Skill {
    nemonic: string;
    name: string;
    alt: Map<string, string>;
    isEnabled: boolean;
    isFavourite: boolean;
    type: SkillType;
}

type SkillType = 'language' | 'framework' | 'library' | 'tool';