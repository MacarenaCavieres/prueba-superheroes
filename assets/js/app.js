$(function () {
    const bodyTable = $(".bodyTable");
    const btnVer = $("#btnVer");
    const error = $(".error");
    const infoSuperheroes = $(".infoSuperheroes");
    const regex = /^[0-9]+$/;

    btnVer.on("click", function (event) {
        event.preventDefault();
        const idSuperheroe = $("#idSuperheroe").val();

        if (!regex.test(idSuperheroe)) {
            error.append(`Favor ingrese un número`);
            return;
        }
        if (!idSuperheroe.trim()) {
            error.append(`Ingresar ID`);
            return;
        }
        if (idSuperheroe <= 0 || idSuperheroe >= 731) {
            error.append(`Id no existente`);
            return;
        }
        infoSuperheroes.html("");

        const superheroe = +idSuperheroe;

        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${superheroe}`,
            method: "GET",
            success(data) {
                console.log(data);

                let alianzas = data.biography.aliases.map((item) => {
                    return item;
                });

                infoSuperheroes.append(`
                <h3>Superhéroe encontrado</h3>
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.image.url}" class="img-fluid rounded-start mt-3" alt="${data.name}" />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body mt-5">
                                <h5 class="card-title">Nombre: ${data.name}</h5>
                                <p class="card-text">Conexiones: ${data.connections["group-affiliation"]}</p>
                                <p class="card-text"><em>Publicado por:</em> ${data.biography.publisher}</p>
                                <p class="card-text">Ocupación: ${data.work.occupation}</p>
                                <p class="card-text">Primera aparición: ${data.biography["first-appearance"]}</p>
                                <p class="card-text">Altura: ${data.appearance.height[1]}</p>
                                <p class="card-text">Peso: ${data.appearance.weight[1]}</p>
                                <p class="card-text">Alianzas: ${alianzas}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `);
            },
            error(err) {
                console.log(err);
            },
        });
    });

    for (let i = 1; i <= 50; i++) {
        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${i}`,
            method: "GET",
            success(data) {
                bodyTable.append(`
                    <tr>
                        <th scope="row">${data.id}</th>
                        <td>${data.name}</td>
                    </tr>
                    `);
            },
            error(err) {
                console.log(err);
            },
        });
    }
});
