$(function () {
    const bodyTable = $(".bodyTable");
    const btnVer = $("#btnVer");
    const error = $(".error");
    const infoSuperheroes = $(".infoSuperheroes");
    const chartContainer = $("#chartContainer");
    const regex = /^[0-9]+$/;

    btnVer.on("click", function (event) {
        event.preventDefault();
        const idSuperheroe = $("#idSuperheroe").val();

        if (!regex.test(idSuperheroe.trim())) {
            error.html("");
            error.append(`Favor ingrese un número`);
            return;
        }

        if (idSuperheroe <= 0 || idSuperheroe > 731) {
            error.html("");
            error.append(`Id no existente`);
            return;
        }

        infoSuperheroes.html("");

        const superheroe = +idSuperheroe;

        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${superheroe}`,
            method: "GET",
            success(data) {
                // console.log(data);
                let alianzas = data.biography.aliases.map((item) => {
                    return item;
                });

                infoSuperheroes.append(`
                <h3>Superhéroe encontrado</h3>
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.image.url}" class="img-fluid rounded-start" alt="${data.name}" />
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

                const options = {
                    title: {
                        text: `Estadísticas de poder de ${data.name}`,
                    },
                    data: [
                        {
                            type: "pie",
                            startAngle: 45,
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabel: "{label} ({y})",
                            yValueFormatString: "#,##0.#" % "",
                            dataPoints: [
                                { label: "combat", y: `${data.powerstats.combat}` },
                                { label: "durability", y: `${data.powerstats.durability}` },
                                { label: "intelligence", y: `${data.powerstats.intelligence}` },
                                { label: "power", y: `${data.powerstats.power}` },
                                { label: "speed", y: `${data.powerstats.speed}` },
                                { label: "strength", y: `${data.powerstats.strength}` },
                            ],
                        },
                    ],
                };
                chartContainer.css({
                    height: "400px",
                });
                chartContainer.CanvasJSChart(options);
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
