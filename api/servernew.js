require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("./db"); // conexão PostgreSQL
const authMiddleware = require("./middleware");

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "SmartFlow API rodando "
  });
});


app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const result = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Usuário não encontrado"
      });
    }

    // valida senha (seguro)
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({
        status: false,
        message: "Senha inválida"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nome: user.nome
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      status: true,
      message: "Login realizado com sucesso",
      token
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Erro no servidor",
      error: error.message
    });
  }
});

app.get("/perfil", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, nome, email FROM usuarios WHERE id = $1",
      [req.user.id]
    );

    return res.json({
      status: true,
      user: result.rows[0]
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    });
  }
});


app.get("/clientes", authMiddleware, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM clientes ORDER BY id DESC"
  );

  res.json(result.rows);
});

app.post("/clientes", authMiddleware, async (req, res) => {
  const { nome, email, telefone, endereco } = req.body;

  const result = await pool.query(
    `INSERT INTO clientes (nome, email, telefone, endereco)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nome, email, telefone, endereco]
  );

  res.json(result.rows[0]);
});


app.get("/produtos", authMiddleware, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM produtos ORDER BY id DESC"
  );

  res.json(result.rows);
});

app.post("/produtos", authMiddleware, async (req, res) => {
  const { nome, descricao, preco, estoque, categoria } = req.body;

  const result = await pool.query(
    `INSERT INTO produtos (nome, descricao, preco, estoque, categoria)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [nome, descricao, preco, estoque, categoria]
  );

  res.json(result.rows[0]);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` SmartFlow rodando na porta ${PORT}`);
});