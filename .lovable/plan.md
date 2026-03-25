

## TFI Ireland Live Bus Tracker

A native mobile app (via Capacitor) with a clean, light design to track TFI buses in real-time across Ireland.

### Design
- **Light theme** with white/light grey backgrounds, green (#16a34a) as primary transit color, blue (#0ea5e9) as accent
- Bottom tab navigation: Map, Search, Favorites, Settings
- Mobile-first responsive layout with rounded cards and subtle shadows

### Core Screens & Features

**1. Live Bus Map (Home)**
- Full-screen interactive map using **Leaflet + OpenStreetMap** (free, no API key needed)
- Bus markers showing route number, updated in real-time via TFI GTFS-R feed
- Tap a bus to see route details, direction, and next stops
- User location button to center on current position

**2. Route Search**
- Search bar to find bus routes by number or stop name
- Display route on map with all stops highlighted
- Filter by operator (Dublin Bus, Bus Éireann, Go-Ahead)

**3. Arrival Times**
- Tap any bus stop on the map or search for a stop
- Show real-time estimated arrivals for all routes serving that stop
- Color-coded timing (green = on time, red = delayed)

**4. Favorites**
- Save frequently used stops and routes
- Quick-access cards on a dedicated tab with live arrival countdowns
- Stored locally on device

**5. Capacitor Setup**
- Configure for iOS and Android deployment
- Enable hot-reload for development

### Data Source
- TFI's publicly available **GTFS and GTFS-Realtime** feeds for live bus positions, routes, and schedules

