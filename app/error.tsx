'use client'

import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        toast.error('Something went wrong. Please try again.')
        console.error(error)
    }, [error])

    return (
        <main className="flex min-h-screen items-center justify-center px-4 py-12">
            <section
                aria-labelledby="error-heading"
                className="w-full max-w-xl rounded-[30px] bg-[#d9d9d9] px-6 py-10 text-center text-[#292929] shadow-[10px_10px_4px_0px_rgba(0,0,0,0.35)] dark:bg-[#444] dark:text-white sm:px-10"
            >
                <AlertTriangle aria-hidden="true" className="mx-auto mb-5 h-16 w-16 text-[#FF6D00]" />
                <p className="font-bold uppercase tracking-[0.2em] text-[#3AA8F6]">WeathCast</p>
                <h1 id="error-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
                    Something went wrong
                </h1>
                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-black/70 dark:text-white/70">
                    We could not load this part of the app. Try again or return to the weather dashboard.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={reset}
                        className="cursor-pointer rounded-full bg-[#FF6D00] px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="rounded-full border border-current px-6 py-3 font-bold transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                    >
                        Back to forecast
                    </Link>
                </div>
            </section>
        </main>
    )
}
