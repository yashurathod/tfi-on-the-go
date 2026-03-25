export interface BusPosition {
  id: string;
  routeNumber: string;
  operator: "Dublin Bus" | "Bus Éireann" | "Go-Ahead";
  direction: string;
  lat: number;
  lng: number;
  nextStop: string;
  delay: number; // minutes, negative = early
  heading: number;
}

export interface BusStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  routes: string[];
}

export interface BusRoute {
  id: string;
  number: string;
  name: string;
  operator: "Dublin Bus" | "Bus Éireann" | "Go-Ahead";
  stops: BusStop[];
  color: string;
}

export interface Arrival {
  routeNumber: string;
  destination: string;
  operator: string;
  minutesAway: number;
  delay: number;
  scheduled: string;
}

// Mock bus positions around Dublin
export const mockBusPositions: BusPosition[] = [
  { id: "b1", routeNumber: "39A", operator: "Dublin Bus", direction: "UCD Belfield", lat: 53.3498, lng: -6.2603, nextStop: "O'Connell Street", delay: 2, heading: 180 },
  { id: "b2", routeNumber: "46A", operator: "Dublin Bus", direction: "Phoenix Park", lat: 53.3382, lng: -6.2591, nextStop: "Dame Street", delay: -1, heading: 270 },
  { id: "b3", routeNumber: "16", operator: "Dublin Bus", direction: "Dublin Airport", lat: 53.3558, lng: -6.2648, nextStop: "Parnell Square", delay: 0, heading: 0 },
  { id: "b4", routeNumber: "15", operator: "Dublin Bus", direction: "Ballycullen", lat: 53.3441, lng: -6.2675, nextStop: "College Green", delay: 5, heading: 190 },
  { id: "b5", routeNumber: "145", operator: "Dublin Bus", direction: "Heuston Station", lat: 53.3465, lng: -6.2810, nextStop: "Thomas Street", delay: 0, heading: 260 },
  { id: "b6", routeNumber: "27", operator: "Dublin Bus", direction: "Jobstown", lat: 53.3320, lng: -6.2490, nextStop: "Pearse Street", delay: 3, heading: 210 },
  { id: "b7", routeNumber: "7", operator: "Go-Ahead", direction: "Bride's Glen", lat: 53.3410, lng: -6.2530, nextStop: "Merrion Square", delay: -2, heading: 160 },
  { id: "b8", routeNumber: "175", operator: "Go-Ahead", direction: "UCD", lat: 53.3350, lng: -6.2400, nextStop: "Ballsbridge", delay: 1, heading: 150 },
  { id: "b9", routeNumber: "X27", operator: "Bus Éireann", direction: "Kildare", lat: 53.3480, lng: -6.2950, nextStop: "Heuston Station", delay: 0, heading: 240 },
  { id: "b10", routeNumber: "101", operator: "Bus Éireann", direction: "Drogheda", lat: 53.3600, lng: -6.2500, nextStop: "Drumcondra", delay: 4, heading: 20 },
];

export const mockStops: BusStop[] = [
  { id: "s1", name: "O'Connell Street", lat: 53.3498, lng: -6.2603, routes: ["39A", "16", "46A", "145"] },
  { id: "s2", name: "Dame Street", lat: 53.3441, lng: -6.2637, routes: ["46A", "15", "27"] },
  { id: "s3", name: "College Green", lat: 53.3445, lng: -6.2591, routes: ["15", "46A", "39A"] },
  { id: "s4", name: "Pearse Street", lat: 53.3420, lng: -6.2510, routes: ["27", "7", "175"] },
  { id: "s5", name: "Merrion Square", lat: 53.3395, lng: -6.2490, routes: ["7", "175", "27"] },
  { id: "s6", name: "Heuston Station", lat: 53.3463, lng: -6.2926, routes: ["145", "X27"] },
  { id: "s7", name: "Parnell Square", lat: 53.3535, lng: -6.2639, routes: ["16", "39A"] },
  { id: "s8", name: "Drumcondra", lat: 53.3643, lng: -6.2561, routes: ["16", "101"] },
  { id: "s9", name: "Ballsbridge", lat: 53.3310, lng: -6.2340, routes: ["7", "175"] },
  { id: "s10", name: "Thomas Street", lat: 53.3430, lng: -6.2810, routes: ["145", "X27"] },
];

export const mockRoutes: BusRoute[] = [
  { id: "r1", number: "39A", name: "UCD Belfield - Ongar", operator: "Dublin Bus", color: "#16a34a", stops: [mockStops[0], mockStops[2], mockStops[6]] },
  { id: "r2", number: "46A", name: "Phoenix Park - Dún Laoghaire", operator: "Dublin Bus", color: "#16a34a", stops: [mockStops[0], mockStops[1], mockStops[2]] },
  { id: "r3", number: "16", name: "Dublin Airport - Ballinteer", operator: "Dublin Bus", color: "#16a34a", stops: [mockStops[0], mockStops[6], mockStops[7]] },
  { id: "r4", number: "7", name: "Mountjoy Sq - Bride's Glen", operator: "Go-Ahead", color: "#0ea5e9", stops: [mockStops[3], mockStops[4], mockStops[8]] },
  { id: "r5", number: "X27", name: "Dublin - Kildare", operator: "Bus Éireann", color: "#f97316", stops: [mockStops[5], mockStops[9]] },
];

export function getArrivalsForStop(stopId: string): Arrival[] {
  const stop = mockStops.find(s => s.id === stopId);
  if (!stop) return [];

  return stop.routes.map((route, i) => ({
    routeNumber: route,
    destination: mockRoutes.find(r => r.number === route)?.name.split(" - ")[1] || "City Centre",
    operator: mockRoutes.find(r => r.number === route)?.operator || "Dublin Bus",
    minutesAway: Math.floor(Math.random() * 15) + 1,
    delay: Math.floor(Math.random() * 6) - 2,
    scheduled: `${new Date().getHours()}:${String(new Date().getMinutes() + i * 5).padStart(2, "0")}`,
  })).sort((a, b) => a.minutesAway - b.minutesAway);
}
