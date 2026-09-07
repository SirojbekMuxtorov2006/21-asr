export interface OfficeLocation {
  id: string;
  name: string;
  isMain?: boolean;
  address: string;
  landmark: string;
  mapUrl: string;
  phone?: string;
  telegramUrl?: string;
  coordinates?: { lat: number; lng: number };
}

export const OFFICES_DATA: OfficeLocation[] = [
  {
    id: "urgut-main",
    name: "Bosh ofis (Urgut)",
    isMain: true,
    address: "Urgut tumani, Davlat xizmatlar markazi ro'parasida",
    landmark: "Urgut Davlat xizmatlar markazi (Yagona darcha) ro'parasida",
    mapUrl: "https://maps.google.com/maps?q=39.662412,66.939374&ll=39.662412,66.939374&z=16",
    telegramUrl: "https://t.me/asrxizmatlari",
    phone: "+998 (55) 701-21-00",
    coordinates: { lat: 39.662412, lng: 66.939374 },
  },
  {
    id: "samarqand-city",
    name: "Samarqand shahar ofisi",
    isMain: false,
    address: "Samarqand shahar, Davlat xizmatlar markazi pastki qismida",
    landmark: "Samarqand shahar Davlat xizmatlar markazi (Yagona Darcha) pastki qismida",
    mapUrl: "https://maps.app.goo.gl/GqA1crWiuazoQC6fA",
    telegramUrl: "https://t.me/asrxizmatlari",
    phone: "+998 (55) 701-21-00",
  },
  {
    id: "pastdargom",
    name: "Pastdarg'om ofisi",
    isMain: false,
    address: "Pastdarg'om tumani, Davlat xizmatlar markazi ro'parasida",
    landmark: "Pastdarg'om Davlat xizmatlar markazi (Yagona Darcha) ro'parasida",
    mapUrl: "https://www.google.com/maps/place/39%C2%B042'40.4%22N+66%C2%B040'09.7%22E/@39.711227,66.669349,1740m",
    telegramUrl: "https://t.me/asrxizmatlari",
    phone: "+998 (55) 701-21-00",
    coordinates: { lat: 39.711227, lng: 66.669349 },
  },
];
