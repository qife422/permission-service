const fetch = require('node-fetch');

const base = 'http://localhost:3000';

(async () => {
  console.log('1) GET /permission before setting:');
  await fetch(`${base}/permission`)
    .then(r => console.log(`→ ${r.status} ${r.statusText}`))
    .catch(console.error);

  console.log('\n2) POST /permission { allow_once }:');
  await fetch(`${base}/permission`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ choice: 'allow_once' })
  })
    .then(r => r.json())
    .then(j => console.log(`→ ${JSON.stringify(j)}`))
    .catch(console.error);

  console.log('\n3) GET /permission after setting:');
  await fetch(`${base}/permission`)
    .then(r => r.json())
    .then(j => console.log(`→ ${JSON.stringify(j)}`))
    .catch(console.error);
})();
