import { generateProjectMetadata } from "@/utils"
import { Metadata, ResolvingMetadata } from "next"
import { Project } from "@/interfaces"
import { useLocale, useTranslations } from "next-intl"
import ProjectClientView from "./project-client-view"

interface Props {
    project: Project
}

export async function generateMetadata(project: Project, locale: string, t: any, parent: ResolvingMetadata): Promise<Metadata> {
    return generateProjectMetadata(project, locale, t);
}

const ProjectView = ({ project }: Props) => {

    const t = useTranslations("Project");
    const locale = useLocale();
    const metadata = generateProjectMetadata(project, locale, t);

    return (
        <ProjectClientView project={project} />
    )
}

export default ProjectView