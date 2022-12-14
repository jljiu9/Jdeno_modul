navigator.serviceWorker.controller.postMessage(window.location.pathname.replace('/', ''));
navigator.serviceWorker.addEventListener('message', function (e) {
    console.log(e.data);
})
alert('hi')