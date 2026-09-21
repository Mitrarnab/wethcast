import { Images } from '@/app/lib/constants'
import Image from 'next/image'
import type { HourCardProps } from '@/app/lib/types'

const HourCard = ({ hour, unit }: HourCardProps) => {
    const rotation = Number(hour.wind_degree ?? 0);
    const weatherIcon = `/icons/sky/${hour.condition.code}${hour.is_day}.png`
    return (
        <div className={`font-bold text-center py-3.5 h-67.5 w-full min-w-0 rounded-[25px] ${hour.is_day ? ' bg-[linear-gradient(180deg,#F88508,#F6FAD9)] dark:bg-[linear-gradient(180deg,#7f4200,#282828)]' : ' bg-[linear-gradient(180deg,#443D64,#6582C6)] dark:bg-[linear-gradient(180deg,#29243d,#151a26)]'}`}>
            <div className='text-[24px]'>{new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}</div>
            <Image
                src={weatherIcon}
                width={80}
                height={80}
                alt="Hourley forcast"
                className="drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mx-auto mb-2.5"
            /> <div className="text-[20px]">{unit === 'C' ? hour.temp_c : hour.temp_f}°{unit}</div>
            <Image
                width={55}
                height={55}
                alt='Wind Direction'
                src={Images.navigation}
                className='drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] mx-auto'
                style={{ transform: `rotate(${rotation}deg)` }}
            />
            <div className="text-[20px]">{hour.wind_kph} km/h</div>
        </div>
    )
}

export default HourCard
