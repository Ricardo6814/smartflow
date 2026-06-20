require("dotenv").config();

const express = require("express");
const authMiddleware = require("./middleware");
const { generateToken } = require("./functions");

const app = express();

app.use(express.json());

const users = [
  {
    id: 1,
    username: "admin",
    password: "123456",
  },
];


app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "API funcionando!"
  });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) =>
      u.username === username &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({
      status: false,
      message: "Usuário ou senha inválidos"
    });
  }

  const token = generateToken(user);

  return res.json({
    status: true,
    message: "Login realizado com sucesso",
    token
  });
});

app.get("/verify", authMiddleware, (req, res) => {
  return res.status(200).json({
    status: true,
    valid: true,
    message: "Logado",
    user: req.user
  });
});


app.get("/perfil", authMiddleware, (req, res) => {
  return res.json({
    status: true,
    message: "Acesso autorizado",
    user: req.user
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});