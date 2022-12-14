// deno-lint-ignore-file
// // deno-lint-ignore-file

// // 锁定版本
// // import { initializeApp } from "https://esm.sh/firebase/app"
// import { initializeApp } from "https://esm.sh/v98/@firebase/app@0.8.4/es2022/app.js"
// import { Database, getDatabase } from "https://esm.sh/firebase@9.14.0/database"

// const DB = (dbURL:string|URL|null) => {
//     let url = Deno.env.get('dbURL') 
//     url ? dbURL = url :  1
//     return getDatabase(
//         initializeApp({
//             databaseURL: dbURL
//         })
//     )
// }

// export { DB }

fetch("https://cangku.moe/api/v1/auth/login", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    // "accept-language": "zh-CN,zh;q=0.9",
    "content-type": "application/json",
    // "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
    // "sec-ch-ua-mobile": "?0",
    // "sec-ch-ua-platform": "\"Windows\"",
    // "sec-fetch-dest": "empty",
    // "sec-fetch-mode": "cors",
    // "sec-fetch-site": "same-origin",
    "x-xsrf-token": "eyJpdiI6IlNxcHNydFBJXC80SVc2QmR6bklBWUZnPT0iLCJ2YWx1ZSI6Im9Bd2s4b0I5MHdXWTh1TllKNm1DVDQ2a3Z3Y3lpZmRJelZ4cDFGd2dTSWxrc0pmUVM0ZisrSGJEMGJSTW8zSzMiLCJtYWMiOiI2MDljNTczMGY0YzI0MWQ0OWJmNmVkNDg5N2Y1OTk1MDFlMGQ4M2YyY2Q3Njk0ZDAwYjcwNzkzNzRlYzcwYmEyIn0%3D",
    "cookie": "domain=https://www.google.com; udomain=https://www.google.com; XSRF-TOKEN=eyJpdiI6IlNxcHNydFBJXC80SVc2QmR6bklBWUZnPT0iLCJ2YWx1ZSI6Im9Bd2s4b0I5MHdXWTh1TllKNm1DVDQ2a3Z3Y3lpZmRJelZ4cDFGd2dTSWxrc0pmUVM0ZisrSGJEMGJSTW8zSzMiLCJtYWMiOiI2MDljNTczMGY0YzI0MWQ0OWJmNmVkNDg5N2Y1OTk1MDFlMGQ4M2YyY2Q3Njk0ZDAwYjcwNzkzNzRlYzcwYmEyIn0%3D; cangku_laravel_session=eyJpdiI6IlVXN3cwYVVpYjBHd1htZnR1RTRlbmc9PSIsInZhbHVlIjoiT1NHMmdrcmNZQ3liTllzV0tLQ1VQMTVuWlFOdytGcWpmS3BETWhkQm0xaUJLUWQ3dG9PTHhaMnJ4cUZ5eGtNbyIsIm1hYyI6ImEwMDM1ZWEzYzhkMDMzODYyYzFmZmYzZmEyODgyNTIzNjhhMzczOTUwZjI5YTEzZGZkZDdmNDE2OTZjODEwMDEifQ%3D%3D; _ga=GA1.1.1437095097.1644401221; xx=vv; uemail=dzyrermq@vip.qq.com; txx=kk; _gid=GA1.1.1267520234.1669432473; _ga_PQTTGRGE2D=GS1.1.1669432472.1.1.1669434919.0.0.0; uname=jljiu; udomain=https://cangku.moe; XSRF-TOKEN=eyJpdiI6ImRXak1MMHlSMUgxRmtGSDlZb2tkUkE9PSIsInZhbHVlIjoic0hUanhoSHRXV25tVjRxZnl3c1UzcW9TQ3BvZVVPTEYwV2xpa0dOYmNCRnhDbm9uS1VWRDMwTGZUU3ZQWEQ1RiIsIm1hYyI6IjgzNDdjMmIzNjY3ZTJlNDBlNmI1ZGVjNzE2NjM4YzQxNjA4NmRiYzMxOTBmYjA3ZmJjYzM3NmMwYTI1OWRhZTMifQ%3D%3D; cangku_laravel_session=eyJpdiI6IkhwYk5sYmY1MlhqeFp3VjZvS1ordEE9PSIsInZhbHVlIjoiZ2k5ZUhsNlVvdkM2dHQyUmx5RDl6UHRQNzd6S25NTXhSVHZtWXF3djdWZ1Arem1jTDlqUFRhSG1XUVlhQWdaMiIsIm1hYyI6IjRmZWFmMGRlOTE3YjI2YTM4NjdlZWQ2NzFiN2NiMmU5NDQ2OGY0MTQ3ZTIyY2M5ODBiZjk1YzhhMjJjZWM4NzAifQ%3D%3D",
    // "Referer": "https://cangku.moe/login",
    // "Referrer-Policy": "strict-origin-when-cross-origin"
  },
//   "body": "{\"login\":\"fdf\",\"password\":\"fdf\",\"remember\":true,\"include\":\"roles,meta:include(location|website|birthday|post_display|date_display|new_tab)\"}",
  "method": "POST"
}).then( async x=>console.log(await x.json()))