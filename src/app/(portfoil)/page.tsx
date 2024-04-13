import CardResume from "@/components/home/card-resume/CardResume";

export default function Home() {

  return (
    <section className="w-full h-screen flex flex-col-reverse lg:flex-row p-5 items-center justify-evenly">
      <CardResume />

      <img
        className='h-[350px] w-3/4 md:h-[550px] md:w-[500px] hidden md:block'
        src="/imgs/png/developer.webp"
        alt="Imagen de Aarón Quintanal Martín"
      />
    </section>
  );
}
