import type { Metadata } from 'next'
import Header from '@/app/components/layout/Header'
import Footer from '@/app/components/layout/Footer'
import About from '../page/about/About'

const siteName = "WeathCast";
const siteUrl = "https://weathcastbyarnab.vercel.app/";

const siteDescription =
    "Get local weather forecasts with current conditions, hourly weather, tomorrow's forecast, local time, and interactive weather maps for any location.";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),

    title: {
        default: "WeathCast – Local Weather Forecast & Live Weather",
        template: "%s | WeathCast",
    },

    description: siteDescription,

    applicationName: siteName,

    authors: [
        {
            name: "Arnab Mitra",
            url: "https://arnabmitra.vercel.app/",
        },
    ],

    creator: "Arnab Mitra",
    publisher: siteName,

    category: "weather",

    keywords: [
        "weather forecast",
        "local weather",
        "current weather",
        "hourly weather",
        "tomorrow weather",
        "weather today",
        "weather map",
        "live weather",
        "weather by location",
    ],

    alternates: {
        canonical: "/",
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },

    openGraph: {
        type: "website",
        url: siteUrl,
        siteName,
        title: "WeathCast – Local Weather Forecast & Live Weather",
        description: siteDescription,
        locale: "en_US",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "WeathCast local weather forecast",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "WeathCast – Local Weather Forecast & Live Weather",
        description: siteDescription,
        images: ["/og-image.png"],
    },

    formatDetection: {
        telephone: false,
    },
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
