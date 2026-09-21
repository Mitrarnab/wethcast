import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://weathcastbyarnab.vercel.app/"),

  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },

  title: {
    default: "WeathCast – Local Weather Forecast & Live Weather",
    template: "%s | WeathCast",
  },

  description:
    "Get accurate local weather forecasts with current conditions, hourly weather, tomorrow's forecast, local time, and interactive weather maps for any location.",
  applicationName: "WeathCast",

  authors: [
    {
      name: "Arnab Mitra",
      url: "https://arnabmitra.vercel.app/",
    },
  ],

  creator: "Arnab Mitra",
  publisher: "WeathCast",

  category: "weather",

  keywords: [
    "weather forecast",
    "local weather",
    "current weather",
    "hourly weather forecast",
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
    url: "https://weathcastbyarnab.vercel.app/",
    siteName: "WeathCast",
    title: "WeathCast – Local Weather Forecast & Live Weather",
    description:
      "Check current weather, hourly forecasts, tomorrow's weather, local time, and interactive weather maps for any location.",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "WeathCast – Local Weather Forecast & Live Weather",
    description:
      "Check current weather, hourly forecasts, tomorrow's weather, local time, and weather maps for any location.",
  },

  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("", "antialiased", poppins.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
