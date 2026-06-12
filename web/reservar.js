const api = "http://127.0.0.1:3000";

const params =
    new URLSearchParams(window.location.search);

const quartoId = params.get("id");

async function carregarReservas() {

    try {

        const quartosResponse =
            await fetch(`${api}/quartos`);

        const quartos =
            await quartosResponse.json();

        const quarto =
            quartos.find(q => q.id == quartoId);

        document.getElementById(
            "info-quarto"
        ).innerHTML = `
            <h2>
                Quarto ${quarto.numero}
            </h2>

            <p>
                Tipo: ${quarto.tipo}
            </p>
        `;

        document.getElementById(
            "btn-cadastro"
        ).href =
            `cadastrar-reserva.html?id=${quartoId}`;

        const response =
            await fetch(
                `${api}/reservas/${quartoId}`
            );

        const reservas =
            await response.json();

        const lista =
            document.getElementById(
                "lista-reservas"
            );

        lista.innerHTML = "";

        reservas.forEach(reserva => {

            lista.innerHTML += `
                <div class="card">

                    <h3>
                        ${reserva.hospede}
                    </h3>

                    <p>
                        Entrada:
                        ${reserva.data_entrada
                            .split("T")[0]}
                    </p>

                    <p>
                        Saída:
                        ${reserva.data_saida
                            .split("T")[0]}
                    </p>

                    <button
                        class="btn-excluir"
                        onclick="
                            excluirReserva(
                                ${reserva.id}
                            )
                        "
                    >
                        Excluir
                    </button>

                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

async function excluirReserva(id){

    const confirmar = confirm(
        "Deseja excluir a reserva?"
    );

    if(!confirmar) return;

    try{

        await fetch(
            `${api}/reservas/${id}`,
            {
                method: "DELETE"
            }
        );

        carregarReservas();

    }catch(error){
        console.error(error);
    }
}

carregarReservas();