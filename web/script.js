const api = "http://127.0.0.1:3000";

async function carregarQuartos() {

    try {

        console.log("Buscando quartos...");

        const response = await fetch(`${api}/quartos`);

        const quartos = await response.json();

        console.log(quartos);

        const lista = document.getElementById("lista-quartos");

        lista.innerHTML = "";

        quartos.forEach(quarto => {

            lista.innerHTML += `
                <div class="card">

                    <h2>Quarto ${quarto.numero}</h2>

                    <p><strong>Tipo:</strong> ${quarto.tipo}</p>

                    <div class="acoes">

                        <button 
                            class="btn-reservas"
                            onclick="verReservas(${quarto.id})"
                        >
                            Ver Reservas
                        </button>

                        <button 
                            class="btn-excluir"
                            onclick="excluirQuarto(${quarto.id})"
                        >
                            Excluir
                        </button>

                    </div>

                </div>
            `;
        });

    } catch (error) {
        console.error("ERRO:", error);
    }
}

function verReservas(id){
    window.location.href = `reservas.html?id=${id}`;
}

async function excluirQuarto(id){

    const confirmar = confirm(
        "Deseja realmente excluir este quarto?"
    );

    if(!confirmar) return;

    try{

        await fetch(`${api}/quartos/${id}`, {
            method: "DELETE"
        });

        carregarQuartos();

    }catch(error){
        console.error(error);
    }
}

carregarQuartos();