import app from './api/app';
import config from "config";
import db from '../config/db'

const port = config.get<number>("port");
app.listen(port, async () => {
    await db();
    console.log(`Server is running on port: ${port}`);
})