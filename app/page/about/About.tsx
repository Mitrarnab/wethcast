import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const About = () => {
    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-12 lg:px-8">
            <header className="mb-8 rounded-[30px] bg-[#d9d9d9] px-6 py-8 text-[#292929] shadow-[10px_10px_4px_0px_rgba(0,0,0,0.35)] dark:bg-[#444] dark:text-white sm:px-10 sm:py-10">
                <p className="mb-2 font-bold uppercase tracking-[0.2em] text-[#3AA8F6]">About WeathCast</p>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">A clearer way to read the sky.</h1>
                <p className="mt-5 max-w-3xl text-base leading-8 sm:text-lg">
                    This page explains the controls, forecast sections, time and temperature formats, and services behind the WeathCast dashboard.
                </p>
            </header>

            <section aria-labelledby="getting-started" className="mb-8">
                <h2 id="getting-started" className="mb-4 text-3xl font-bold">Getting started</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <article className="rounded-[25px] border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                        <h3 className="text-2xl font-bold">Search for a place</h3>
                        <p className="mt-4 text-sm leading-7 sm:text-base">
                            Type a city or place into the search field in the header. WeathCast sends the query to its geocoding route, which uses OpenStreetMap Nominatim to find the matching coordinates. Those coordinates are then used to request the forecast.
                        </p>
                    </article>
                    <article className="rounded-[25px] border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                        <h3 className="text-2xl font-bold">Use current location</h3>
                        <p className="mt-4 text-sm leading-7 sm:text-base">
                            Select <span className='underline   underline-offset-4'>Current Location</span> to let your browser provide your coordinates. WeathCast reverse-geocodes them with OpenStreetMap Nominatim, then loads weather for that location. Your browser may ask for permission first.
                        </p>
                    </article>
                    <article className="rounded-[25px] border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5 md:col-span-2">
                        <h3 className="text-2xl font-bold">Map and coordinates</h3>
                        <p className="mt-4 text-sm leading-7 sm:text-base">
                            The latitude and longitude for searched places and current locations come from <a href='https://nominatim.org/' target='_blank' rel='noopener noreferrer' className='font-bold'>OpenStreetMap Nominatim</a>. The map in the dashboard is then populated with an embedded map from <a href='https://www.openstreetmap.org/' target='_blank' rel='noopener noreferrer' className='font-bold'>OpenStreetMap</a>, centered on those coordinates. WeathCast also uses the coordinates to determine the location's timezone.
                        </p>
                    </article>
                </div>
            </section>

            <section aria-labelledby="controls" className="mb-8">
                <h2 id="controls" className="mb-4 text-3xl font-bold">Controls and formats</h2>
                <dl className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-[25px] border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                        <dt className="text-xl font-bold">Temperature toggle</dt>
                        <dd className="mt-3 text-sm leading-7">The Celsius/Fahrenheit control in the main forecast card changes every temperature across the page, including current, hourly, and tomorrow's values.</dd>
                    </div>
                    <div className="rounded-[25px] border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                        <dt className="text-xl font-bold">24-hour time</dt>
                        <dd className="mt-3 text-sm leading-7">Click the current time shown above the map to switch between 24-hour and 12-hour formats. The hourly cards use a 24-hour clock, and the left and right arrows move through the 24 hourly forecast cards.</dd>
                    </div>
                    <div className="rounded-[25px] border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                        <dt className="text-xl font-bold">Theme switcher</dt>
                        <dd className="mt-3 text-sm leading-7">Use the sun and moon control in the header to switch between light and dark themes. The selected theme applies throughout the interface.</dd>
                    </div>
                </dl>
            </section>

            <section aria-labelledby="forecast" className="mb-8">
                <h2 id="forecast" className="mb-4 text-3xl font-bold">Reading the forecast</h2>
                <div className="rounded-[25px] border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                    <p className="text-sm leading-7 sm:text-base">
                        The current forecast includes temperature, feels-like temperature, condition, humidity, wind, pressure, UV index, sunrise, and sunset. The hourly forecast shows changing conditions throughout the next day, while the tomorrow panel summarizes the next day's average temperature and daylight times.
                    </p>
                    <p className="mt-4 text-sm leading-7 sm:text-base">
                        Weather information comes from <a target='_blank' rel='noopener noreferrer' href='https://www.weatherapi.com/' className='font-bold'>WeatherAPI.com</a> through the WeathCast weather route. The API key stays on the server, and the browser receives only the forecast data needed to render the dashboard.
                    </p>
                </div>
            </section>

            <div className="mt-8 text-center">
                <Link href="/" className="font-bold text-black underline-offset-4 max-w-sm mx-auto flex items-center justify-center">
                    <ArrowLeft />  Back to the forecast
                </Link>
            </div>
        </main>
    )
}

export default About
