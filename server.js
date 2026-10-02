import express from "express";
import pool from "./db.js"

const app = express()

app.use(express.json())
app.use(express.static('public'))

// rotas autores
app.get("/autores", async (req, res)=>{
    const resultado = await pool.query("select * from autores order by id")
    res.json(resultado.rows)
})

app.post("/autores", async (req, res)=>{
    const {nome} = req.body
    if(!nome ){                                                                 //nome == null tbm serve
        return res.json({erro: "Nome tem que ter"})
    }

    const resultado = await pool.query("insert into autores(nome) values (%1) returning *", [nome])
    res.json(resultado.rows[0])
})

// rotas livros
app.get("/livros", async (req, res)=>{
    const resultados = await pool.quey("select * from livros join autores on autores.id = livros.id order by livros.id")
    res.json(resultados.rows)
})

app.post("/livros", async (req, res)=>{
    const {titulo, autor_id} = req.body
    if(!titulo || !autor_id){
        return res.json({erro: "Titulo e autor é obrigatorio"})
    }

    const autor = await pool.query("SELECT id FROM autores WHERE id = $1", [
    autor_id,
  ])
  if (autor.rows.length === 0) {
    return res
      .status(400)
      .json({ erro: "Autor não encontrado. Crie o autor primeiro." })
  }

  const resultado = await pool.query(
    "INSERT INTO livros (titulo, autor_id) VALUES ($1, $2) RETURNING *",
    [titulo, autor_id],
  )
  res.status(201).json(resultado.rows[0])
})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000")
})