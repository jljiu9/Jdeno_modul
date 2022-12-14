// deno-lint-ignore-file
import * as ash from "https://deno.land/x/ash@1.3.6/mod.ts";
import { cl } from "../mod.ts";
import { arrayBuffer } from "https://deno.land/std@0.165.0/node/stream/consumers.mjs";
import { Writable } from "https://deno.land/std@0.165.0/node/stream.ts";
import { Buffer } from "https://deno.land/std@0.165.0/node/buffer.ts";
import { createWriteStream } from "https://deno.land/std@0.165.0/node/fs.ts";
import process from "https://deno.land/std@0.165.0/node/process.ts";
import buffer from "https://deno.land/std@0.165.0/node/internal_binding/buffer.ts";
import intoStream from 'https://esm.sh/into-stream@7.0.0';
const webUrl = (ms: number) => { }
// let notionInfo: { id: any; spaceId: any; cookie: any; }
const formatFileSize = function (bytes: number) {
    const sufixes = ['B', 'kB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sufixes[i]}`;
}
let notionInfo = {
    id: 'a6315f71-8197-41af-8854-96a33bc0b155',
    spaceId: '993c3a7f-e1f7-4342-974a-f8abf65c40d7',
    userId: 'db17c83b-afcf-46e4-a5a8-ce99f167c637',
    cookie: 'logglytrackingsession=1abcc622-b80e-425b-bd5e-77654841eb20; NEXT_LOCALE=en-US; notion_experiment_device_id=be5d61a3-d85b-47bd-adca-b9c7880abe34; g_state={"i_l":0}; notion_browser_id=7919159a-b642-4ae9-a42c-3015b53e04c5; _gcl_au=1.1.1090681837.1661566953; cb_user_id=null; cb_group_id=null; cb_anonymous_id="51ac1758-684a-44fb-8360-cab9f87bd0c0"; mutiny.user.token=3c0acb29-a63c-44b3-83f5-8dd861e49fe6; mutiny.defaultOptOut=true; mutiny.optOut=; mutiny.optIn=true; _ga=GA1.1.932389555.1664288357; _mkto_trk=id:414-XMY-838&token:_mch-www.notion.so-1664288356716-48733; notion_locale=en-US/autodetect; notion_check_cookie_consent=false; ajs_anonymous_id=7919159ab6424ae9a42c3015b53e04c5; _ga_9ZJ8CB186L=GS1.1.1668337671.3.0.1668337671.60.0.0; csrf=fa333136-14f8-4fbe-a612-3af7b159b647; token_v2=87265696917130d1118643516ec45e0054fe1142673c53a036e08f2882fc24ecf26871dcedbbe6d9473a42ec16e04cbacd68c9e1c020f200ac31bca856f9c01a95d4ecf34353636099770f22658e; notion_user_id=db17c83b-afcf-46e4-a5a8-ce99f167c637; notion_users=["db17c83b-afcf-46e4-a5a8-ce99f167c637"]; __cf_bm=yuBse8npKInNqk138C70SnokRaXs_Ew6A71WFQRrPkw-1668337752-0-ASGZLLrY+ERUKqeGQcPvzh9SJtc7iq5LbquMbe0/Wy8KnI42xEGddMDpe/M0BkO+yxMvexe/+2KyEdHKX0HUwZ0=; notion_cookie_consent={"id":"48222933-2b88-440d-a68f-2340c022bb48","permission":{"necessary":true,"targeting":true,"preference":true,"performance":true},"policy_version":"v5"}; intercom-session-gpfdrxfd=U29VOTNjOEttYTF4UzQ1c2orWTdac2JHRGE5YlVhaXBQNE43Q2JsRHQzb0JpQVd5MzMvU0tWcW9FdXlDZlhzSi0tb3BZZnFjbk14blB6TmRrRDg1VnF3Zz09--3a46e6e0a2e029537022c71cd9472893fd6cd6f2; amp_af43d4=7919159ab6424ae9a42c3015b53e04c5.ZGIxN2M4M2JhZmNmNDZlNGE1YThjZTk5ZjE2N2M2Mzc=..1ghoap6qk.1ghobeceh.c88.303.f8b',
}


webUrl.getRtnJson = async (url: RequestInfo, header?: any): Promise<any> => {
    const response = await fetch(url, {
        method: 'get',
        headers: header
    });
    let json = await response.json();
    return cl.rtn(json)
}
webUrl.getFileFromUrl = async (url: RequestInfo, range?: any): Promise<any> => {
    !range ? range = '' : 0
    cl("bytes=0-" + range)
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'Connection': "keep-alive",
            "proxy-connection": "keep-alive",
            "Range": "bytes=0-" + range,
            // "Range": "bytes=0-"
        }
    });
    cl(response.headers)
    // response.arrayBuffer().then(buffer=>console.log(buffer))
    return response
}
webUrl.getRtnRedirect = async (url: RequestInfo, header?: any): Promise<any> => {
    const res = await fetch(url, {
        method: 'get',
        headers: header
    });
    return cl.rtn(res.url)
}
webUrl.postRtnJson = async (url: RequestInfo, body: object, header?: any): Promise<any> => {
    const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: header
    });
    let json = await response.json();
    return cl.rtn(json)
}

