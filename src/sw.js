/*A Service Worker has three steps involved in its lifecycle:
Registration
Installation
Activation
*/
self.addEventListener("install", function(event) {
  // Put offline.html page into cache
  var offlineRequest = new Request("index.html");
  event.waitUntil(
    fetch(offlineRequest).then(function(response) {
      return caches.open("offline").then(function(cache) {
        console.log("[oninstall] Cached offline page", response.url);
        return cache.put(offlineRequest, response);
      });
    })
  );
});

self.addEventListener("fetch", function(event) {
  // Only fall back for HTML documents.
  var request = event.request;
  request.headers.get("accept").includes("text/html");

  if (request.method === "GET") {
    // fetch() will use the cache when possible, to this examples depends on cache-busting URL parameter to avoid the cache.

    event.respondWith(
      fetch(request).catch(function(error) {
        // fetch() throws an exception when the server is unreachable but not for valid HTTP responses, even 4xx or 5xx range.

        console.error(
          "[onfetch] Failed. Serving cached offline fallback " + error
        );
        return caches.open("offline").then(function(cache) {
          return cache.match("index.html");
        });
      })
    );
  }

  // Any other handlers come here. Without calls to event.respondWith() the request will be handled without the ServiceWorker.
});

/*

var CACHE_NAME = "my-site-cache-v1";
const staticAssetsToCache = ["./", "./style.css", "./index.js", "index.html"];

self.addEventListener("install", async event => {
  // Perform install steps
  // Open a cache.
  // Cache our files.
  // Confirm whether all the required assets are cached or not.

  const cache = await caches.open("my-site-cache-v1");
  console.log("Opened cache");
  cache.addAll(staticAssetsToCache);
});

// return cached requests
self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);

  if (url.origin === location.url) {
    event.respondWith(cacheFirst(req));
  } else {
    event.respondWith(newtorkFirst(req));
  }
});

async function cacheFirst(req) {
  const cachedResponse = caches.match(req);
  return cachedResponse || fetch(req);
}

async function newtorkFirst(req) {
  const cache = await caches.open("dynamic-cache");

  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch (error) {
    return await cache.match(req);
  }
}

self.addEventListener("activate", function(event) {
  var cacheWhitelist = ["pages-cache-v1", "blog-posts-cache-v1"];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
*/
