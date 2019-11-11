/* eslint-env serviceworker */
var workbox // avoid standardJs saying 'workbox' is not defined
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

if (workbox) {
  console.log('Yay! Workbox is loaded 🎉')
  workbox.precaching.precacheAndRoute([])  // workbox will inject assets to cache here
} else {
  console.log('Boo! Workbox did not load 😬')
}

/* La méthode importScripts() de l'interface WorkerGlobalScope importe un ou plusieurs scripts dans l'environnement du worker.
I have added  eslint-env serviceworker to fix StandardJS issues with importscripts
see https://standardjs.com/#what-about-web-workers-and-service-workers
*/
