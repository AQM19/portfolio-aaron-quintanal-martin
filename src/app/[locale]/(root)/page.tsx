import ContactComponent from "@/components/contact/ContactComponent";
import LanguageSkills from "@/components/language-skills/LanguageSkills";
import Presentation from "@/components/home/presentation/Presentation";
import ResumeCertifications from "@/components/resume-certifications/ResumeCertifications";
import ResumeExperience from "@/components/resume-experience/ResumeExperience";
import ResumeProjects from "@/components/resume-projects/ResumeProjects";
import { getLocale, getTranslations } from "next-intl/server";
import { loadCareer, loadCertifications, loadProfile, loadProjects, loadSkills } from "@/core/content";

export default async function Home() {
  const locale = await getLocale();
  const p = await getTranslations('Project');

  const [profile, skills, projects, career, certifications] = await Promise.all([
    loadProfile(locale),
    loadSkills(locale),
    loadProjects(locale),
    loadCareer(locale, p('actual')),
    loadCertifications(locale),
  ]);

  return (
    <>
      <Presentation profile={profile} />
      <LanguageSkills skills={skills} />
      <ResumeProjects projects={projects} />
      <ResumeExperience career={career} />
      <ResumeCertifications certifications={certifications} />
      <ContactComponent />
    </>
  );
}
