type TemperatureUnit = 'C' | 'F'

type TemperatureTogglerProps = {
    unit: TemperatureUnit
    onToggle: (nextUnit: TemperatureUnit) => void
}

const TemparatureToggler = ({ unit, onToggle }: TemperatureTogglerProps) => {
    const options: TemperatureUnit[] = ['C', 'F']

    return (
        <div className="inline-flex -mb-3.5 items-center rounded-full  bg-slate-200/90 p-1 shadow-inner ring-1 ring-black/5 dark:bg-slate-700 dark:ring-white/10">
            {options.map((option) => {
                const active = unit === option

                return (
                    <button
                        key={option}
                        type="button"
                        aria-label={`Switch temperature to ${option}`}
                        aria-pressed={active}
                        onClick={() => onToggle(option)}
                        className={[
                            'min-w-12 rounded-full px-3 py-1.5 text-sm font-bold transition-all duration-200 cursor-pointer',
                            active
                                ? 'bg-[#FF6D00] text-white shadow-sm'
                                : 'text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white',
                        ].join(' ')}
                    >
                        °{option}
                    </button>
                )
            })}
        </div>
    )
}

export default TemparatureToggler
