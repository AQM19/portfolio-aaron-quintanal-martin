import bcryptjs from 'bcryptjs';

interface SeedProject {
    title: string;
    description: SeedProjectDescription[];
    shortDescription: SeedShortProjectDescription[];
    logo: string;
    dateStart: Date;
    dateEnd?: Date;
    documentation: SeedProjectDocumentation[];
    link?: string;
    statusId: string;
    categoryId: string;
    slug: string;
    tags: SeedTag[];
    images: string[];
    developers: string[];
}

interface SeedProjectDescription {
    locale: string;
    value: string;
}

interface SeedShortProjectDescription {
    locale: string;
    value: string;
}

interface SeedProjectDocumentation {
    locale: string;
    file: string;
}

interface SeedUser {
    email: string;
    password: string;
    name: string;
    roleId: number;
}

interface SeedDeveloper {
    username: string;
    name: string;
    surname: string;
    github?: string;
    portfoil?: string;
    avatar?: string;
}

interface SeedTagsOnProjects {
    project: SeedProject;
    tag: SeedTag;
}

type SeedTag = 'Web Development' | 'UI/UX Design' | 'Branding' | 'Front-end Development' | 'Back-end Development' | 'Full-stack Development' | 'Mobile Development' |
    'Responsive Design' | 'Cross-platform Development' | 'Progressive Web Apps (PWAs)' | 'Single Page Applications (SPAs)' | 'Microservices Architecture' |
    'Cloud Computing' | 'DevOps' | 'Continuous Integration/Continuous Deployment (CI/CD)' | 'Version Control (Git, SVN)' | 'Agile Methodologies' | 'Scrum' | 'Kanban' |
    'User Research' | 'Wireframing' | 'Prototyping' | 'User Testing' | 'Information Architecture' | 'Interaction Design' | 'Visual Design' | 'Accessibility' |
    'Performance Optimization' | 'SEO (Search Engine Optimization)' | 'Content Strategy' | 'A/B Testing' | 'Analytics' | 'Security' | 'Authentication & Authorization' |
    'Database Management' | 'API Development' | 'Integration Services' | 'Server Configuration' | 'Containerization (Docker, Kubernetes)' |
    'Microservices Orchestration' | 'Load Balancing' | 'Scalability' | 'Monitoring & Logging' | 'Incident Response' | 'Compliance' | 'Data Privacy' |
    'Machine Learning Integration' | 'Natural Language Processing (NLP)' | 'Computer Vision' | 'Sentiment Analysis' | 'Chatbots' | 'Blockchain Integration' |
    'Cryptocurrency' | 'Smart Contracts' | 'Data Visualization' | 'Dashboard Development' | 'Real-time Systems' | 'Internet of Things (IoT)' | 'Wearable Technology' |
    'Augmented Reality (AR)' | 'Virtual Reality (VR)' | 'Game Development' | 'Gamification' | 'E-commerce' | 'Social Networking' | 'Education Technology (EdTech)' |
    'Healthcare Technology (HealthTech)' | 'Financial Technology (FinTech)' | 'Travel Technology (TravelTech)' | 'Entertainment Technology (EntertainmentTech)' | 'AI (Artificial Intelligence)'

interface SeedData {
    users: SeedUser[];
    categories: string[];
    status: string[],
    roles: string[],
    tags: string[],
    locales: string[],
    developers: SeedDeveloper[];
    projects: SeedProject[];
}

