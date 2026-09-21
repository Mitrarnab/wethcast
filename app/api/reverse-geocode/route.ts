import { NextResponse } from "next/server";
import { find as findTimezone } from "geo-tz";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (
      !lat ||
      !lon ||
      !Number.isFinite(Number(lat)) ||
      !Number.isFinite(Number(lon))
    ) {
      return NextResponse.json(
        { error: "Valid coordinates are required." },
        { status: 400 },
      );
    }

    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.set("lat", lat);
    url.searchParams.set("lon", lon);
    url.searchParams.set("format", "json");

    const response = await fetch(url, {
      headers: { "User-Agent": "WeathCast/1.0" },
      next: { revalidate: 3600 },
    });
    const data = await response.json();

    if (!response.ok || !data || data.error || !data.boundingbox) {
      return NextResponse.json(
        { error: "Could not resolve your location." },
        { status: 404 },
      );
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);
    const timezone = findTimezone(latitude, longitude)[0] ?? "UTC";
    const [south, north, west, east] = data.boundingbox;

    return NextResponse.json({
      name: data.display_name,
      latitude,
      longitude,
      timezone,
      mapUrl: `https://www.openstreetmap.org/export/embed.html?bbox=${west},${south},${east},${north}&marker=${latitude},${longitude}`,
    });
  } catch (error) {
    console.error("Reverse geocode failed:", error);
    return NextResponse.json(
      { error: "Location lookup failed." },
      { status: 502 },
    );
  }
}
