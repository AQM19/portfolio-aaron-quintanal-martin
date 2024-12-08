'use client'

import CardResume from "@/components/home/card-resume/CardResume";
import { useUILoading } from "@/core/services/ui/loading.service";
import Image from "next/image";
import { useCallback, useEffect } from "react";

export default function Home() {

  const setIsLoaded = useUILoading(state => state.setIsLoaded);
  const loadPage = useCallback(async () => {
    await Promise.resolve();
    setIsLoaded();
  }, [setIsLoaded]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  return (
    <section className="w-full pt-28 flex flex-col-reverse lg:flex-row p-5 items-center justify-evenly">
      <CardResume />

      <Image
        className='h-[350px] w-3/4 md:h-[550px] md:w-[500px] hidden md:block'
        src="/imgs/developer.webp"
        alt="Imagen de Aarón Quintanal Martín"
        width={1920}
        height={1080}
      />
    </section>
  );
}
