import { app } from "./app";

const { networkInterfaces } = require('os');

export function getLocalIPV4(): string {
  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object
  let ip = "";

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        ip = net.address;
      }
    }
  }

  return ip;
}

app.listen(3333, () =>
  console.log(`🚀 Server (Postgres) ready at: http://${getLocalIPV4()}:3333`)
)
