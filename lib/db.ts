import mysql from 'mysql2/promise';

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

export async function query(sql: string, params?: any[]) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error: any) {
    console.error('Database error:', error);
    throw new Error('Database error: ' + error.message);
  }
}

export default pool;
