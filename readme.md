# Realtime Shuttle Tracking

View position of the transports you're waiting for.

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
- ✔ See my device position on the map (**Visitor Marker: VM**)
- > VM naming ?

**2. GO REALTIME**

- ☐ Create a DB to store (share) VM positions: firestore, mongodb… ?
- VM Subscribe/Push:
- ☐ App start: push (update) VM current position to DB in realtime (socket.io, define push frequency: app parameter ?)
- ☐ App stop: remove VM from DB (or remove unseen (unupdated) VM for a while (~ run sometimes a "VM garbage collector")\*
- ☐ Update VM in DB on the map
- ☐ Sync map with VM in DB
- ☐ Add option for transport driver to be identified (and tracked in DB) a DM
- ☐ Each SM display (on click) the last 3rd times a DM passed around (in a radius of…)

**3. BE PROGRESSIVE**

- ☐ Pass pwa !
- 4. CHERRY ON THE CAKE
- ☐ DM average time between two or N SM = time estimation for VM waiting at SM
- ☐ DM can view how many people are near (radius=?) / have subscribed on SM

## Releases

SEO keywords: tracking position suez shuttle

## Helpers

- https://github.com/googlecodelabs/your-first-pwapp
- https://codelabs.developers.google.com/codelabs/your-first-pwapp/#1
- https://developers.google.com/web/fundamentals/architecture/app-shell
- https://stackoverflow.com/questions/40135745/google-cloud-messaging-in-node-js

npm init
npm install -g parcel-bundler

npm i -D node-sass
import './style.scss'
parcel src/index.html
http://localhost:1234/index.html

start-url-of-a-manifest-json is not valid:
https://stackoverflow.com/questions/45412014/how-do-i-set-the-start-url-of-a-manifest-json-to-be-the-root-of-the-site

https://app-manifest.firebaseapp.com/

Manifest: Line: 1, column: 1, Syntax error on Chrome browser
https://github.com/parcel-bundler/parcel/issues/235
Fix: Rename manifest.json to manifest.webmanifest

<link rel="manifest" href="manifest.webmanifest">

https://developers.google.com/web/tools/lighthouse/
npm install -g lighthouse
lighthouse <url>

https://levelup.gitconnected.com/build-a-pwa-using-only-vanilla-javascript-bdf1eee6f37a
https://alexjover.com/blog/how-i-made-a-progressive-web-app-out-of-my-blog/

https://github.com/parcel-bundler/parcel/issues/470
JS and CSS files not found after parcel build
Fix: parcel build src/index.html --public-url ./ --no-source-maps
--public-url ./ will allow the app to be served from a subdirectory, otherwise links will be referenced to /.

https://css-tricks.com/why-parcel-has-become-my-go-to-bundler-for-development/
"scripts": {
"prebuild": "rm -rf dist",
"build": "parcel build index.html --no-source-maps",
"serve": "parcel index.html --open"
}

## PWA

https://love2dev.com/pwa/

https://love2dev.com/blog/html-geolocation/

Tracking Position Changes

sw

- put it at / to be able to serve all content
  https://serviceworke.rs/
  https://developers.google.com/web/fundamentals/primers/service-workers

https://love2dev.com/blog/beforeinstallprompt/

https://codelabs.developers.google.com/codelabs/realtime-asset-tracking/index.html?index=..%2F..%2Findex#6

Run "audits" on pwa from devtools (F12)

## build

https://parceljs.org/cli.html
parcel build entry.js --no-source-maps

--no-source-maps issue: delete .cache & dist before build
https://github.com/parcel-bundler/parcel/issues/2079

### Author

nicolas guinet <nguinet.pro@gmail.com>
