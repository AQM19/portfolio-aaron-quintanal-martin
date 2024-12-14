import { Certification } from "@/core/interfaces/certification/certification.interface";

export const CertificationConfig: Certification[] = [
    {
        title: 'Administración de Aplicaciones Informáticas en Red',
        description: new Map([
            ['es', ''],
            ['en', '']
        ]),
        organization: 'IES Miguel Herrero de Pereda',
        date: new Date(2018, 6, 25),
        calification: 5.77
    },
    {
        title: 'Desarrollo de Aplicaciones Multiplataforma',
        description: new Map([
            ['es', ''],
            ['en', '']
        ]),
        organization: 'IES Miguel Herrero de Pereda',
        date: new Date(2023, 6, 28),
        calification: 8.15
    },
    {
        title: 'Next.js: El framework de React para producción',
        description: new Map([
            ['es', 'SSR, SSG, CSR, ISR, Middlewares, Rutas dinámicas, Next API, Next Auth, Material UI, despliegues, Cookies y más.'],
            ['en', 'SSR, SSG, CSR, ISR, Middlewares, Dynamic Routes, Next API, Next Auth, Material UI, Deployments, Cookies and more.']
        ]),
        organization: 'Udemy',
        date: new Date(2024, 5, 9),
        link: 'https://www.udemy.com/course/nextjs-fh/',
        professor: 'Fernando Herrera'
    },
    {
        title: 'Inteligencia Artificial y Deep Learning desde cero en Python',
        description: new Map([
            ['es', ''],
            ['en', '']
        ]),
        organization: 'Udemy',
        date: new Date(2024, 5, 9),
        link: 'https://www.udemy.com/course/deep-learning-desde-cero-en-python/',
        professor: 'Santiago Hernández'
    },
    {
        title: 'Master en ASP.NET MVC - Entity Framework (.NET8)',
        description: new Map([
            ['es', ''],
            ['en', '']
        ]),
        organization: 'Udemy',
        date: new Date(2024, 11, 24),
        link: 'https://www.udemy.com/course/master-en-aspnet-core-31-mvc-entity-framework/?couponCode=KEEPLEARNING',
        professor: 'José Andrés Montoya'
    },
    {
        title: 'Spring Framework 6 & Spring Boot 3 desde cero a experto 2024',
        description: new Map([
            ['es', ''],
            ['en', '']
        ]),
        organization: 'Udemy',
        date: new Date(2024, 11, 13),
        link: 'https://www.udemy.com/course/spring-framework-5/?couponCode=KEEPLEARNING',
        professor: 'Andrés Guzmán'
    },
    {
        title: 'Ultimate Docker: guía de cero hasta despliegues',
        description: new Map([
            ['es', ''],
            ['en', '']
        ]),
        organization: 'Udemy',
        date: new Date(2024, 5, 14),
        link: 'https://www.udemy.com/course/ultimate-docker-guia-de-cero-hasta-despliegues/?couponCode=KEEPLEARNING',
        professor: 'Nicolas Schurmann'
    }
];