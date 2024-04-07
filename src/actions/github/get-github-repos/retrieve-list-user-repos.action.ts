import { GithubRepository, GithubRepositoryVM } from "@/interfaces";
import { GithubGroupedRepositoryList } from "@/interfaces/github/github-grouped-repository-list.interface";
import axios from "axios";


export const getRepos = async (): Promise<GithubGroupedRepositoryList[]> => {
    try {

        const response = await axios.get<GithubRepository[]>(`https://api.github.com/users/${process.env.GITHUB_USER}/repos`, {
            headers: {
                Authorization: `token ${process.env.GITHUB_API}`
            }
        });

        // Filtrar repositorios que no sean plantillas y solo que sean de nomenclatura P (projects)
        const filteredRepos = response.data.filter(repo => !repo.is_template && repo.name.startsWith('P'));

        // Obtener agrupaciones de repositorios en proyectos
        const groupedRepositories: Map<string, GithubRepositoryVM[]> = new Map<string, GithubRepositoryVM[]>();

        filteredRepos.forEach(repo => {
            const splitter = repo.name.split('-');
            const projectName = splitter[splitter.length - 1];
            const repositoryVM = toVM(repo); // Convertir el repositorio a formato ViewModel

            if (groupedRepositories.has(projectName)) {
                // Si el proyecto ya existe en el Map, agregar el repositorio a la lista correspondiente
                groupedRepositories.get(projectName)!.push(repositoryVM);
                return
            }

            // Si el proyecto no existe en el Map, crear una nueva lista y agregar el repositorio
            groupedRepositories.set(projectName, [repositoryVM]);

        });

        // Convertir el Map a un array de objetos GithubGroupedRepositoryList
        const groupedRepositoriesList: GithubGroupedRepositoryList[] = regroupRepositories(groupedRepositories);

        return groupedRepositoriesList;

    } catch (error) {
        console.error("Error al obtener los repositorios: ", error)
        return [];
    }
}

const toVM = (repository: GithubRepository): GithubRepositoryVM => {
    const repositoryVM: GithubRepositoryVM = {
        id: repository.id,
        name: repository.name,
        html_url: repository.html_url,
        description: repository.description,
        tags_url: repository.tags_url,
        size: repository.size,
        language: repository.language,
        is_template: repository.is_template,
        topics: repository.topics,
        created: repository.created_at,
        updated: repository.updated_at
    };
    return repositoryVM;
}

const regroupRepositories = (groupedRepositories: Map<string, GithubRepositoryVM[]>): GithubGroupedRepositoryList[] => {
    return Array
        .from(groupedRepositories.entries())
        .map(([name, repositories]) => {
            const languagesSet = new Set<string>();

            repositories.forEach(repo => {
                if (repo.language) {
                    languagesSet.add(repo.language);
                }
            });

            // Convertir el conjunto de lenguajes a un array
            const languagesArray = Array.from(languagesSet);

            return {
                name,
                repositories,
                image: `/imgs/project-icons/${name}-icon.png`,
                description: repositories.reduce((total, repo) => {
                    if (!!repo.description) return total + repo.description
                    return total + ''
                }, ''),
                size: repositories.reduce((total, repo) => total + repo.size, 0),
                topics: repositories.flatMap(repo => repo.topics),
                languages: languagesArray
            };
        });
}