import { IoMenu } from "react-icons/io5"

export const HeaderComponent = ({ sidebarOpen, setSidebarOpen }: any) => {
    return (
        <header className="sticky top-0 bg-neutral-50 border-slate-200 z-30 block sm:hidden">

            <div className="px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-between h-16 -md-px">

                    <div className="flex">

                        <IoMenu
                            size={30}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden cursor-pointer text-night-100"
                        />

                    </div>

                </div>
            </div>

        </header>
    )
}
