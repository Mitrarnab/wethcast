'use client'

import React from 'react'
import type { TimeMapProps } from '@/app/lib/types'

const TimeMap = ({ location }: TimeMapProps) => {
    const [now, setNow] = React.useState(new Date())
    const [is24Hour, setIs24Hour] = React.useState(true)

    React.useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000 * 30)
        return () => clearInterval(interval)
    }, [])



    const timeString = location
        ? new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: !is24Hour,
            timeZone: location.timezone,
        }).format(now)
        : ''

    const dateString = location
        ? new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            timeZone: location.timezone,
        }).format(now)
        : ''

    const [primaryName, ...restParts] = location?.name.split(',') ?? []
    const secondaryName = restParts.join(',').trim()

    return (
        <div className="flex flex-col lg:max-w-md w-full py-4 px-5 bg-[#d9d9d9] dark:bg-[#444] text-[#292929] dark:text-white rounded-[30px] shadow-[10px_10px_4px_0px_rgba(0,0,0,0.5)]">
            <div className="flex justify-around items-center mb-4">
                <div className="">
                    <h1 className="text-2xl font-bold text-center truncate">
                        {primaryName?.trim() || 'Search a city'}
                    </h1>
                    {secondaryName && (
                        <span className="block text-xs text-center text-muted-foreground truncate">
                            {secondaryName}
                        </span>
                    )}
                </div>
                {location && (
                    <div className="flex flex-col justify-center items-center">
                        <button
                            type="button"
                            className="cursor-pointer text-4xl font-bold"
                            onClick={() => setIs24Hour((current) => !current)}
                            aria-label={`Switch to ${is24Hour ? '12-hour' : '24-hour'} time format`}
                            title={`Switch to ${is24Hour ? '12-hour' : '24-hour'} time format`}
                        >
                            {timeString}
                        </button>
                        <span>{dateString}</span>
                    </div>
                )}
            </div>
            {location ? (
                <iframe
                    title={`Map of ${location.name}`}
                    src={location.mapUrl}
                    className="w-full lg:h-[stretch] min-h-60 rounded-[10px] border-0"
                    loading="lazy"
                    allowFullScreen
                />
            ) : (
                <div className="flex items-center justify-center bg-muted w-full h-40 rounded-[10px] text-muted-foreground">
                    Search for a location to load its map
                </div>
            )}
        </div>
    )
}

export default TimeMap