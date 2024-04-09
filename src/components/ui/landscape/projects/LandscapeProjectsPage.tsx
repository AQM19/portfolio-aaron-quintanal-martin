import { getRepos } from '@/actions/github/get-github-repos/retrieve-list-user-repos.action'
import { GithubGroupedRepositoryList } from '@/interfaces/github/github-grouped-repository-list.interface';
import CardProject from './card-project/CardProject';

const LandscapeProjectsPage = async () => {

    const repositories: GithubGroupedRepositoryList[] = await getRepos();

    return (
        <div className='flex justify-center items-center lg:h-screen'>
            <div className='flex flex-col lg:grid lg:grid-cols-2 gap-4 project-cards'>
                {
                    repositories.map(value => (
                        <CardProject key={value.name} data={value} />
                    ))
                }
            </div>
        </div>
    )
}

export default LandscapeProjectsPage