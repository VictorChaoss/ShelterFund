const { Client } = require('pg');

async function testConnection(url, name) {
  const client = new Client({ connectionString: url, connectionTimeoutMillis: 5000 });
  try {
    await client.connect();
    const res = await client.query('SELECT NOW()');
    console.log(`[${name}] SUCCESS:`, res.rows[0]);
    await client.end();
    return true;
  } catch (err) {
    console.log(`[${name}] ERROR:`, err.message);
    return false;
  }
}

async function main() {
  const direct = "postgresql://postgres:ITPcdukSI6SD6nE5@db.vzuancaembgyocvjtuww.supabase.co:5432/postgres";
  const pooler1 = "postgresql://postgres.vzuancaembgyocvjtuww:ITPcdukSI6SD6nE5@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
  const pooler2 = "postgresql://postgres.vzuancaembgyocvjtuww:ITPcdukSI6SD6nE5@aws-0-eu-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true";
  const pooler3 = "postgresql://postgres.vzuancaembgyocvjtuww:ITPcdukSI6SD6nE5@eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

  await testConnection(direct, "Direct 5432");
  await testConnection(pooler1, "Pooler aws-0-eu-west-1");
  await testConnection(pooler2, "Pooler aws-0-eu-west-2");
  await testConnection(pooler3, "Pooler eu-west-1");
}

main();
