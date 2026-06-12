const express = require("express");
const cors = require("cors");

const quartoRoutes = require("./src/routes/quarto.routes");
const reservaRoutes = require("./src/routes/reserva.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/quartos", quartoRoutes);
app.use("/reservas", reservaRoutes);

app.get("/", (req, res) => {
    res.send("API Hotel Reservas funcionando!");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});