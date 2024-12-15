import { Skill } from "@/core/interfaces/skills/skill.interface";

export const SkillConfig: Skill[] = [
    // Lenguajes de programación
    {
        nemonic: "javascript",
        name: "JavaScript",
        alt: new Map([
            ["en", "JavaScript logo"],
            ["es", "Logotipo de JavaScript"]
        ]),
        isEnabled: false,
        isFavourite: false,
        type: "language"
    },
    {
        nemonic: "typescript",
        name: "TypeScript",
        alt: new Map([
            ["en", "TypeScript logo"],
            ["es", "Logotipo de TypeScript"]
        ]),
        isEnabled: false,
        isFavourite: false,
        type: "language"
    },
    {
        nemonic: "python",
        name: "Python",
        alt: new Map([
            ["en", "Python logo"],
            ["es", "Logotipo de Python"]
        ]),
        isEnabled: true,
        isFavourite: false,
        type: "language"
    },
    {
        nemonic: "java",
        name: "Java",
        alt: new Map([
            ["en", "Java logo"],
            ["es", "Logotipo de Java"]
        ]),
        isEnabled: false,
        isFavourite: false,
        type: "language"
    },
    {
        nemonic: "c-sharp",
        name: "C#",
        alt: new Map([
            ["en", "C# logo"],
            ["es", "Logotipo de C#"]
        ]),
        isEnabled: false,
        isFavourite: true,
        type: "language"
    },
    {
        nemonic: "kotlin",
        name: "Kotlin",
        alt: new Map([
            ["en", "Kotlin logo"],
            ["es", "Logotipo de Kotlin"]
        ]),
        isEnabled: false,
        isFavourite: false,
        type: "language"
    },

    // Frameworks
    {
        nemonic: "angular",
        name: "Angular",
        alt: new Map([
            ["en", "Angular logo"],
            ["es", "Logotipo de Angular"]
        ]),
        isEnabled: true,
        isFavourite: false,
        type: "framework"
    },
    {
        nemonic: "nextjs",
        name: "Next.js",
        alt: new Map([
            ["en", "Next.js logo"],
            ["es", "Logotipo de Next.js"]
        ]),
        isEnabled: true,
        isFavourite: true,
        type: "framework"
    },
    {
        nemonic: "android",
        name: "Android",
        alt: new Map([
            ["en", "Android logo"],
            ["es", "Logotipo de Android"]
        ]),
        isEnabled: false,
        isFavourite: false,
        type: "framework"
    },

    // Librerías
    {
        nemonic: "react",
        name: "React",
        alt: new Map([
            ["en", "React logo"],
            ["es", "Logotipo de React"]
        ]),
        isEnabled: false,
        isFavourite: false,
        type: "library"
    },
    {
        nemonic: "dot-net-core",
        name: "EF Core",
        alt: new Map([
            ["en", "EF Core logo"],
            ["es", "Logotipo de EF Core"]
        ]),
        isEnabled: true,
        isFavourite: true,
        type: "library"
    },

    // Herramientas
    {
        nemonic: "docker",
        name: "Docker",
        alt: new Map([
            ["en", "Docker logo"],
            ["es", "Logotipo de Docker"]
        ]),
        isEnabled: false,
        isFavourite: false,
        type: "tool"
    },
    {
        nemonic: "git",
        name: "Git",
        alt: new Map([
            ["en", "Git logo"],
            ["es", "Logotipo de Git"]
        ]),
        isEnabled: false,
        isFavourite: false,
        type: "tool"
    }
];
