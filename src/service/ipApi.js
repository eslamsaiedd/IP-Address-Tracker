
export const getIpData = async (ip) => {
  const API_KEY = import.meta.env.VITE_IP_API_KEY;

  const res = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`
  );

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
};