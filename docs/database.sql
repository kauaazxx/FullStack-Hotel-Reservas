CREATE DATABASE IF NOT EXISTS hotel_db;
USE hotel_db;

CREATE TABLE quarto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(10) NOT NULL,
    tipo VARCHAR(100) NOT NULL
);

CREATE TABLE reserva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hospede VARCHAR(150) NOT NULL,
    data_entrada DATE NOT NULL,
    data_saida DATE NOT NULL,
    quarto_id INT NOT NULL,

    CONSTRAINT fk_quarto
    FOREIGN KEY (quarto_id)
    REFERENCES quarto(id)
    ON DELETE CASCADE
);

INSERT INTO quarto (numero, tipo)
VALUES
('101', 'Standard'),
('102', 'Luxo'),
('201', 'Suíte');

INSERT INTO reserva (
    hospede,
    data_entrada,
    data_saida,
    quarto_id
)
