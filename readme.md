# Realtime Shuttle Tracking
View position of the transports you're waiting for.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Demo
[![Netlify Status](https://api.netlify.com/api/v1/badges/01e2ae04-b673-49c7-984b-4f8d6f2990b4/deploy-status)](https://app.netlify.com/sites/realtimeshuttletracking/deploys)

Online demo: https://realtimeshuttletracking.netlify.com

# Installation

> $git clone https://github.com/guinetn/RealtimeShuttleTracking.git  
$cd RealtimeShuttleTracking  
$npm  
$npm run serve Open automatically http://localhost:1234/

**Build a release**

> \$npm run build  
This will generate a release in /dist

## Terms

| Abbr | Name           | Description                                                                             |
| ---- | -------------- | --------------------------------------------------------------------------------------- |
| SM   | Static Marker  | A remarkable point on the map (in the app context it's a meeting place between DM & VM) |
| DM   | Dynamic Marker | A public transportation on the map. Updated regularly                                   |
| VM   | Visitor Marker | Map marker indicating people connected (you appear in red, others in white)             |

## Roadmap

**1. WORKING SKELETON: STATIC ASSETS**

- ✔ Display a map (try leaflet, mapbox… ?) - (mapbox choose)
- ✔ Add **static markers (SM)** on map (bus stop, station...)
- ✔ Fake a **dynamic marker (DM)**: A transport marker to fake a moving transport
- ✔ Watch (tracking) my device position changes on the map (**Visitor Marker: VM**)
- ☐ VM naming ? device UID availabel: mac addr, tel number ?

**2. GO REALTIME**

- ☐ Create a DB to store (share) VM positions: firestore, mongodb… ?
- VM Subscribe/Push:
- ☐ App start: push (update) VM current position to DB in realtime (socket.io, define push frequency: app parameter ?)
- ☐ App stop: remove VM from DB (or remove unseen (unupdated) VM for a while (~ run sometimes a "VM garbage collector")
- ☐ Update VM in DB on the map
- ☐ Sync map with VM in DB
- ☐ Add option for transport driver to be identified (and tracked in DB) a DM
- ☐ Each SM display (on click) the last 3rd times a DM passed around (in a radius of…)

**3. BE PROGRESSIVE**

- ✔ Pass pwa !

**4. CHERRY ON THE CAKE**

- ☐ DM average time between two or N SM = time estimation for VM waiting at SM
- ☐ DM can view how many people are near (radius=?) / have subscribed on SM
- ☐ SM: transportation news

## Releases

SEO keywords: tracking position suez shuttle

### Author

nicolas guinet <nguinet.pro@gmail.com>
