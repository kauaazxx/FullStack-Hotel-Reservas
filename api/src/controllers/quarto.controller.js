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

exports.listar = async (req, res) => {
    try {
        const quartos = await prisma.quarto.findMany();
        res.json(quartos);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: "Erro ao listar quartos"
        });
    }
};

exports.cadastrar = async (req, res) => {
    try {
        const { numero, tipo } = req.body;

        const quarto = await prisma.quarto.create({
            data: {
                numero,
                tipo
            }
        });

        res.status(201).json(quarto);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: "Erro ao cadastrar quarto"
        });
    }
};

exports.excluir = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.quarto.delete({
            where: {
                id: Number(id)
            }
        });

        res.json({
            mensagem: "Quarto excluído com sucesso"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            erro: "Erro ao excluir quarto"
        });
    }
};