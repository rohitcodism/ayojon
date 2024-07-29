import Link from "next/link"



export const Navbar = () => {
    return (
        <div
            className="container flex items-center gap-8 py-6"
        >
            <div className=" container py-3 flex justify-between items-center">
                <div className="text-xl font-bold text-black dark:text-white">
                    <Link href="/">Ayojon</Link>
                </div>
            </div>
        </div>
    );
}