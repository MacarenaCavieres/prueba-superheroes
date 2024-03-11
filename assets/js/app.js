$(function () {
    const bodyTable = $(".bodyTable");
    const btnVer = $("#btnVer");
    const error = $(".error");
    const regex = /^[0-9]+$/;

    btnVer.on("click", function (event) {
        event.preventDefault();
        const idSuperheroe = $("#idSuperheroe").val();
        console.log(idSuperheroe);

        if (!regex.test(idSuperheroe)) {
            error.append(`Favor ingrese un número`);
            error.html = "";
        }
        if (!idSuperheroe.trim()) {
            error.append(`Ingresar ID`);
        }
        if (idSuperheroe <= 0 || idSuperheroe >= 731) {
            error.append(`Id no existente`);
        }
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