webUrl.notionPutFileFromURL = async (url: string) => {
    let name = new URL(url)
    let res = await webUrl.getFileFromUrl(url,'')
    // cl(decodeURI(JSON.parse((res.headers.get('content-disposition') as string).split('=')[1])) || decodeURI(ash.path.basename(name.pathname)))
    // cl(res.headers.get('content-type') || ash.mime(ash.path.extname(name.pathname)))
    let info = await webUrl.postRtnJson('https://www.notion.so/api/v3/getUploadFileUrl', {
        "bucket": "secure",
        "name": decodeURI(ash.path.basename(name.pathname)) || decodeURI(JSON.parse((res.headers.get('content-disposition') as string).split('=')[1])),
        "contentType": ash.mime(ash.path.extname(name.pathname)) || res.headers.get('content-type'),
        "record": {
            "table": "block",
            "id": notionInfo.id,
            "spaceId": notionInfo.spaceId
        },
        "supportExtraHeaders": true,
        "contentLength": Number(res.headers.get('content-length'))
    }, {
        "content-type": "application/json",
        "cookie": notionInfo.cookie,
    })
    let header: any = {}
    header[`${info.putHeaders[0].name}`] = info.putHeaders[0].value
    header[`${info.putHeaders[1].name}`] = info.putHeaders[1].value
    // cl(await res.arrayBuffer())
    let put = await fetch(info.signedPutUrl, {
        headers: header,
        method: "put",
        body: await res.arrayBuffer()
    })
    cl(put.headers)
    cl(await put.text())
    return 'https://www.notion.so/signed/' + encodeURIComponent(info.url) + '?table=block&id=a6315f71-8197-41af-8854-96a33bc0b155&spaceId=993c3a7f-e1f7-4342-974a-f8abf65c40d7&download=true&userId=db17c83b-afcf-46e4-a5a8-ce99f167c637&cache=v2'
}

let url = 
// 'http://nginx.org/download/nginx-1.15.8.zip'
'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/744bf73a-b464-450d-b899-eca179c254ba/84048740_p19.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221125T022937Z&X-Amz-Expires=86400&X-Amz-Signature=aea289dfef13e7efa035af5ea5e3f3988d4d79afcb34beedf9ad76ed1913cd81&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%2284048740_p19.png%22&x-id=GetObject'
webUrl.notionPutFileFromURL(url).then(async x => {
    let xx = await webUrl.getRtnRedirect(x, {
        "cookie": notionInfo.cookie,
    })
})

export { webUrl, ash }
