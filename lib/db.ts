import mysql from 'mysql2/promise';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Configuração do pool de conexões
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'tabata',
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || 'tabata_fernandes',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Tipo genérico para resultados da query
export type QueryResult<T> = T & RowDataPacket;

export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<QueryResult<T>[]> {
  try {
    const [results] = await pool.execute<QueryResult<T>[]>(sql, params);
    return results;
  } catch (error: any) {
    console.error('Database error:', error);
    throw new Error('Database error: ' + error.message);
  }
}

// Função específica para inserções que retorna o ID inserido
export async function insertQuery(
  sql: string,
  params?: any[]
): Promise<ResultSetHeader> {
  try {
    const [result] = await pool.execute<ResultSetHeader>(sql, params);
    return result;
  } catch (error: any) {
    console.error('Database error:', error);
    throw new Error('Database error: ' + error.message);
  }
}

export default pool;
