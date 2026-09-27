import ContactComponent from "@/components/contact/ContactComponent";
import LanguageSkills from "@/components/language-skills/LanguageSkills";
import Presentation from "@/components/home/presentation/Presentation";
import ResumeCertifications from "@/components/resume-certifications/ResumeCertifications";
import ResumeExperience from "@/components/resume-experience/ResumeExperience";
import ResumeProjects from "@/components/resume-projects/ResumeProjects";
import { getLocale, getTranslations } from "next-intl/server";
import { loadCareer, loadCertifications, loadCvUrl, loadProjects, loadSkills } from "@/core/content";

export default async function Home() {
  const locale = await getLocale();
  const p = await getTranslations('Project');

  const [skills, projects, career, certifications, cvUrl] = await Promise.all([
    loadSkills(locale),
    loadProjects(locale),
    loadCareer(locale, p('actual')),
    loadCertifications(locale),
    loadCvUrl(locale),
  ]);

  return (
    <>
      <Presentation cvUrl={cvUrl} />
      <LanguageSkills skills={skills} />
      <ResumeProjects projects={projects} />
      <ResumeExperience career={career} />
      <ResumeCertifications certifications={certifications} />
      <ContactComponent />
    </>
  );
}
