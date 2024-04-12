import CardResume from "@/components/home/card-resume/CardResume";

export default function Home() {

  return (
    <>
      <CardResume />

      <img
        className='h-[350px] w-3/4 md:h-[550px] md:w-[500px] hidden md:block'
        src="/imgs/png/developer.webp"
        alt="Imagen de Aarón Quintanal Martín"
      />
    </>
  );
}
