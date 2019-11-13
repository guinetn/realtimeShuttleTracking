import '../style.scss'
// Firebase Core
import * as firebase from 'firebase/app'
// Firebase products
import 'firebase/database'

var firebaseConfig = {
  apiKey: 'AIzaSyD7b_gWWcQSX-l8Ik3V-3JITPrAqNNfjvo',
  authDomain: 'realtime-shuttle-tracking.firebaseapp.com',
  databaseURL: 'https://realtime-shuttle-tracking.firebaseio.com',
  projectId: 'realtime-shuttle-tracking',
  storageBucket: 'realtime-shuttle-tracking.appspot.com',
  messagingSenderId: '250774426185',
  appId: '1:250774426185:web:f7f11a47ab9dd8ee74e598'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Map will be centered near 'Suez' Le Pecq (France)
const mapCenter = { lat: 48.89486, long: 2.11367 }
const myPositionAccuracy = document.querySelector('#myPositionAccuracy')

// Fix ESlint "L is not defined"
var L = window.L
// My api token
L.mapbox.accessToken = 'pk.eyJ1Ijoibmd1aW5ldCIsImEiOiJjaW1pdXU0M28wMDB1dmxtNTB5aXR4dDh1In0.60moP3OPbtqFBKD-ba4OBQ'

var map = L.mapbox
  .map('map')
  .setView([mapCenter.lat, mapCenter.long], 16)
  .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'))

// Add scale (a map without a scale is not!)
L.control.scale().addTo(map)

// Add SM (Static markers)
var geojson = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [2.11403, 48.89041]
    },
    properties: {
      title: 'Suez Le Pecq',
      description: 'Job place',
      'marker-color': '#004353',
      'marker-size': 'large',
      'marker-symbol': 'water'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [2.1219, 48.89823]
    },
    properties: {
      title: 'RER Le Vesinet/Pecq',
      'marker-color': '#004353',
      'marker-size': 'large',
      'marker-symbol': 'rail'
    }
  }
]

L.mapbox.featureLayer(geojson).addTo(map)

// Let's fake a DM (Dynamic marker)
var DM = L.marker([mapCenter.lat, mapCenter.long], {
  icon: L.mapbox.marker.icon({
    'marker-color': '#f86767',
    'marker-symbol': 'bus'
  }),
  title: 'bus'
})

//  I wanna it to circle around the map center inside a radius of..500m. As 1°=60NM=60*1.852km=111.12km. So 500m is 0.5/111.12

var animateDM = () => {
  DM.setLatLng(
    L.latLng(
      mapCenter.lat + radius * Math.sin(t),
      mapCenter.long + radius * Math.cos(t)
    )
  )
  // console.log(DM.getLatLng().lat + ' ' + DM.getLatLng().lng)
  t += 0.02
}

const radius = (0.1 / 60) * 1.852
var t = 0
var timer
var fakeDM = firebase.database().ref('config/fakeDM')
fakeDM.on('value', (snapshot) => {
  console.log(`${snapshot} - ${snapshot.val()}`)
  if (snapshot.val() === true) {
    timer = window.setInterval(animateDM, 200)
  } else {
    clearInterval(timer)
  }
})

// Add DM to the map
DM.addTo(map)

window.setInterval(() => { // var database = firebase.database()
  writePosition(DM.getLatLng().lat, DM.getLatLng().lng)
}, 2000)

function writePosition (lat, long) {
  firebase.database().ref('dm1').set({
    lat: lat,
    long: long,
    date: new Date().toJSON()
  })
}

function LogPosition (position, context = '') {
  console.log(
    `${context} Lat: ${position.coords.latitude} - Long: ${position.coords.longitude} - Acc: ${position.coords.accuracy} m`
  )
}

// Add my device position (Visitor marker) 48.89577217237123, lng: 2.1166188052964343}
var VM
function setVMCurrentPosition (position) {
  LogPosition(position)
  VM = L.marker([position.coords.latitude, position.coords.longitude], {
    icon: L.mapbox.marker.icon({
      'marker-color': '#ff0000',
      'marker-symbol': 'water'
    }),
    title: 'ME'
  })

  VM.addTo(map)
}

var updateVMPosition = position => {
  if (VM !== undefined) {
    VM.setLatLng(L.latLng(position.coords.latitude, position.coords.longitude))
    myPositionAccuracy.style.width = `${1000 / position.coords.accuracy}px`
  }
}
// window.setInterval(animateVM, 2000)

// Add VM to the map
// VM.addTo(map)

function getLocation () {
  // Check whether browser supports Geolocation API or not
  if ('geolocation' in navigator) {
    //  geolocation code
    navigator.geolocation.getCurrentPosition(
      setVMCurrentPosition,
      positionError,
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 0
      }
    )
  } else {
    // geolocation not supported
    window.alert('Geolocation not supported')
  }
}

getLocation()

function positionError (error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.error('User denied the request for Geolocation.')
      break
    case error.POSITION_UNAVAILABLE:
      console.error('Location information is unavailable.')
      break
    case error.TIMEOUT:
      console.error('The request to get user location timed out.')
      break
    case error.UNKNOWN_ERROR:
      console.error('An unknown error occurred.')
      break
  }
}

var geoWatch

function startWatchVM () {
  // simulate with devtools (F12) -> Top Right [...] -> More Tools -> Sensors -> Geolocation -> Overrides -> Others -> Lat/Long
  if (!geoWatch) {
    if (
      'geolocation' in navigator &&
      'watchPosition' in navigator.geolocation
    ) {
      geoWatch = navigator.geolocation.watchPosition(
        updateVMPosition,
        positionError,
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 0 }
      )
    }
  }
}

// function stopWatch () {
//   navigator.geolocation.clearWatch(geoWatch)
//   geoWatch = undefined
// }

startWatchVM()
