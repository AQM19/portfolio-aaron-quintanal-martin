import { getProjectTranslationsByProjectId } from '@/actions';
import { redirect } from 'next/navigation';
import TabsTranslations from './ui/tabs-translations';
import { Paths } from '@/config';

interface Props {
    params: {
        id: string;
    }
}

const ManageProjectTranslationsByProjectIdPage = async ({ params }: Props) => {

    const { id } = params;
    if (!id) redirect(Paths.INDEX);

    const projectTranslations = await getProjectTranslationsByProjectId(id);

    if (!projectTranslations) {
        redirect(Paths.PROJECTS)
    }

    return (
        <section className='w-full h-auto min-h-screen px-5 py-20 md:p-20 md:pt-40'>

            <TabsTranslations projectTranslations={projectTranslations} projectId={id} />

        </section>
    )
}

export default ManageProjectTranslationsByProjectIdPage