export const initialData: SeedData = {
    users: [
        {
            email: 'aquintanalm.dev@gmail.com',
            name: 'Aarón',
            password: bcryptjs.hashSync('123456'),
            roleId: 0
        },
        {
            email: 'riosmercedes00@gmail.com',
            name: 'Mercedes',
            password: bcryptjs.hashSync('123456'),
            roleId: 0
        }
    ],
    categories: ['personal', 'freelance', 'private', 'employee', 'academic'],
    status: ['investigation', 'planification', 'designing', 'developping', 'deploying', 'manteinance', 'finished'],
    roles: ['admin', 'user', 'editor'],
    tags: ['Web Development', 'UI/UX Design', 'Branding', 'Front-end Development', 'Back-end Development', 'Full-stack Development', 'Mobile Development',
        'Responsive Design', 'Cross-platform Development', 'Progressive Web Apps (PWAs)', 'Single Page Applications (SPAs)', 'Microservices Architecture',
        'Cloud Computing', 'DevOps', 'Continuous Integration/Continuous Deployment (CI/CD)', 'Version Control (Git, SVN)', 'Agile Methodologies', 'Scrum', 'Kanban',
        'User Research', 'Wireframing', 'Prototyping', 'User Testing', 'Information Architecture', 'Interaction Design', 'Visual Design', 'Accessibility',
        'Performance Optimization', 'SEO (Search Engine Optimization)', 'Content Strategy', 'A/B Testing', 'Analytics', 'Security', 'Authentication & Authorization',
        'Database Management', 'API Development', 'Integration Services', 'Server Configuration', 'Containerization (Docker, Kubernetes)',
        'Microservices Orchestration', 'Load Balancing', 'Scalability', 'Monitoring & Logging', 'Incident Response', 'Compliance', 'Data Privacy',
        'Machine Learning Integration', 'Natural Language Processing (NLP)', 'Computer Vision', 'Sentiment Analysis', 'Chatbots', 'Blockchain Integration',
        'Cryptocurrency', 'Smart Contracts', 'Data Visualization', 'Dashboard Development', 'Real-time Systems', 'Internet of Things (IoT)', 'Wearable Technology',
        'Augmented Reality (AR)', 'Virtual Reality (VR)', 'Game Development', 'Gamification', 'E-commerce', 'Social Networking', 'Education Technology (EdTech)',
        'Healthcare Technology (HealthTech)', 'Financial Technology (FinTech)', 'Travel Technology (TravelTech)', 'Entertainment Technology (EntertainmentTech)',
        'AI (Artificial Intelligence)'],
    locales: ['es', 'en'],
    developers: [
        {
            username: 'AQM19',
            name: 'Aarón',
            surname: 'Quintanal Martín',
            github: 'https://github.com/AQM19',
            avatar: 'https://avatars.githubusercontent.com/u/92815949?s=400&u=1ae86f96810f3fdb2db6d4e07bd7740d911bcb2a&v=4'
        },
        {
            username: 'rumantela',
            name: 'Adolfo',
            surname: 'Sánchez López',
            github: 'https://github.com/rumantela',
            avatar: 'https://avatars.githubusercontent.com/u/8006416?v=4'
        },
        {
            username: 'daniv',
            name: 'Daniel',
            surname: 'Villegas Celaya',
            github: 'https://github.com/daniv-main',
            avatar: 'https://avatars.githubusercontent.com/u/157109885?v=4'
        },
        {
            username: 'jesusbuenogonzalez',
            name: 'Jesús',
            surname: 'Bueno González',
            github: 'https://github.com/jesusbuenogonzalez',
            avatar: 'https://avatars.githubusercontent.com/u/73839725?v=4'
        },
        {
            username: 'RomanAdgoR',
            name: 'Adrián',
            surname: 'Román González',
            github: 'https://github.com/daniv-main',
            avatar: 'https://avatars.githubusercontent.com/u/64107950?v=4'
        },
    ],
    projects: [
        {
            title: 'Auto-Terra',
            description: [
                { locale: 'es', value: 'El proyecto propone una aplicación integral de administración de terrarios diseñada específicamente para propietarios de diversas especies, particularmente las exóticas. Esta herramienta digital permite mantener un seguimiento detallado y organizado de las necesidades individuales de cada especie, facilitando la asignación de un terrario adecuado para cada una. Además, los usuarios podrán programar y registrar tareas de cuidado y observaciones relevantes, garantizando una atención oportuna y eficaz. La incorporación de funcionalidades de monitoreo de temperatura y humedad, junto con alertas proactivas de potenciales problemas de salud, contribuye a la creación de un entorno controlado y seguro para cada especie. En definitiva, esta aplicación se presenta como una herramienta indispensable para todos aquellos propietarios de especies exóticas que buscan asegurar un cuidado de calidad y condiciones de vida óptimas para sus animales.' },
                { locale: 'en', value: 'The project proposes a comprehensive terrarium management application designed specifically for owners of various species, particularly exotic ones. This digital tool allows detailed and organized tracking of the individual needs of each species, facilitating the assignment of a suitable terrarium for each one. In addition, users will be able to schedule and record care tasks and relevant observations, ensuring timely and effective care. The incorporation of temperature and humidity monitoring functionalities, along with proactive alerts of potential health problems, contributes to the creation of a controlled and safe environment for each species. In short, this application is presented as an indispensable tool for all owners of exotic species seeking to ensure quality care and optimal living conditions for their animals.' }
            ],
            shortDescription: [
                { locale: 'es', value: 'La aplicación administra terrarios para especies exóticas, permitiendo seguimiento detallado de necesidades individuales, programación de cuidados y alertas de salud. Esencial para propietarios preocupados por el bienestar y condiciones óptimas de sus animales.' },
                { locale: 'en', value: 'The application manages terrariums for exotic species, allowing detailed monitoring of individual needs, care scheduling and health alerts. Essential for owners concerned about the welfare and optimal conditions of their animals.' }
            ],
            logo: '',
            dateStart: new Date(2023, 3, 1),
            dateEnd: new Date(2023, 6, 11),
            statusId: '',
            categoryId: '',
            images: ['https://i.imgur.com/0qOfIdp.png', 'https://i.imgur.com/uT6OOel.png', 'https://i.imgur.com/tv5Wpn5.jpg', 'https://i.imgur.com/U31MfoC.png', 'https://i.imgur.com/SAy10xx.jpg', 'https://i.imgur.com/DKv3W1a.jpg'],
            documentation: [
                { locale: 'es', file: 'https://drive.google.com/file/d/1ACM0QEcZ9snltNOwN6C8Ah-kGigo6ZW-/view' }
            ],
            slug: 'auto-terra',
            tags: ['Back-end Development', 'Mobile Development', 'Cross-platform Development', 'Security', 'Authentication & Authorization', 'Database Management',
                'API Development', 'Scalability', 'Internet of Things (IoT)'],
            developers: ['AQM19']
        },
        {
            title: 'ChatBOC',
            description: [
                { locale: 'es', value: 'ChatBOC es una aplicación innovadora que integra inteligencia artificial en un chatbot, permitiendo a los usuarios hacer preguntas sobre cualquier tema relacionado con el Boletín Oficial de Cantabria (BOC). Este proyecto utiliza una arquitectura de doble base de datos: PostgreSQL y ChromaDB. PostgreSQL es una base de datos relacional encargada de gestionar usuarios, roles y chats, mientras que ChromaDB es una base de datos vectorial que almacena los PDF del BOC, proporcionando contexto relevante para las preguntas dirigidas al modelo de inteligencia artificial. El modelo utilizado para su uso es el de ollama, que se comunicará con la api para proporcionar las respuestas obtenidas a través del chat bajo un contexto dado por la base de datos vectorial de ChromaDB. De esta forma se puede obtener un resultado de búsqueda mucho más sencillo y eficaz a la par que legible para cualquier persona, llegando al usuario final de la manera más simplista posible.' },
                { locale: 'en', value: 'ChatBOC is an innovative application that integrates artificial intelligence into a chatbot, allowing users to ask questions about any topic related to the Official Bulletin of Cantabria (BOC). This project utilizes a dual database architecture: PostgreSQL and ChromaDB. PostgreSQL is a relational database responsible for managing users, roles, and chats, while ChromaDB is a vector database that stores the BOC PDFs, providing relevant context for questions directed to the AI model. The model used is from Ollama, which will communicate with the API to provide responses obtained through the chat based on the context given by the ChromaDB vector database. This way, a much simpler and more efficient search result can be obtained, while also being readable for anyone, reaching the end user in the simplest way possible.' }
            ],
            shortDescription: [
                { locale: 'es', value: 'Aplicación de integración de la inteligencia artificial a un chatbot con el cual se puede preguntar sobre cualquier cosa sobre el BOC (Boletín Oficial de Cantabria).' },
                { locale: 'en', value: 'Application of artificial intelligence integration into a chatbot, which allows users to ask anything about the BOC (Official Bulletin of Cantabria).' }
            ],
            logo: '',
            dateStart: new Date(2024, 5, 20),
            dateEnd: new Date(2024, 6, 6),
            statusId: '',
            categoryId: '',
            images: ['https://i.imgur.com/oRMam8d.png', 'https://i.imgur.com/s8no3BS.png', 'https://i.imgur.com/g3hregH.png'],
            documentation: [],
            slug: 'chat-boc',
            tags: ['Chatbots', 'DevOps', 'Education Technology (EdTech)', 'Back-end Development', 'Front-end Development', 'AI (Artificial Intelligence)'],
            developers: ['AQM19', 'daniv', 'rumantela', 'jesusbuenogonzalez', 'RomanAdgoR']
        }
    ]
}