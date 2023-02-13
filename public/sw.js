const version = "v1";

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
                "/_next/static/chunks/webpack.js",
                "/_next/static/css/_app-client_app_globals_css.css",
                "/_next/static/chunks/main-app.js",
                "_next/static/chunks/app-client-internals.js",
                "_next/static/chunks/app/projects/page.js",
                "_next/static/chunks/app/layout.js",
                "_next/static/chunks/app/loading.js",
                "_next/static/chunks/app/page.js",
                "/images/favicons/favicon.ico ",
            ]);
        })
    );
});


// todo: Listen for connection event
self.addEventListener("hallo", (event) => {
    // todo: start fetching latest data
    postMessage('test hallo',)
})


// todo: Check if fetch call was made
self.addEventListener("fetch", function (event) {
    // todo: Return projects from index db
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request)
                    .then(function (res) {


                        return caches.open(version).then(function (cache) {

                            const isUrl = (res.request.url.match("^(http|https)://"))

                            switch (isUrl) {
                                case true:
                                    cache.put(res.request.url, res.clone());
                                    break

                                case false:
                                    break
                            }

                            return res;
                        });
                    })

            }
        })
    );
});