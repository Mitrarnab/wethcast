import { Images } from '@/app/lib/constants'
import Image from 'next/image'
import type { TemperatureUnit, TomorrowDataProps } from '@/app/lib/types'
import { Skeleton } from '@/components/ui/skeleton'

type TomorrowDataComponentProps = TomorrowDataProps & {
    unit: TemperatureUnit
}

export const TomorrowSkeleton = () => (
    <div className='lg:min-w-sm xl:min-w-md w-full py-4 px-5 bg-[#d9d9d9] dark:bg-[#444] rounded-[30px] shadow-[10px_10px_4px_0px_rgba(0,0,0,0.5)]'>
        <Skeleton className="mx-auto h-10 w-44" />
        <Skeleton className="mx-auto mt-2 h-6 w-48" />
        <div className="grid grid-cols-2 items-center gap-4 py-4">
            <Skeleton className="mx-auto h-40 w-40 rounded-full" />
            <div className="space-y-3">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
        </div>
    </div>
)

const TomorrowData = ({ date, code, condition, temp_c, temp_f, sunrise, sunset, unit }: TomorrowDataComponentProps) => {
    const temperature = unit === 'C' ? temp_c : temp_f;
    const summary = condition;
    const formattedDate = date
        ? new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : '';
    const weatherIcon = `/icons/sky/${code}1.png`
    return (
        <div className='lg:min-w-sm xl:min-w-md w-full py-4 px-5 bg-[#d9d9d9] dark:bg-[#444] text-[#292929] dark:text-white rounded-[30px] shadow-[10px_10px_4px_0px_rgba(0,0,0,0.5)]'>
            <h2 className='text-[32px] font-bold text-center'>Tomorrow</h2>
            <h3 className="text-[20px] text-center">{formattedDate}</h3>
            <div className='grid grid-cols-2 items-center text-center'>
                <Image width={200} height={200} sizes="(max-width: 640px) 45vw, 200px" alt='tomorrow sky' src={weatherIcon} className='mx-auto mb-3 col-end-3 col-start-1 sm:mb-0 sm:col-end-2 sm:col-start-1' />
                <div className="mb-3 col-end-3 col-start-1 sm:mb-0 sm:col-start-2">
                    <h3 className="text-[50px] font-bold">
                        {temperature}°{unit}
                    </h3>
                    <h3 className='text-[30px] font-bold'>{summary}</h3>
                </div>
                <div className="justify-center text-center flex flex-col md:flex-row items-center gap-2">
                    <Image src={Images.sunrise} width={48} height={48} alt="sunrise icon" className=" filter invert dark:invert-0" />
                    <div>
                        <h4 className="font-bold text-[20px]">Sunrise</h4>
                        {sunrise}
                    </div>
                </div>
                <div className="justify-center text-center flex flex-col md:flex-row items-center gap-2">
                    <Image src={Images.sunset} width={48} height={48} alt="sunset icon" className=" filter invert dark:invert-0" />
                    <div>
                        <h4 className="font-bold text-[20px]">Sunset</h4>
                        {sunset}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TomorrowData
