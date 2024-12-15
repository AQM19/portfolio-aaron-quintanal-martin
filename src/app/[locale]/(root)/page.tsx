import ContactComponent from "@/components/contact/ContactComponent";
import LanguageSkills from "@/components/language-skills/LanguageSkills";
import Presentation from "@/components/home/presentation/Presentation";
import ResumeCertifications from "@/components/resume-certifications/ResumeCertifications";
import ResumeExperience from "@/components/resume-experience/ResumeExperience";
import ResumeProjects from "@/components/resume-projects/ResumeProjects";

export default function Home() {
  return (
    <>
      <Presentation />
      <LanguageSkills />
      <ResumeProjects />
      <ResumeExperience />
      <ResumeCertifications />
      <ContactComponent />
    </>
  );
}
