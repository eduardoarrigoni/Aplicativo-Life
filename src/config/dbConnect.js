import "dotenv/config";
import { Pool } from 'pg';
async function connectDataBase() {
    if (global.connection)
        return global.connection.connect();
    
    
    const pool = new Pool({
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: process.env.PORT_DATABASE,
        database: process.env.DATABASE,
        ssl: {
        rejectUnauthorized: true,
        ca: process.env.CERTIFICADO 
        }
    });

    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

connectDataBase();
export default connectDataBase;