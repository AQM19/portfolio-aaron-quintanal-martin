import LandscapePresentationPage from "@/components/ui/landscape/presentation/LandscapePresentationPage";
import LandscapeProjectsPage from '../../components/ui/landscape/projects/LandscapeProjectsPage';
import LandscapeContactPage from "@/components/ui/landscape/contact/LandscapeContactPage";

export default function Home() {

  return (
    <>
      <section className='w-full bg-neutral-100 dark:bg-black'>

        <LandscapePresentationPage />
        <LandscapeProjectsPage />
        <LandscapeContactPage />

      </section>
    </>
  );
}
