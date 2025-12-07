app.post('/login', async (req, res) => {
  const token = req.body.token;
  res.send("TOKEN RECIBIDO: " + token.substring(0,30) + "..."); // esto te muestra el token en la pantalla
});
