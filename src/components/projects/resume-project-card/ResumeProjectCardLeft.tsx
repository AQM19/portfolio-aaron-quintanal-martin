'use client'

import { GithubGroupedRepositoryList } from '@/interfaces/github/github-grouped-repository-list.interface';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Typography from '@mui/material/Typography/Typography';
import { Box } from '@mui/material';

interface Props {
    data: GithubGroupedRepositoryList;
    index: number;
}

const ResumeProjectCardLeft = ({ data, index }: Props) => {

    const router = useRouter();

    const goToProjectPage = () => {
        router.push(`/project/${data.name}`);
    };

    const oddOrPair = index % 2 == 0;

    return (
        <Box className={`p-5 w-full lg:w-4/6 flex flex-col-reverse md:gap-10 md:flex-row ${oddOrPair ? 'self-end md:flex-row-reverse' : ''}`}>

            <Image src={data.image} alt={data.name} height={550} width={550}
                className='h-[150px] w-[150px] lg:h-[200px] lg:w-[200px] lg:min-h-[200px] self-center'
            />

            <div className={`text-neutral-900 dark:text-neutral-100 ${oddOrPair ? 'text-end' : ''}`}>
                <h5
                    className={`font-bold text-xl md:text-4xl text-center ${oddOrPair ? 'md:text-end' : 'md:text-start'}`}>
                    {data.name}
                </h5>
                <p
                    className='hidden md:block mt-3'
                >
                    {data.description}
                </p>
            </div>

        </Box>
    )
}

export default ResumeProjectCardLeft