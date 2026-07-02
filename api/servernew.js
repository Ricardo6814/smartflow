require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("./database");

const auth = require("./middleware/auth");
const role = require("./middleware/role");

const app = express();

app.use(express.json());

app.get("/", (req,res)=>{

    res.json({
        status:true,
        message:"SmartFlow API funcionando."
    });

});

app.post("/login", async(req,res)=>{

    try{

        const {email,senha}=req.body;

        const result=await pool.query(
            "SELECT * FROM usuarios WHERE email=$1",
            [email]
        );

        if(result.rows.length===0){

            return res.status(401).json({
                status:false,
                message:"Usuário não encontrado."
            });

        }

        const usuario=result.rows[0];

        const senhaCorreta=await bcrypt.compare(
            senha,
            usuario.senha
        );

        if(!senhaCorreta){

            return res.status(401).json({
                status:false,
                message:"Senha incorreta."
            });

        }

        const token=jwt.sign({

            id:usuario.id,
            nome:usuario.nome,
            email:usuario.email,
            role:usuario.role

        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        });

        res.json({

            status:true,
            token

        });

    }

    catch(err){

        res.status(500).json({

            status:false,
            message:err.message

        });

    }

});

app.get("/perfil",auth,async(req,res)=>{

    const result=await pool.query(

        "SELECT id,nome,email,role FROM usuarios WHERE id=$1",

        [req.user.id]

    );

    res.json(result.rows[0]);

});

app.get("/clientes",auth,role("admin"),async(req,res)=>{

    const result=await pool.query(
        "SELECT * FROM clientes ORDER BY id DESC"
    );

    res.json(result.rows);

});

app.post("/clientes",auth,role("admin","vendedor"),async(req,res)=>{

    const {nome,email,telefone,endereco}=req.body;

    const result=await pool.query(

`INSERT INTO clientes
(nome,email,telefone,endereco)

VALUES($1,$2,$3,$4)

RETURNING *`

,[nome,email,telefone,endereco]);

    res.json(result.rows[0]);

});

app.get("/produtos",auth,async(req,res)=>{

    const result=await pool.query(
        "SELECT * FROM produtos ORDER BY id DESC"
    );

    res.json(result.rows);

});

app.post("/produtos",auth,role("admin"),async(req,res)=>{

    const {

        nome,
        descricao,
        preco,
        estoque,
        categoria

    }=req.body;

    const result=await pool.query(

`INSERT INTO produtos

(nome,descricao,preco,estoque,categoria)

VALUES($1,$2,$3,$4,$5)

RETURNING *`

,[

nome,
descricao,
preco,
estoque,
categoria

]);

    res.json(result.rows[0]);

});

app.delete("/produtos/:id",auth,role("admin"),async(req,res)=>{

    await pool.query(

        "DELETE FROM produtos WHERE id=$1",

        [req.params.id]

    );

    res.json({

        status:true,
        message:"Produto removido."

    });

});

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{

    console.log(`Servidor iniciado na porta ${PORT}`);

});