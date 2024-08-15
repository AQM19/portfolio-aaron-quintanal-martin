'use client'

import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import CustomLink from "../custom-link/CustomLink";

interface Props {
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pageString = searchParams.get('page') ?? 1;
    const currentPage = isNaN(+pageString) ? 1 : +pageString;

    if (currentPage < 1 || isNaN(+pageString)) {
        redirect(pathname);
    }

    const allPages = generatePaginationNumbers(currentPage, totalPages);

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);

        if (pageNumber === '...') {
            return `${pathname}?${params.toString()}`;
        }

        if (+pageNumber <= 0) {
            return `${pathname}`;
        }

        if (+pageNumber > totalPages) {
            return `${pathname}?${params.toString()}`;
        }

        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex text-center justify-center mt-10">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">

                    <li className="page-item">
                        <CustomLink className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-[#ed4709] dark:text-[#e2b5fd] hover:bg-[#44100650] dark:hover:bg-[#d2e4ff50] focus:shadow-none"
                            href={createPageUrl(currentPage - 1)}>
                            <IoChevronBackOutline size={30} />
                        </CustomLink>
                    </li>


                    {
                        allPages.map((page) => (
                            <li key={page} className="page-item">
                                <CustomLink
                                    className={
                                        clsx(
                                            'page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded focus:shadow-none text-[#ed4709] dark:text-[#e2b5fd] bg-transparent hover:bg-[#44100650] dark:hover:bg-[#d2e4ff50]',
                                            {
                                                'text-[#ed4709] dark:text-[#e2b5fd] bg-transparent hover:bg-[#44100650] dark:hover:bg-[#d2e4ff50]': page === currentPage
                                            }
                                        )
                                    }
                                    href={createPageUrl(page)}>
                                    {page}
                                </CustomLink>
                            </li>
                        ))
                    }

                    <li className="page-item">
                        <CustomLink className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-[#ed4709] dark:text-[#e2b5fd] hover:bg-[#44100650] dark:hover:bg-[#d2e4ff50] focus:shadow-none"
                            href={createPageUrl(currentPage + 1)}>
                            <IoChevronForwardOutline size={30} />
                        </CustomLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}