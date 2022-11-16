// deno-lint-ignore-file
import { initializeApp } from "https://esm.sh/firebase/app"
import { getDatabase } from 'https://esm.sh/firebase/database'

const db = (dbURL: URL | string) => getDatabase(
    initializeApp({
        databaseURL: dbURL
    })
)

export { db }