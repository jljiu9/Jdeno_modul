// deno-lint-ignore-file
// console.log(navigator);
// console.log(location);
// const PRECACHE_URLS = [
//     'test.js'


//   ];
self.addEventListener('install', function (event) {
    // event.waitUntil(
    //     caches.open(PRECACHE)
    //       .then(cache => cache.addAll(PRECACHE_URLS))
    //       .then(self.skipWaiting())
    //   );
    // event.waitUntil(
    //     caches.open('v1').then(function(cache) {
    //       return cache.addAll([
    //         'test.js'
    //       ]);
    //     })
    //   );
    // const installPromise = new Promise(function(resolve, reject) {
    //     // do install stuff, like caching resources, etc.
    //     self.addEventListener('message', e => {
    //         console.log(e);
    //         console.log('jiljiu');
    //         domain = e.data
    //         // 向特定窗口返回消息
    //         e.source.postMessage('response from service worker')
    //         resolve();
    //     });
    //     // self.addEventListener('message', function(e) {
    //     //     // 1. do something with the received data
    //     //     // 2. remove this event listener
    //     //     resolve();
    //     // });
    // });

    // event.waitUntil(installPromise);
    console.log('activate');
});


// let domain = ''
// sw.js
self.addEventListener('message', e => {
    console.log(e.source);
    console.log('jiljiu');
    domain = e.data
    // 向特定窗口返回消息
    e.source.postMessage('response from service worker')
});

/* 注册fetch事件，拦截全站的请求 */
// fetch('/test.js')
self.addEventListener('fetch', async function (event) {
    // console.log(window.location.pathname)
    // console.log(domain)
    // let url = new URL(domain)
    console.log(event.request)
    // for (var pair of event.request.headers.entries()) {
    //     console.log(pair[0]+ ': '+ pair[1]);
    //  }
    console.log((self.location))

    let { pathname } = new URL(event.request.referrer)
    if (event.request.url.startsWith('http://localhost:8000')) {
        if (event.request.destination == 'document') {
            if (event.request.referrer) {
                let vv = event.request.url
                console.log(pathname.replace('/', ''))
                let { origin } = new URL(pathname.replace('/', ''))
                console.log(vv.replace('http://localhost:8000/', 'http://localhost:8000/' + origin + '/'))

                self.clients.claim().then(() => {
                    return self.clients.matchAll({ type: 'window' });
                }).then(clients => {
                    return clients.map(client => {
                        if ('navigate' in client) {
                            return client.navigate(vv.replace('http://localhost:8000/', 'http://localhost:8000/' + origin + '/'));
                        }
                    });
                })
                // event.respondWith(
                //     fetch(vv.replace('http://localhost:8000/', 'http://localhost:8000/' + origin + '/'), {
                //         url: vv.replace('http://localhost:8000/', 'http://localhost:8000/' + origin + '/'),
                //         mode:"navigate"
                //     })
                // );
                return
            } else {
                event.respondWith(
                    // magic goes here
                    fetch(event.request)
                    /* 在缓存中匹配对应请求资源直接返回 */
                    //   caches.match(event.request)
                );
            }

        } else {
            console.log(pathname)
            let vv = event.request.url
            console.log(pathname.replace('/', ''))
            let { origin } = new URL(pathname.replace('/', ''))
            console.log(vv.replace('http://localhost:8000/', 'http://localhost:8000/' + origin + '/'))
            // event.respondWith(
            //     // magic goes here
            //     fetch(vv.replace('http://localhost:8000/', 'http://localhost:8000/' + origin + '/'), event.request)
            //     /* 在缓存中匹配对应请求资源直接返回 */
            //     //   caches.match(event.request)
            // );
            if (event.request.method == 'GET') {
                event.respondWith(
                    fetch(vv.replace('http://localhost:8000/', 'http://localhost:8000/' + origin + '/'), event.request)
                );
            } else {
                event.respondWith(
                    fetch(vv.replace('http://localhost:8000/', 'http://localhost:8000/' + origin + '/'), {
                        method: event.request.method,
                        headers: event.request.headers,
                        body: await event.request.arrayBuffer()
                    })
                );
            }
        }


        // if (pathname.replace('/', '').startsWith('http')) {

        // } else {
        //     event.respondWith(
        //         // magic goes here
        //         fetch(event.request)
        //         /* 在缓存中匹配对应请求资源直接返回 */
        //         //   caches.match(event.request)
        //     );
        // }



    } else {
        let req = JSON.parse(JSON.stringify(event.request))
        req.url = 'http://localhost:8000' + event.request.url
        // event.request.url = 'http://localhost:8000'+event.request.url
        console.log(event.request)
        console.log('http://localhost:8000/' + event.request.url)
        // console.log(event.request)
        if (event.request.method == 'GET') {
            event.respondWith(
                fetch('http://localhost:8000/' + event.request.url, {
                    method: event.request.method,
                    headers: event.request.headers,
                })
            );
        } else {
            //  let headers = new Headers()
            // for (var pair of event.request.headers.entries()) {
            //     headers.set(pair[0],pair[1])
            // }
            // headers.append('x-xsrf-token', 'udomain=' + origin + ';path=/')
            event.respondWith(
                fetch('http://localhost:8000/' + event.request.url, {
                    method: event.request.method,
                    headers: event.request.headers,
                    body: await event.request.arrayBuffer()
                })
            );
        }

    }
});