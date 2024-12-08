import { MyCareer } from "@/core/interfaces/my-career/career.interface";
import { FaNodeJs } from "react-icons/fa6";
import { IoLogoAngular, IoSchool } from "react-icons/io5";
import { SiCsharp } from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";

export const myCareerEnConfig: MyCareer[] = [
    {
        dateRange: 'February 2021 - August 2021',
        dotIcon: FaNodeJs,
        empress: 'Indole Studio',
        empressImage: 'https://www.indole.es/ext/r/oxo-1221/soacial-share-image-indole.jpg',
        description: `I started at Indole Studio as an intern after taking a web development course. I spent 7 months there during which I managed to learn the basics of programming with JavaScript. Until then, I had no formal training in programming, but it was my start as such.`
    },
    {
        dateRange: 'September 2021 - March 2023',
        dotIcon: IoSchool,
        empress: 'DAM',
        empressImage: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Iesmph_entrada.JPG',
        description: `That same year I managed to enroll in the Multiplatform Application Development course. While working part-time in the mornings, I studied in the afternoons. Here I have learned many things throughout the entire course, thanks to excellent teachers that I was lucky to have.`
    },
    {
        dateRange: 'March 2023 - June 2023',
        dotIcon: SiCsharp,
        empress: 'LKS Next',
        empressImage: 'https://img.youtube.com/vi/DkrDadvthu8/hqdefault.jpg',
        description: `After finishing the course, I started the internship period at LKS Next. I was programming with Angular on the front-end and with .NET on the back-end. I learned many things about clean code, design patterns, front-end and project structuring, things that I would later apply in all possible areas.`
    },
    {
        dateRange: 'July 2023 - Present',
        dotIcon: IoLogoAngular,
        empress: 'CIC',
        empressImage: 'https://static.smartgridsinfo.es/media/2020/03/edificio-santander-cic-consulting-informatico.png',
        description: `I am currently at CIC (Cantabria Computer Consulting) working as a junior developer. Here they offer me the possibility to develop myself as a professional in an amazing way, offering challenges according to my level, interesting projects to work on, and, most importantly, a wonderful team to be with.`,
        progression: [
            {
                promotionDate: new Date(2024, 1, 11),
                position: 'Junior Developer II',
                evaluation: 'Excellent'
            },
            {
                promotionDate: new Date(2024, 1, 18),
                position: 'Junior Developer IV',
                evaluation: 'Excellent'
            }
        ]
    },
    {
        dateRange: 'September 2023 - Present',
        dotIcon: GiArtificialIntelligence,
        empress: 'CEIABD',
        empressImage: 'https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2022/04/17/625c8a30eea74.r_d.487-342-0.jpeg',
        description: `In addition, I am taking the Artificial Intelligence and Big Data Specialization course while working at CIC. Contributing more knowledge to my resume and making many advances. I also consider it something necessary nowadays with the fever of AI that has been overwhelming us lately.`
    }
]
