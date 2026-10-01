import ContactComponent from "@/components/contact/ContactComponent";
import LanguageSkills from "@/components/language-skills/LanguageSkills";
import Presentation from "@/components/home/presentation/Presentation";
import ResumeProjects from "@/components/resume-projects/ResumeProjects";
import { getLocale, getTranslations } from "next-intl/server";
import { loadCareer, loadProfile, loadProjects, loadSkills } from "@/core/content";
import { getCurrentJob } from "@/core/utils";

// Experience and certifications live on the career page; the home only links to it through the current job.
export default async function Home() {
  const locale = await getLocale();
  const p = await getTranslations('Project');

  const [profile, skills, projects, career] = await Promise.all([
    loadProfile(locale),
    loadSkills(locale),
    loadProjects(locale),
    loadCareer(locale, p('actual')),
  ]);

  const currentJob = getCurrentJob(career);

  return (
    <>
      <Presentation
        profile={profile}
        currentJob={currentJob && { position: currentJob.position, company: currentJob.empress }}
      />
      <ResumeProjects projects={projects} />
      <LanguageSkills skills={skills} />
      <ContactComponent />
    </>
  );
}
