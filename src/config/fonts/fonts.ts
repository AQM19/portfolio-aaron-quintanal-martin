import { Crimson_Text, Eczar, Inter, Kanit, Montserrat_Alternates, Ubuntu } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const titleFont = Montserrat_Alternates({
    subsets: ["latin"],
    weight: ['500', '700']
});

export const ubuntu = Ubuntu({
    subsets: ['latin'],
    weight: ['500', '700']
});

export const kanit = Kanit({
    subsets: ['latin'],
    weight: ['500', '700']
})

export const eczar = Eczar({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-eczar',
})

export const crimson_text = Crimson_Text({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-crimson_text',
    weight: "400"
})