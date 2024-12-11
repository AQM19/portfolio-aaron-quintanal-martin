import { Skill } from "@/core/interfaces/skills/skill.interface";

export const SkillConfig: Skill[] = [
    {
        nemonic: "android",
        name: 'Android',
        alt: new Map([
            ['en', 'Android logo'],
            ['es', 'Logotipo de Android']
        ]),
        isEnabled: true
    },
    {
        nemonic: "angular",
        name: 'Angular',
        alt: new Map([
            ['en', 'Angular logo'],
            ['es', 'Logotipo de Angular']
        ]),
        isEnabled: true
    },
    {
        nemonic: "c-sharp",
        name: 'C#',
        alt: new Map([
            ['en', 'C# logo'],
            ['es', 'Logotipo de C#']
        ]),
        isEnabled: true
    },
    {
        nemonic: "dot-net-core",
        name: 'EF Core',
        alt: new Map([
            ['en', '.NET Core logo'],
            ['es', 'Logotipo de .NET Core']
        ]),
        isEnabled: true
    },
    {
        nemonic: "java",
        name: 'Java',
        alt: new Map([
            ['en', 'Java logo'],
            ['es', 'Logotipo de Java']
        ]),
        isEnabled: true
    },
    {
        nemonic: "javascript",
        name: 'Javascript',
        alt: new Map([
            ['en', 'JavaScript logo'],
            ['es', 'Logotipo de JavaScript']
        ]),
        isEnabled: true
    },
    {
        nemonic: "kotlin",
        name: 'Kotlin',
        alt: new Map([
            ['en', 'Kotlin logo'],
            ['es', 'Logotipo de Kotlin']
        ]),
        isEnabled: true
    },
    {
        nemonic: "nextjs",
        name: 'Nextjs',
        alt: new Map([
            ['en', 'Next.js logo'],
            ['es', 'Logotipo de Next.js']
        ]),
        isEnabled: true
    },
    {
        nemonic: "react",
        name: 'React',
        alt: new Map([
            ['en', 'React logo'],
            ['es', 'Logotipo de React']
        ]),
        isEnabled: false
    },
];
