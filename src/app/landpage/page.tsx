import CardResume from "@/components/ui/card-resume/CardResume";

export default function Home() {

  return (
    <section className='w-full h-screen bg-gradient-to-l from-[#fff6ed] to-[#ffead5] dark:from-[#030637] dark:to-[#3C0753] flex flex-col-reverse lg:flex-row p-5 items-center justify-evenly transition-all duration-200'>

      <CardResume />

      <img
        className='h-[350px] w-3/4 md:h-[550px] md:w-[500px] hidden md:block'
        src="/imgs/png/developer.webp"
        alt="Imagen de Aarón Quintanal Martín"
      />

    </section>
  );
}
