import type { Metadata } from 'next'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import About from '../page/about/About'

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn how WeathCast uses location search, OpenStreetMap, WeatherAPI, forecast controls, and time and theme settings.',
    applicationName: 'WeathCast',
    authors: [
        {
            name: 'Arnab Mitra',
            url: 'https://arnabmitra.vercel.app/',
        },
    ],
    creator: 'Arnab Mitra',
    publisher: 'WeathCast',
    keywords: ['about WeathCast', 'weather dashboard', 'OpenStreetMap', 'WeatherAPI', 'forecast controls'],
    alternates: { canonical: '/about' },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    openGraph: {
        type: 'website',
        url: 'https://weathcastbyarnab.vercel.app/about',
        siteName: 'WeathCast',
        title: 'About WeathCast',
        description: 'Learn how WeathCast provides location-aware weather forecasts and dashboard controls.',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary',
        title: 'About WeathCast',
        description: 'Learn how WeathCast provides location-aware weather forecasts and dashboard controls.',
    },
    formatDetection: { telephone: false },
};

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header showLocationControls={false} />
            <About />
            <Footer showLocationControls={false} />
        </div>
    )
}
