export interface Certification {
    title: string;
    organization: string;
    date: Date;
    description: Map<string, string>;
    calification?: number;
    link?: string;
    professor?: string;
}