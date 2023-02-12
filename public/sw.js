const version = "v1";

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

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
