// deno-lint-ignore-file
import { serve } from "https://deno.land/std@0.155.0/http/server.ts";
import url from "https://deno.land/std@0.165.0/node/url.ts";
import { mime } from "https://deno.land/x/mimetypes@v1.0.0/mod.ts";
import { cl } from "../cl.ts";


// https://j-videos.netlify.app/
async function handler(req: Request) {

    let readFile = async (path: string) => {
        cl(mime.getType(path))
        const file = await Deno.readFile(path)
        return new Response(file, {
            status: 200,
            headers: {
                "content-type": mime.getType(path) as string
            },
        })
    }
    cl(req.url)
    let { pathname } = new URL(req.url)
    cl(pathname)
    if (pathname == '/') {
        return readFile('anotherWeb/index.html')
    }
    if (pathname == '/sw.js') {
        return readFile('anotherWeb/sw.js')
    }
    if (pathname.includes('jljiu-logo')) {
        return readFile('anotherWeb/jljiu-logo.png')
    }
    if (pathname.includes('/test')) {
        return readFile('anotherWeb/test.js')
    }

    // let res = await fetch(pathname.replace('/', ''))
    let ifHtml = (res: any) => {
        if (res.headers.get('content-type').includes('text/html')) {
            return true
        } else {
            return false
        }
    }
    let user: any = req.headers.get('Cookie')?.split('; ')
    let user_cookie
    try {
        user_cookie = user.find((x: string) => x.split('=')[0] == 'udomain')?.split('=')[1]
    } catch (error) {

    }

    cl(user_cookie)
    if (!pathname.replace('/', '').startsWith('http') && user_cookie) {

        let res = await fetch(user_cookie + pathname, req)
        return new Response(res.body, {
            status: res.status,
            headers: res.headers
        });
    } else {
        cl('out')
        let headers:any = {}
        try {
            let xsrt = user.find((x: string) => x.split('=')[0] == 'XSRF-TOKEN')?.split('=')[1]
            cl(xsrt)
            headers['x-xsrf-token'] = xsrt
        } catch (error) {}
        for (var pair of req.headers.entries()) {
            headers[pair[0]] = pair[1]
            // if (pair[0] == 'Cookie' || pair[0] == 'cookie') {
            //     let xxx = user.map((x: string) => headers['cookie'] = req.headers.get('Cookie'))
            // } else {
                
            // }
        }
        let res = await fetch(pathname.replace('/', ''), {
            method: req.method,
            headers: headers,
            body: req.body
        })
        if (ifHtml(res)) {
            let { origin } = new URL(pathname.replace('/', ''))
            let headers = new Headers()
            for (var pair of res.headers.entries()) {
                // console.log(pair[0]+ ': '+ pair[1]);
                if (pair[0] == 'Set-Cookie' || pair[0] == 'set-cookie') {
                    let cc = pair[1].split(';')[0]
                    headers.append(pair[0], cc)
                } else {
                    headers.set(pair[0], pair[1])
                }
            }
            headers.append('Set-Cookie', 'udomain=' + origin + ';path=/')
            cl('是文档！')
            return new Response(res.body, {
                status: res.status,
                headers: headers
            });
        } else {
            cl(await res.json())
            return new Response(res.body, {
                status: res.status,
                headers: res.headers
            });
        }
    }
    return new Response('');
}
serve(handler);