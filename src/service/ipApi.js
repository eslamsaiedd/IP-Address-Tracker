// export const getIpData = async (ip) => {
//   try {
//     // Use ip-api.com (free, no API key needed)
//     const url = ip ? `http://ip-api.com/json/${ip}` : "http://ip-api.com/json/";

//     const res = await fetch(url);

//     if (!res.ok) throw new Error("Failed to fetch");

//     const data = await res.json();

//     // Check for API errors
//     if (data.status === "fail") {
//       throw new Error(data.message || "API Error");
//     }

//     // Map ip-api.com response to expected format
//     return {
//       ip: data.query,
//       isp: data.isp || data.org || "Unknown",
//       location: {
//         city: data.city || "Unknown",
//         region: data.regionName || data.region || "Unknown",
//         postalCode: data.zip || "Unknown",
//         timezone: data.timezone || "Unknown",
//         lat: parseFloat(data.lat) || 0,
//         lng: parseFloat(data.lon) || 0,
//         country: data.countryCode || data.country || "Unknown",
//       },
//     };
//   } catch (err) {
//     console.error("API Error:", err);
//     throw err;
//   }
// };


const API_KEY = import.meta.env.VITE_IP_API_KEY?.replace(/"/g, "").trim();

export const getIpData = async (ip = "") => {
  try {
    const base = "https://api.ipgeolocation.io/ipgeo";
    const url = ip
      ? `${base}?apiKey=${API_KEY}&ip=${ip}`
      : `${base}?apiKey=${API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    // ipgeolocation.io returns a "message" field on errors
    if (data.message) {
      throw new Error(data.message);
    }

    return {
      ip: data.ip,
      isp: data.isp || data.organization || "Unknown",
      location: {
        city: data.city || "Unknown",
        region: data.state_prov || "Unknown",
        postalCode: data.zipcode || "Unknown",
        timezone: data.time_zone?.name || "Unknown",
        lat: parseFloat(data.latitude) || 0,
        lng: parseFloat(data.longitude) || 0,
        country: data.country_name || "Unknown",
        countryCode: data.country_code2 || "",
      },
    };
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};