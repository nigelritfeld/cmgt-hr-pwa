const version = "v2";

const deleteCache = async (key) => {
    await caches.delete(key);
};

const deleteOldCaches = async () => {
    const cacheKeepList = ["v2"];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
};

self.addEventListener("activate", (event) => {
    event.waitUntil(deleteOldCaches());
});

// todo: Install service worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(version).then((cache) => {
            return cache.addAll([
                "/",
                "/projects",
                "/manifest.webmanifest",
                "/images/logo/cmgt-minilogo.png",
                "/images/hero-image.png",
                "/images/favicons/favicon.ico ",
            ]);
        })
    );
});


// todo: Listen for connection event
// let communicationPort;

//Save reference to port
// self.addEventListener('message', (event) => {
//     if (event.data && event.data.type === 'PORT_INITIALIZATION') {
//         communicationPort = event.ports[0];
//     }
// });

//Send messages
// communicationPort.postMessage({type: 'MSG_ID'});



// todo: Check if fetch call was made

// Listen for the "fetch" event to intercept network requests
self.addEventListener("fetch", function(event) {
    const url = new URL(event.request.url);
    // Create a request to open the indexedDB database
    const request = indexedDB.open('cmgt', 1);

    // Check if the request is for the specified URL
    if (url.origin === "https://cmgt.hr.nl" && url.pathname === "/api/projects/") {
        console.log("fetch made for api")
        event.respondWith(
            // Open the indexedDB database
            request.onsuccess = function(event) {
                const db = event.target.result;
                const transaction = db.transaction("projects", "readonly");
                const objectStore = transaction.objectStore("projects");
                const getAllRequest = objectStore.getAll();
                // getAllRequest.onerror = function (event) {
                //     fetch(url).then(res => res.json()).then(data => {
                //         data.data.map(({project, links})=>{
                //             objectStore.add(project)
                //         })
                //     })
                // }
                getAllRequest.onsuccess = function(event) {
                    // Return the data from the indexedDB database
                    const data = event.target.result;
                    const response = new Response(JSON.stringify(data), {
                        headers: {
                            "Content-Type": "application/json",
                            "X-ORIGIN": "sw.js",
                        }
                    });
                    return response;
                };
            }
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                // Return the cached response if it exists
                if (response) {
                    return response;
                }

                // Fetch the request and store it in the cache
                return fetch(event.request).then(function(res) {
                    if (res.status === 200) {
                        caches.open("cache-"+version).then(function(cache) {
                            cache.put(event.request, res.clone());
                        });
                    }
                    return response;
                });
            })
        );
    }
});

// self.addEventListener("fetch", function (event) {
//     // todo: Return projects from index db
//     event.respondWith(
//         caches.match(event.request).then(function (response) {
//             if (response) {
//                 return response;
//             } else {
//                 return fetch(event.request)
//                     .then(function (res) {
//
//
//                         return caches.open(version).then(function (cache) {
//
//                             const isUrl = (res.request.url?.match("^(http|https)://"))
//
//                             if (isUrl){
//                                 if (res.request.url.match('/cmgt.hr.nl/api/projects')){
//
//                                 }
//                             cache.put(res.request.url, res.clone());
//                             }
//
//
//                             return res;
//                         });
//                     })
//
//             }
//         })
//     );
// });