'use client'

import { generatePaginationNumbers } from "@/core/utils/generatePaginationNumbers";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

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
                        <Link className="page-link relative flex items-center min-h-[44px] px-3 rounded transition-colors duration-300 text-accent-fg hover:bg-surface-hover"
                            href={createPageUrl(currentPage - 1)}>
                            <IoChevronBackOutline size={30} />
                        </Link>
                    </li>


                    {
                        allPages.map((page) => (
                            <li key={page} className="page-item">
                                <Link
                                    className={
                                        clsx(
                                            'page-link relative flex items-center min-h-[44px] px-3 rounded transition-colors duration-300',
                                            {
                                                'text-accent-fg hover:bg-surface-hover': page !== currentPage,
                                                'bg-accent text-on-accent font-bold': page === currentPage
                                            }
                                        )
                                    }
                                    href={createPageUrl(page)}
                                    aria-current={page === currentPage ? 'page' : undefined}>
                                    {page}
                                </Link>
                            </li>
                        ))
                    }

                    <li className="page-item">
                        <Link className="page-link relative flex items-center min-h-[44px] px-3 rounded transition-colors duration-300 text-accent-fg hover:bg-surface-hover"
                            href={createPageUrl(currentPage + 1)}>
                            <IoChevronForwardOutline size={30} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}