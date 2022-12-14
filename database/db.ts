// deno-lint-ignore-file
// import { initializeApp } from "https://esm.sh/firebase/app"
// import { Database, getDatabase } from 'https://esm.sh/firebase/database'
//锁定版本
import { initializeApp } from "https://esm.sh/v98/@firebase/app@0.8.4/es2022/app.js"
import { Database, getDatabase } from "https://esm.sh/firebase@9.14.0/database"

const db = (dbURL:string|URL|null) => {
    let url = Deno.env.get('dbURL') 
    url ? dbURL = url :  1
    return getDatabase(
        initializeApp({
            databaseURL: dbURL
        })
    )
}

export { db }