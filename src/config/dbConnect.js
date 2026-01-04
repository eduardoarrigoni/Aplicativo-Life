import { Pool } from 'pg';
import "dotenv/config";
async function connectDataBase() {
    if (global.connection)
        return global.connection.connect();
    
    
    const pool = new Pool({
        user: USER,
        password: PASSWORD,
        host: HOST,
        port: PORT_DATABASE,
        database: DATABASE,
        ssl: {
        rejectUnauthorized: true,
        ca: CERTIFICADO 
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