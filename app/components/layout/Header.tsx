'use client'

import { Images } from '@/app/lib/constants'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { LocateFixed, Search } from 'lucide-react'
import type { HeaderProps } from '@/app/lib/types'

const Header = ({ onLocationFound, showLocationControls = true }: HeaderProps) => {
    const [query, setQuery] = React.useState('')
    const [isSearching, setIsSearching] = React.useState(false)
    const [isLocating, setIsLocating] = React.useState(false)
    const [error, setError] = React.useState('')

    const searchLocation = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!query.trim()) return

        setIsSearching(true)
        setError('')

        try {
            const response = await fetch(`/api/geocode?query=${encodeURIComponent(query)}`)
            const text = await response.text()
            const data = text ? JSON.parse(text) : {}
            if (!response.ok) throw new Error(data.error || 'Location not found.')
            onLocationFound?.(data)
        } catch (searchError) {
            setError(searchError instanceof Error ? searchError.message : 'Location search failed.')
        } finally {
            setIsSearching(false)
        }
    }

    const useCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.')
            return
        }

        setIsLocating(true)
        setError('')

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords
                    const response = await fetch(`/api/reverse-geocode?lat=${latitude}&lon=${longitude}`)
                    const data = await response.json()
                    if (!response.ok) throw new Error(data.error || 'Could not find your location.')
                    onLocationFound?.(data)
                } catch (locateError) {
                    setError(locateError instanceof Error ? locateError.message : 'Location lookup failed.')
                } finally {
                    setIsLocating(false)
                }
            },
            (positionError) => {
                const messages: Record<number, string> = {
                    1: 'Location permission was denied. Allow location access in your browser settings.',
                    2: 'Your location could not be determined. Check your device location settings.',
                    3: 'Location detection timed out. Try again.',
                }
                setError(messages[positionError.code] || 'Location detection failed.')
                setIsLocating(false)
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
        )
    }

    return (
        <header className="w-full mx-auto max-w-7xl px-4 py-4">
            <nav className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <Link href="/" className="flex items-center self-start mr-auto">
                    <Image src={Images.logo} alt="Logo" width={52} height={52} className="h-13 w-13" />
                    <div className="ml-2 flex flex-col font-semibold">
                        <span className="text-xl text-[#FF6D00]">
                            <span className='text-[#3AA8F6]'>Weath</span>
                            Cast
                        </span>
                        <span className="text-sm text-muted-foreground">Know Your Sky</span>
                    </div>
                </Link>

                {showLocationControls && (
                    <>
                        <div className="lg:mr-2.5 my-2.5 lg:my-0">
                            <form onSubmit={searchLocation} className="relative h-15.5 w-full md:min-w-md xl:min-w-lg md:flex-1 border border-black dark:border-0 py-2 px-3 sm:px-4 flex items-center bg-muted text-muted-foreground rounded-[40px] shadow-[0px_4px_40px_0px_rgba(0,0,0,0.25)]">
                                <button
                                    type="submit"
                                    aria-label="Search location"
                                    disabled={isSearching}
                                    className="cursor-pointer disabled:cursor-wait shrink-0"
                                >
                                    <Search className='h-6 w-6 sm:h-8 sm:w-8' />
                                </button>
                                <input
                                    id="search-input"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    type="text"
                                    placeholder="Search for your preferred city..."
                                    className="bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground w-full h-full px-3 sm:px-4"
                                />
                                {error && <span className="absolute top-full left-4 mt-1 text-xs text-red-600">{error}</span>}
                                {isSearching && <span className="sr-only">Searching</span>}
                            </form>
                        </div>

                        <button
                            type="button"
                            onClick={useCurrentLocation}
                            disabled={isLocating}
                            className="lg:mr-2.5 w-full cursor-pointer text-black dark:text-white flex items-center justify-center bg-[#d9d9d9] dark:bg-[#444] rounded-[40px] py-2 px-3 sm:px-4 shadow-[0px_4px_40px_0px_rgba(0,0,0,0.25)] disabled:opacity-60 md:w-auto"
                        >
                            <LocateFixed className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="font-extrabold text-sm sm:text-xl tracking-wide whitespace-nowrap">
                                {isLocating ? 'Locating…' : 'Current Location'}
                            </span>
                        </button>
                    </>
                )}

                <div className="shrink-0 absolute top-5 right-5 lg:static">
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    )
}

export default Header