import React from 'react'
import Link from 'next/link'
import type { FooterProps } from '@/app/lib/types'

const Footer = ({ showLocationControls = true }: FooterProps) => {
    return (
        <footer className="flex max-w-7xl w-full mx-auto flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t-2 border-[#5454559f] p-4">
            <span>&copy; {new Date().getFullYear()} <span className="font-bold">Weathcast</span>.</span>
            <span>Created by <a href="https://arnabmitra.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-bold">Arnab Mitra</a>.</span>
            {showLocationControls && <Link href="/about" className="font-bold underline-offset-4">About WeathCast</Link>}
        </footer>
    )
}

export default Footer
