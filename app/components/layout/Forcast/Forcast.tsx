"use client"

import Image from "next/image"
import { Images } from '@/app/lib/constants'
import TemparatureToggler from '@/app/components/ui/TemparatureToggler'
import type { ForecastProps, TemperatureUnit } from '@/app/lib/types'
import { Skeleton } from '@/components/ui/skeleton'

type ForcastProps = ForecastProps & {
    unit: TemperatureUnit
    onUnitChange: (unit: TemperatureUnit) => void
}

export const ForecastSkeleton = () => (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 py-4 px-5 bg-[#d9d9d9] dark:bg-[#444] rounded-[30px] shadow-[10px_10px_4px_0px_rgba(0,0,0,0.5)]'>
        <div className="md:col-start-1 md:col-end-3 xl:col-end-2 space-y-5 p-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-20 w-48" />
            <Skeleton className="h-8 w-44" />
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-1">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </div>
        </div>
        <div className="space-y-4 text-center">
            <Skeleton className="mx-auto h-64 w-64 rounded-full" />
            <Skeleton className="mx-auto h-10 w-40" />
        </div>
        <div className="grid grid-cols-2 gap-4 p-2">
            {Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-28 w-full" />)}
        </div>
    </div>
)

const Forcast = ({ is_day, temp_c, humidity, wind_speed_10m, condition, temp_f, feelslike_c, feelslike_f, sunrise, sunset, pressure, uv, weather_code, unit, onUnitChange }: ForcastProps) => {
    const weatherIcon = `/icons/sky/${weather_code}${is_day}.png`

    return (
        <section aria-labelledby="current-weather-heading" className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 py-4 px-5 bg-[#d9d9d9] dark:bg-[#444] text-[#292929] dark:text-white rounded-[30px] shadow-[10px_10px_4px_0px_rgba(0,0,0,0.5)]'>
            <h2 id="current-weather-heading" className="sr-only">Current weather</h2>
            <div className="md:col-start-1 md:col-end-3 xl:col-end-2 grid grid-cols-1 md:grid-cols-2 xl:block">
                <div className="mb-4 flex flex-col items-center text-center md:items-start md:text-start md:mb-0">
                    <div className="flex items-start flex-col">
                        <TemparatureToggler unit={unit} onToggle={onUnitChange} />
                        <h2 className="text-[70px] font-bold tracking-tight">
                            {unit == 'C' ? temp_c : temp_f}°{unit}
                        </h2>
                    </div>
                    <h3 className="text-[20px] font-bold -mt-5">Feels Like  <span className="text-[32px] font-bold">{unit == 'C' ? feelslike_c : feelslike_f}°{unit}</span></h3>
                </div>
                <div className="grid grid-cols-2 text-center gap-1 xl:grid-cols-1">
                    <div className=" text-center xl:text-start xl:flex xl:flex-row xl:items-center xl:mt-6.5 xl:gap-2">
                        <Image src={Images.sunrise} width={48} height={48} alt="" aria-hidden="true" className="mx-auto xl:mx-0 filter invert dark:invert-0" />
                        <div>
                            <h4 className="font-bold text-[20px]">Sunrise</h4>
                            {sunrise}
                        </div>
                    </div>
                    <div className=" text-center xl:text-start xl:flex xl:flex-row xl:items-center xl:mt-3 xl:gap-2">
                        <Image src={Images.sunset} width={48} height={48} alt="" aria-hidden="true" className="mx-auto xl:mx-0 filter invert dark:invert-0" />
                        <div>
                            <h4 className="font-bold text-[20px]">Sunset</h4>
                            {sunset}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row-start-1 md:row-start-2 xl:row-auto text-center">
                <Image
                    src={weatherIcon}
                    width={270}
                    height={270}
                    sizes="(max-width: 768px) 70vw, 270px"
                    alt={`${condition} weather condition`}
                    className="mx-auto mb-2.5"
                    onError={(event) => {
                        event.currentTarget.src = Images.sunny;
                    }}
                />
                <div className="text-[32px] font-bold">{condition}</div>
            </div>
            <div className="grid grid-cols-2 gap-1">
                <div className="text-center">
                    <Image src={Images.humidity} width={58} height={58} alt="" aria-hidden="true" className="mx-auto mb-2.5 filter invert dark:invert-0" />
                    <div className="">
                        <h4 className="font-bold text-[20px]">{humidity}%</h4>
                        Humidity
                    </div>
                </div>
                <div className="text-center">
                    <Image src={Images.speed} width={58} height={58} alt="" aria-hidden="true" className="mx-auto mb-2.5 filter invert dark:invert-0" />
                    <div className="">
                        <h4 className="font-bold text-[20px]">{wind_speed_10m}km/h</h4>
                        Wind Speed
                    </div>
                </div>

                <div className="text-center">
                    <Image src={Images.pressure} width={58} height={58} alt="" aria-hidden="true" className="mx-auto mb-2.5 filter invert dark:invert-0" />
                    <div className="">
                        <h4 className="font-bold text-[20px]">{pressure}hPa</h4>
                        Pressure
                    </div>
                </div>

                <div className="text-center">
                    <Image src={Images.uv} width={58} height={58} alt="" aria-hidden="true" className="mx-auto mb-2.5 filter invert dark:invert-0" />
                    <div className="">
                        <h4 className="font-bold text-[20px]">{uv}</h4>
                        uv
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Forcast
