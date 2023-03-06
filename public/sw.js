const version = "v2";

/**
 * Deletes cache
 * @param key
 * @returns {Promise<void>}
 */
const deleteCache = async (key) => {
    await caches.delete(key);
};

/**
 * Deletes all old cache files
 * @returns {Promise<void>}
 */
const deleteOldCaches = async () => {
    const cacheKeepList = [""];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
    await Promise.all(cachesToDelete.map(deleteCache));
};

/**
 * Cache app shell files
 * @param event
 */
const cacheAppShell = (event) => {
    event.waitUntil(
        caches.open("app-shell-" + version)
            .then((cache) => {
            return cache.addAll([
                "/",
                "/projects",
                "/manifest.webmanifest",
                "/images/logo/cmgt-minilogo.png",
                "/images/hero-image.png",
                "/images/favicons/favicon.ico ",
            ]);
        })
            .then((c) => caches.open("project-assets-" + version))
            .catch(e => console.error(e))
);
}

/**
 * Event listener on activate event
 */
self.addEventListener("activate", (event) => {
    event.waitUntil(deleteOldCaches());
});

/**
 * Event listener on install event
 */
self.addEventListener("install", (event) => {
    cacheAppShell(event)
});

/**
 * Cache project images
 * @returns {Promise<unknown>}
 */
const cacheProjectImages = (cache) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('https://cmgt.hr.nl/api/projects')
            const data = await response.json()
            const projects = data.data
            console.log(response)
            console.log("Caching all project images", projects)
            // Collect all project images
            const images = projects?.map(({project, links}) => {
                let images = []
                images.push(project.header_image)
                project?.screenshots?.map(screenshot => images.push(screenshot))
                return images
            })
            console.log(images)
            await cache.addAll(images)
        } catch (e) {
            reject(e)
        }
    })
}
/**
 * First network then cache
 * @param event
 * @param request
 * @returns {Promise<T | void>}
 */
const handleAPIRequest = (event, request) => {
    console.log("fetch made for api")
    // Do fetch call
    return event.respondWith(
        fetch(event.request)
            .then(res => {
                return res
            })
            .catch(error =>
                // Open the indexedDB database
                request.onsuccess = function (event) {
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
                    getAllRequest.onsuccess = function (event) {
                        // Return the data from the indexedDB database
                        const data = event.target.result;
                        return new Response(JSON.stringify(data), {
                            headers: {
                                "Content-Type": "application/json",
                                "X-ORIGIN": "sw.js",
                            }
                        });
                    };
                }
            )
    )

}

const handleGenericRequest = (event) => {
    return fetch(event.request).then(function (res) {
        if (res.status === 200) {
            if (!event.request.url.includes('http')) return
            caches.open("app-shell-" + version).then(function (cache) {
                cache.put(event.request, res.clone());
            });
        }
        return res;
    })
        .catch(e => {
            event.respondWith(
                caches.match(event.request).then(function (response) {
                    // Return the cached response if it exists
                    if (response) return response
                    return new Response(e)
                })
            );
        });
}

const handleProjectImageRequest = (event) => {
    console.log("handleProjectImageRequest", event.request)
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) return response
            return fetch(event.request)
                .then(function (res) {
                    return caches.open("project-assets-" + version).then(function (cache) {
                        const isUrl = (event.request.url?.match("^(http|https)://"))
                        if (isUrl) cache.put(event.request.url, res.clone());
                        return res;
                    });
                })


        })
    );
}
/**
 * Listen for the "fetch" event to intercept network requests
 */
self.addEventListener("fetch", function (event) {
    const url = new URL(event.request.url);
    // Create a request to open the indexedDB database
    const request = indexedDB.open('cmgt', 1);
    // Check if the request is for the specified URL
    if (url.origin === "https://cmgt.hr.nl" && url.pathname === "/api/projects") {
        handleAPIRequest(event, request).then(result => console.log(result))
    } else if (url.origin === "https://cmgt.hr.nl" && url.pathname.includes("/storage/uploads/")) {
        handleProjectImageRequest(event)
    } else {
        // Fetch the request and store it in the cache
        handleGenericRequest(event).then(r => console.log(r)).catch(error => console.error(e))
    }
});
