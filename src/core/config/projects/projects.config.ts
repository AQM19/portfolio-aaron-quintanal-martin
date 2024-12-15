import { DevsConfig } from "../devs/devs.config";
import { Project } from "@/core/interfaces";

export const ProjectsConfig: Project[] = [
    {
        title: 'Auto Terra',
        slug: 'auto-terra',
        logo: '/png/auto-terra.png',
        creator: `Aarón Quintanal Martín`,
        description: new Map([
            ['es', ['El proyecto propone una aplicación integral de administración de terrarios diseñada específicamente para propietarios de diversas especies, particularmente las exóticas.',
                'Esta herramienta digital permite mantener un seguimiento detallado y organizado de las necesidades individuales de cada especie, facilitando la asignación de un terrario adecuado para cada una. Además, los usuarios podrán programar y registrar tareas de cuidado y observaciones relevantes, garantizando una atención oportuna y eficaz.',
                'La incorporación de funcionalidades de monitoreo de temperatura y humedad, junto con alertas proactivas de potenciales problemas de salud, contribuye a la creación de un entorno controlado y seguro para cada especie.',
                'En definitiva, esta aplicación se presenta como una herramienta indispensable para todos aquellos propietarios de especies exóticas que buscan asegurar un cuidado de calidad y condiciones de vida óptimas para sus animales.']],
            ['en', ['The project proposes a comprehensive terrarium management application designed specifically for owners of various species, particularly exotic ones.',
                'This digital tool allows detailed and organized tracking of the individual needs of each species, facilitating the assignment of a suitable terrarium for each one. In addition, users will be able to schedule and record care tasks and relevant observations, ensuring timely and effective care.',
                'The incorporation of temperature and humidity monitoring functionalities, along with proactive alerts of potential health problems, contributes to the creation of a controlled and safe environment for each species.',
                'In short, this application is presented as an indispensable tool for all owners of exotic species seeking to ensure quality care and optimal living conditions for their animals.']]
        ]),
        shortDescription: new Map([
            ['es', 'La aplicación administra terrarios para especies exóticas, permitiendo seguimiento detallado de necesidades individuales, programación de cuidados y alertas de salud. Esencial para propietarios preocupados por el bienestar y condiciones óptimas de sus animales.'],
            ['en', 'The application manages terrariums for exotic species, allowing detailed monitoring of individual needs, care scheduling and health alerts. Essential for owners concerned about the welfare and optimal conditions of their animals.']
        ]),
        category: 'academic',
        dateStart: new Date(2023, 3, 1),
        dateEnd: new Date(2023, 6, 11),
        developers: DevsConfig.filter(dev => dev.username === 'AQM19'),
        documentation: new Map([
            ['es', 'https://drive.google.com/file/d/1ACM0QEcZ9snltNOwN6C8Ah-kGigo6ZW-/view']
        ]),
        images: [
            '/png/auto-terra.png',
            '/webp/auto-terra-1.webp',
            '/webp/auto-terra-2.webp',
            '/webp/auto-terra-3.webp',
            '/webp/auto-terra-4.webp',
            '/webp/auto-terra-5.webp',
        ],
        status: 'finished',
        tags: ['back-end-development', 'mobile-development', 'cross-platform-development', 'security', 'authentication-and-authorization', 'database-management', 'api-development', 'scalability', 'internet-of-things-iot'],
    },
    {
        title: 'ChatBOC',
        slug: 'chat-boc',
        logo: '/webp/chat-boc-1.webp',
        creator: 'IES Miguel Herrero - CEAIBD Grupo 2',
        description: new Map([
            ['es', ['ChatBOC es una aplicación innovadora que integra inteligencia artificial en un chatbot, permitiendo a los usuarios hacer preguntas sobre cualquier tema relacionado con el Boletín Oficial de Cantabria (BOC).', 'Este proyecto utiliza una arquitectura de doble base de datos: PostgreSQL y ChromaDB. PostgreSQL es una base de datos relacional encargada de gestionar usuarios, roles y chats, mientras que ChromaDB es una base de datos vectorial que almacena los PDF del BOC, proporcionando contexto relevante para las preguntas dirigidas al modelo de inteligencia artificial.', 'El modelo utilizado para su uso es el de ollama, que se comunicará con la api para proporcionar las respuestas obtenidas a través del chat bajo un contexto dado por la base de datos vectorial de ChromaDB. De esta forma se puede obtener un resultado de búsqueda mucho más sencillo y eficaz a la par que legible para cualquier persona, llegando al usuario final de la manera más simplista posible.']],
            ['en', ['ChatBOC is an innovative application that integrates artificial intelligence into a chatbot, allowing users to ask questions about any topic related to the Official Bulletin of Cantabria (BOC).', 'This project utilizes a dual database architecture: PostgreSQL and ChromaDB. PostgreSQL is a relational database responsible for managing users, roles, and chats, while ChromaDB is a vector database that stores the BOC PDFs, providing relevant context for questions directed to the AI model.', 'The model used is from Ollama, which will communicate with the API to provide responses obtained through the chat based on the context given by the ChromaDB vector database. This way, a much simpler and more efficient search result can be obtained, while also being readable for anyone, reaching the end user in the simplest way possible.']]
        ]),
        shortDescription: new Map([
            ['es', 'Aplicación de integración de la inteligencia artificial a un chatbot con el cual se puede preguntar sobre cualquier cosa sobre el BOC (Boletín Oficial de Cantabria).'],
            ['en', 'Application of artificial intelligence integration into a chatbot, which allows users to ask anything about the BOC (Official Bulletin of Cantabria).']
        ]),
        category: "academic",
        dateStart: new Date(2024, 5, 20),
        dateEnd: new Date(2024, 6, 6),
        developers: DevsConfig.filter(dev => dev.username === 'AQM19' || 'daniv' || 'rumantela' || 'jesusbuenogonzalez' || 'RomanAdgoR'),
        images: [
            '/webp/chat-boc-1.webp',
            '/webp/chat-boc-2.webp',
            '/webp/chat-boc-3.webp',
        ],
        status: "finished",
        tags: ['chatbots', 'devops', 'education-technology-edtech', 'back-end-development', 'front-end-development', 'ai-artificial-inteligence'],
    },
    {
        title: 'Bon0',
        slug: 'bon0',
        logo: '/png/bon0.png',
        creator: 'CIC - Eficiencia energética',
        description: new Map([
            ['es', [
                'Bon0 es un gestor de eficiencia energética diseñado para ofrecer un control integral sobre la facturación y el consumo energético en diferentes emplazamientos. ',
                'La herramienta permite a los usuarios consultar señales y curvas de señal a nivel de emplazamiento y CUPS (Código Universal del Punto de Suministro), facilitando la gestión eficiente de los datos asociados al consumo energético.',
                'A través de una base de datos centralizada, Bon0 proporciona acceso en tiempo real a información clave para tomar decisiones fundamentadas, optimizar recursos y garantizar una supervisión precisa de la eficiencia energética.',
                'Este sistema es esencial para empresas y organizaciones que buscan reducir costos, mejorar su sostenibilidad y tener un control absoluto sobre el comportamiento energético de sus activos.'
            ]],
            ['en', [
                'Bon0 is an energy efficiency management system designed to provide comprehensive control over billing and energy consumption across different locations.',
                'The tool allows users to consult signals and signal curves at the level of sites and CUPS (Universal Supply Point Code), enabling efficient management of energy consumption data.',
                'Through a centralized database, Bon0 provides real-time access to key information, empowering users to make informed decisions, optimize resources, and ensure accurate energy efficiency monitoring.',
                'This system is essential for companies and organizations seeking to reduce costs, enhance sustainability, and maintain absolute control over the energy performance of their assets.'
            ]]
        ]),
        shortDescription: new Map([
            ['es', 'Bon0 es un gestor de eficiencia energética que permite supervisar señales, curvas y datos de consumo para optimizar recursos y controlar la facturación a nivel de CUPS.'],
            ['en', 'Bon0 is an energy efficiency management system that enables monitoring of signals, curves, and consumption data to optimize resources and control billing at the CUPS level.']
        ]),
        category: 'employee',
        dateStart: new Date(2023, 3, 1),
        developers: [],
        images: [
            '/png/bon0.png'
        ],
        status: 'developping',
        tags: ['back-end-development', 'front-end-development', 'agile-methodologies', 'analytics', 'api-development', 'continuous-integration-continuous-deployment-ci-cd', 'dashboard-development', 'microservices-architecture', 'scalability', 'user-testing'],
    }
];