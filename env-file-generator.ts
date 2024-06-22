const fs = require('fs')

const production = process.env["PRODUCTION"] || 'false';
const firebaseDbUrl = process.env["FIREBASE_DB_URL"] || '';

const envContent = `
export const environment = {
  production: ${production.toLowerCase() === 'true'},
  firebaseDbUrl: '${firebaseDbUrl}'
};
`;

fs.writeFileSync('./src/environments/environment.ts', envContent.trim());
fs.writeFileSync('./src/environments/environment.prod.ts', envContent.trim());
