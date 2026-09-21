import Image from 'next/image'
import Link from 'next/link'
import { Images } from './lib/constants'

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center px-4 py-12">
            <section
                aria-labelledby="not-found-heading"
                className="w-full max-w-xl rounded-[30px] bg-[#d9d9d9] px-6 py-10 text-center text-[#292929] shadow-[10px_10px_4px_0px_rgba(0,0,0,0.35)] dark:bg-[#444] dark:text-white sm:px-10"
            >
                <Image src={Images.logo} alt="WeathCast logo" width={52} height={52} priority className="h-13 w-13 mx-auto" />
                <p className="font-bold uppercase tracking-[0.2em] text-[#3AA8F6]">WeathCast</p>
                <h1 id="not-found-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
                    Page not found
                </h1>
                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-black/70 dark:text-white/70">
                    The page you are looking for does not exist or may have moved.
                </p>
                <Link
                    href="/"
                    className="mt-7 inline-block rounded-full bg-[#FF6D00] px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
                >
                    Back to forecast
                </Link>
            </section>
        </main>
    )
}
