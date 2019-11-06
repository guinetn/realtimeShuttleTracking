# Realtime Shuttle Tracking

View position of the transports you're waiting for.

## Roadmap

- Display a map (try leaflet, mapbox… ?)
- Add static markers (SM) on map (bus stop, station...)
- Fake a dynamic marker (TM: Transport marker to fake a moving transport)
- See my device position on the map (Visitor Marker: VM). VM naming ?
- Create a DB to store (share) VM positions: firestore, mongodb… ?
- VM Subscribe/Push:
- App start: push (update) VM current position to DB in realtime (socket.io, define push frequency: app parameter ?)
- App stop: remove VM from DB (or remove unseen (unupdated) VM for a while (~ run sometimes a "VM garbage collector")
- Update VM in DB on the map
- Sync map with VM in DB
- Add option for transport driver to be identified (and tracked in DB) a TM
- Pass pwa !
- Next: TM average time between two or N SM = time estimation for VM waiting at SM

## Releases

SEO: tracking position suez shuttle

### Author

nicolas guinet <nguinet.pro@gmail.com>
