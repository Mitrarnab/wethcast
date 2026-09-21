"use client"

import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import HourCard from './HourCard'
import type { HourlyForecastProps } from '@/app/lib/types'

const HourlyForcast = ({ hourly, timezone, unit }: HourlyForecastProps) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const cardRefs = useRef<Array<HTMLDivElement | null>>([])
    const visibleHours = hourly.slice(0, 24)

    useEffect(() => {
        const findCurrentHour = () => {
            const now = new Date()
            const parts = new Intl.DateTimeFormat('en-CA', {
                timeZone: timezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                hourCycle: 'h23',
            }).formatToParts(now)
            const part = (type: Intl.DateTimeFormatPartTypes) => parts.find(({ type: partType }) => partType === type)?.value
            const currentHour = `${part('year')}-${part('month')}-${part('day')} ${part('hour')}`
            const currentIndex = visibleHours.findIndex((hour) => hour.time.startsWith(currentHour))

            if (currentIndex >= 0) setActiveIndex(currentIndex)
        }

        findCurrentHour()
        const interval = setInterval(findCurrentHour, 60_000)
        return () => clearInterval(interval)
    }, [hourly, timezone])

    useEffect(() => {
        cardRefs.current[activeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }, [activeIndex])

    const moveSlider = (direction: -1 | 1) => {
        setActiveIndex((index) => Math.min(Math.max(index + direction, 0), visibleHours.length - 1))
    }

    return (
        <div className='w-full lg:max-w-xl xl:max-w-3xl py-4 px-5 bg-[#d9d9d9] dark:bg-[#444] text-[#292929] dark:text-white rounded-[30px] shadow-[10px_10px_4px_0px_rgba(0,0,0,0.5)]'>
            <div className='flex items-center justify-between gap-3'>
                <button
                    type='button'
                    onClick={() => moveSlider(-1)}
                    disabled={activeIndex === 0 || visibleHours.length === 0}
                    aria-label='Show earlier hours'
                    className='shrink-0 cursor-pointer rounded-full p-2 transition-colors hover:bg-black/10 disabled:cursor-default disabled:opacity-30 dark:hover:bg-white/10'
                >
                    <ChevronLeft aria-hidden='true' />
                </button>
                <h2 className='text-center text-[32px] font-bold'>Hourly Forecast</h2>
                <button
                    type='button'
                    onClick={() => moveSlider(1)}
                    disabled={activeIndex === visibleHours.length - 1 || visibleHours.length === 0}
                    aria-label='Show later hours'
                    className='shrink-0 cursor-pointer rounded-full p-2 transition-colors hover:bg-black/10 disabled:cursor-default disabled:opacity-30 dark:hover:bg-white/10'
                >
                    <ChevronRight aria-hidden='true' />
                </button>
            </div>
            <div className='mt-3'>
                <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {visibleHours.map((hour, index) => (
                        <div
                            key={hour.time}
                            ref={(element) => { cardRefs.current[index] = element }}
                            className='min-w-0 flex-[0_0_calc((100%_-_1.5rem)_/_3)] lg:flex-[0_0_calc((100%_-_3rem)_/_5)]'
                        >
                            <HourCard hour={hour} unit={unit} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HourlyForcast
