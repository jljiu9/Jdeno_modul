// deno-lint-ignore-file
import { initializeApp } from "https://esm.sh/firebase/app"
import { Database, getDatabase } from 'https://esm.sh/firebase/database'

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