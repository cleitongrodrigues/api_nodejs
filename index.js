// vem do proprio projeto
const express = require('express')

const app = express();

// const porta = process.env.PORT || 3333;
const porta = 3333;

app.listen(porta, () => {
    console.log("Servidor iniciado na porta " + porta);
    // console.log(`Servidor iniciado na porta ${porta}`);
});
// request vem do front e response vem do back
app.get("/", (request, response) => {
    response.send("Olá mundo!");
});