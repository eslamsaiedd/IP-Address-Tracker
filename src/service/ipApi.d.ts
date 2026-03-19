export interface IpApiResponse {
  ip: string;
  isp: string;
  location: {
    city: string;
    region: string;
    postalCode: string;
    timezone: string;
    lat: number;
    lng: number;
    country: string;
  };
}

export const getIpData: (ip: string) => Promise<IpApiResponse>;
