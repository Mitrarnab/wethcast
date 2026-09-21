import type { Metadata } from 'next'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import About from '../page/about/About'

export const metadata: Metadata = {
    title: 'About WeathCast | Weather Dashboard Guide',
    description: 'Learn how WeathCast uses location search, OpenStreetMap, WeatherAPI, forecast controls, and time and theme settings.',
    keywords: ['WeathCast', 'weather dashboard', 'OpenStreetMap', 'WeatherAPI', 'forecast guide'],
    openGraph: {
        title: 'About WeathCast | Weather Dashboard Guide',
        description: 'Learn how WeathCast provides location-aware weather forecasts and dashboard controls.',
        type: 'website',
    },
}

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header showLocationControls={false} />
            <About />
            <Footer showLocationControls={false} />
        </div>
    )
}
