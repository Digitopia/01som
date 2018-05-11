/* eslint no-restricted-globals: "off" */

let cacheName = 'v1'

let cacheFiles = [
    '/_sass/circle.css',
    '/_lib/SnapPlugins.js',
    '/_lib/Colors.js',
    '/_lib/Utils.js',
    '/_lib/Point.js',
    '/_lib/Circle.js',
    '/_lib/BaseApp.js',
    '/_lib/CircleApp.js',
    '/_js/circle.js'
]

self.addEventListener('install', function(e) {

    // console.log('[ServiceWorker] Installed')

    // e.waitUntil Delays the event until the Promise is resolved
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            // console.log('[ServiceWorker] Caching cacheFiles')
            return cache.addAll(cacheFiles)
        })
    )
})

self.addEventListener('activate', function(e) {

    // console.log('[ServiceWorker] Activated')

    e.waitUntil(

        // Get all the cache keys (cacheName)
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {
                // If a cached item is saved under a previous cacheName
                if (thisCacheName !== cacheName) {
                    // Delete that cached file
                    console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName)
                    return caches.delete(thisCacheName)
                }
            }))
        })
    ) // end e.waitUntil
})

self.addEventListener('fetch', function(e) {
    // console.log('[ServiceWorker] Fetch', e.request.url)

    // e.respondWidth Responds to the fetch event
    e.respondWith(

        // Check in cache for the request being made
        caches.match(e.request)


            .then(function(response) {

                // If the request is in the cache
                if ( response ) {
                    // console.log("[ServiceWorker] Found in Cache", e.request.url, response)
                    // Return the cached version
                    return response
                }

                // If the request is NOT in the cache, fetch and cache

                var requestClone = e.request.clone()
                fetch(requestClone)
                    .then(function(response) {

                        if ( !response ) {
                            // console.log("[ServiceWorker] No response from fetch ")
                            return response
                        }

                        var responseClone = response.clone()
                        // console.log(responseClon)

                        //  Open the cache
                        caches.open(cacheName).then(function(cache) {

                            // Put the fetched response in the cache
                            // console.log(e.request)
                            cache.put(e.request, responseClone)
                            // console.log('[ServiceWorker] New Data Cached', e.request.url)

                            // Return the response
                            return response

                        }) // end caches.open

                    })
                    .catch(function(err) {
                        // console.log('[ServiceWorker] Error Fetching & Caching New Data', err)
                    })


            }) // end caches.match(e.request)
    ) // end e.respondWith
})
