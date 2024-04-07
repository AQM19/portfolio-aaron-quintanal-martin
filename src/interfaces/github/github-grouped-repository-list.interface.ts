import { GithubRepositoryVM } from "..";

export interface GithubGroupedRepositoryList {
    name: string;
    repositories: GithubRepositoryVM[];
    description: string;
    image: string;
    size: number;
    topics: string[];
    languages: string[];
}