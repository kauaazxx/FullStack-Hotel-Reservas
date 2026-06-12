require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const adapter = new PrismaMariaDb({
    host: "localhost",
    user: "root",
    password: "",
    database: "hotel_db",
    port: 3306
});

const prisma = new PrismaClient({
    adapter
});

exports.listarPorQuarto = async (req, res) => {
    try {
        const { quartoId } = req.params;

        const reservas = await prisma.reserva.findMany({
            where: {
                quarto_id: Number(quartoId)
            }
        });

        res.json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: "Erro ao listar reservas"
        });
    }
};

exports.cadastrar = async (req, res) => {
    try {
        const {
            hospede,
            data_entrada,
            data_saida,
            quarto_id
        } = req.body;

        const reserva = await prisma.reserva.create({
            data: {
                hospede,
                data_entrada: new Date(data_entrada),
                data_saida: new Date(data_saida),
                quarto_id
            }
        });

        res.status(201).json(reserva);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: "Erro ao cadastrar reserva"
        });
    }
};

exports.excluir = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.reserva.delete({
            where: {
                id: Number(id)
            }
        });

        res.json({
            mensagem: "Reserva excluída com sucesso"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: "Erro ao excluir reserva"
        });
    }
};