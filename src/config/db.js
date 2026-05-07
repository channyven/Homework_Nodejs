import mysql from 'mysql2/promise';

const db = mysql.createPool({   //✅ Connection Pool is a កន្លែងរក្សា database connections,improve performance
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'channy-nodejs',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ Connected to MySQL database!');
    connection.release();
  } catch (err) {
    console.log('❌ Error connecting to MySQL:', err.message);
  }
};

testConnection();

export default db;