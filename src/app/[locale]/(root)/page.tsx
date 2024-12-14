import Presentation from "@/components/home/presentation/Presentation";
import LanguageSkills from "@/components/language-skills/LanguageSkills";
import ResumeExperience from "@/components/resume-experience/ResumeExperience";
import ResumeProjects from "@/components/resume-projects/ResumeProjects";
import ResumeCertifications from '../../../components/resume-certifications/ResumeCertifications';

export default function Home() {
  return (
    <>
      <Presentation />
      <LanguageSkills />
      <ResumeProjects />
      <ResumeExperience />
      <ResumeCertifications />
      {/* contacto */}
    </>
  );
}
