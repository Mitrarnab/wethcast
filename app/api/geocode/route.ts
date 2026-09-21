import { NextResponse } from "next/server";
import { find as findTimezone } from "geo-tz";

export async function GET(request: Request) {
  try {
    const query = new URL(request.url).searchParams.get("query")?.trim();

    if (!query) {
      return NextResponse.json(
        { error: "A location is required." },
        { status: 400 },
      );
    }

    const geocodeUrl = new URL("https://nominatim.openstreetmap.org/search");
    geocodeUrl.searchParams.set("q", query);
    geocodeUrl.searchParams.set("format", "json");
    geocodeUrl.searchParams.set("limit", "1");

    const response = await fetch(geocodeUrl, {
      headers: { "User-Agent": "WeathCast/1.0 " },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error("Nominatim error:", response.status, await response.text());
      return NextResponse.json(
        { error: "Location lookup failed." },
        { status: 502 },
      );
    }

    const data = await response.json();

    if (!data?.[0]) {
      return NextResponse.json(
        { error: "Location not found." },
        { status: 404 },
      );
    }

    const result = data[0];
    const latitude = parseFloat(result.lat);
    const longitude = parseFloat(result.lon);
    const timezone = findTimezone(latitude, longitude)[0] ?? "UTC";

    if (!result.boundingbox) {
      return NextResponse.json(
        { error: "Incomplete location data." },
        { status: 502 },
      );
    }
    const [south, north, west, east] = result.boundingbox;

    return NextResponse.json({
      name: result.display_name,
      latitude,
      longitude,
      timezone,
      mapUrl: `https://www.openstreetmap.org/export/embed.html?bbox=${west},${south},${east},${north}&marker=${latitude},${longitude}`,
    });
  } catch (err) {
    console.error("Geocode route crashed:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
