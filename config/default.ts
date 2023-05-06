import * as dotenv from 'dotenv'
dotenv.config()

export default {
    port: 3000,
    dbUri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_TABLE}.${process.env.DB_HASH}.mongodb.net/?retryWrites=true&w=majority`
}