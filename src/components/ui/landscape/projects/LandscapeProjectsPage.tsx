import { getRepos } from '@/actions/github/get-github-repos/retrieve-list-user-repos.action'
import { GithubGroupedRepositoryList } from '@/interfaces/github/github-grouped-repository-list.interface';
import CardProject from './card-project/CardProject';

const LandscapeProjectsPage = async () => {

    const repositories: GithubGroupedRepositoryList[] = await getRepos();

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='w-full project-cards flex justify-around items-center'>
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