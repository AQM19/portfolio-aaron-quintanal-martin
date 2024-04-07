export interface GithubRepositoryVM {
    id: number;
    name: string;
    html_url: string;
    description?: string;
    tags_url: string;
    size: number;
    language: string;
    is_template: boolean;
    topics: any[];
    created: Date;
    updated: Date;
}