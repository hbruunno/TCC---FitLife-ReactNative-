const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const bd = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "bdalunos",
})

app.post("/item", (req, res) =>{
  const {nome, nascimento, cpf, email, sexo, entrada, nota, telefone} = req.body;
  let SQL = "INSERT INTO listaalunos (nome, nascimento, cpf, email, sexo, entrada, nota, telefone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  bd.query(SQL, [nome, nascimento, cpf, email, sexo, entrada, nota, telefone], (err, result) =>{
    console.log(err);
  })
})

app.get("/itens", (req, res) => {
  let SQL = "SELECT * from listaalunos";

  bd.query(SQL, (err, result) =>{
    if(err) console.log(err);
    else res.send(result);
  })
})

app.delete("/item/:id", (req, res) => {
  const { id } = req.params;
  console.log("Informação:", id);

  let SQL = "DELETE FROM listaalunos WHERE id = ?";

  bd.query(SQL, id, (err, result) => { 
    console.log(err)
  });
});


app.put("/item/:id", (req, res) => {
  const { id } = req.params;
  const { nome, nascimento, cpf, email, sexo, entrada, nota, telefone, pagamento } = req.body;
  let SQL = "UPDATE listaalunos SET nome = ?, nascimento = ?, cpf = ?, email = ?, sexo = ?, entrada = ?, nota = ?, telefone = ?, pagamento = ? WHERE id = ?";
  bd.query(SQL, [nome, nascimento, cpf, email, sexo, entrada, nota, telefone, pagamento, parseInt(id)], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

//limpar pagamentos
app.put('/limparPagamentos', (req, res) => {
  const SQL = 'UPDATE listaalunos SET pagamento = false';

  bd.query(SQL, (error, results) => {
    if (error) {
      console.error('Erro ao limpar pagamentos:', error);
      res.status(500).send(error);
    } else {
      res.status(200).send('Pagamentos limpos');
    }
  });
});



app.listen(3001, () => {
  console.log("rodadndo servidor");
});