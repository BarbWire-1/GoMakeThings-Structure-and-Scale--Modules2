/**
 * this seems to work now, but when loading a file other than in the root folder it throws from the loaded html:
 * 
 * Uncaught (in promise) TypeError: Failed to register a ServiceWorker for scope ('http://localhost:8080/pages/') with script ('http://localhost:8080/pages/sw.js'): A bad HTTP response code (404) was received when fetching the script.
 * 
 * also it seemes to be quicker offline this way
 */



// Core assets
let coreAssets = [
    'index.js',
    'index.html',
    'style.css',
    'treasure.js',
    'dice.js',
    
    'pages/offline.html',
    'pages/treasure.html',
    'pages/dice.html',
    
    'assets/offline.jpeg',
    'assets/favicon.ico',
    
];


// On install, activate immediately
self.addEventListener('install', function (event) {

    // Activate immediately
    self.skipWaiting();

    // Cache core assets
    event.waitUntil(caches.open('app').then(function (cache) {
        for (let asset of coreAssets) {
            cache.add(new Request(asset));
        }
        return cache;
    }));

});

// Listen for the activate event
self.addEventListener('activate', function (event) {
    // Do stuff...
});

// Listen for request events
self.addEventListener('fetch', function (event) {

    // Get the request
    let request = event.request;

    // Bug fix
    // https://stackoverflow.com/a/49719964
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

    // HTML files
    // Network-first (If requested html is found serve this else the cached offline.html)
    if (request.headers.get('Accept').includes('text/html')) {
        event.respondWith(
            fetch(request).then(function (response) {
                return response;
            }).catch(function (error) {
                return caches.match(request).then(function (response) {
                    return response || caches.match('offline.html') /*&& catches.match('offline.jpeg')*/;
                });
            })
        );
        return;
    };
    
    // CSS , JavaScript, images
    // Offline-first (If allready cached take the cached versione, else fetch)
    if (request.headers.get('Accept').includes('text/css') || request.headers.get('Accept').includes('text/javascript') /*|| request.headers.get('Accept').includes('image') */){
        event.respondWith(
            caches.match(request).then(function (response) {
                return response || fetch(request).then(function (response) {

                    // Return the response
                    return response;

                });
            })
        );
    }
    
    
  
    //TESTING THIS AS ABOVE DOES NOT INPUT THE JPEG IN OFFLINE:HTML
    // Image files
    // Offline-first
    if (request.headers.get('Accept').includes('image')) {
        event.respondWith(
            caches.match(request).then(function (response) {
                return response || fetch(request).then(function (response) {

                    // If the request is for an image, save a copy of it in cache
                    if (request.headers.get('Accept').includes('image')) {
                        let copy = response.clone();
                        event.waitUntil(caches.open('app').then(function (cache) {
                            return cache.put(request, copy);
                        }));
                    }

                    // Return the response
                    return response;

                });
            })
        );
    }

}); 