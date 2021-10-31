const accessTokenAPI = 10226753562890946; 

document.body.querySelector('form').onsubmit = (e) =>{
    e.preventDefault();
    const input_value = Number(document.body.querySelector('input').value);
    if(isNaN(input_value))
        return alert('Must to be a number');
    else
        if(!(input_value > 0 && input_value <= 731)) return alert('Must to be a value between 1 and 731');
    APICall(input_value);
}
    

function APICall(heroID) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: `https://superheroapi.com/api.php/${accessTokenAPI}/${heroID}`,
        success:function (data) {
            $(".d-none").removeClass("d-none");
            $(".img-fluid").attr("src", data.image.url);
            const li = $(".list-group-item");
            document.querySelector(".hero-name").innerHTML = `Nombre: ${data.name}`;
            document.querySelector(".hero-connection").innerHTML = `Conexiones: ${data.connections["group-affiliation"]}`;
            li[0].innerHTML = `Publicado por: ${data.biography.publisher}`;
            li[1].innerHTML = `Ocupación: ${data.work.occupation}`;
            li[2].innerHTML = `Primera aparicion: ${data.biography["first-appearance"]}`;
            li[3].innerHTML = `Altura: ${data.appearance.height}`;
            li[4].innerHTML = `Peso: ${data.appearance.weight}`;
            li[5].innerHTML = `Alianza: ${data.biography.aliases}`;
            showAPIPieChart(data);
        },
        error: function (err) {console.log(err);},
    });
}

function showAPIPieChart(heroData) {
    var options = {
        title: {
            text: `Estadisticas de poder para ${heroData.nombre}`
        },
        data: [{
                type: "pie",
                startAngle: 45,
                showInLegend: "true",
                legendText: "{label}",
                indexLabel: "{label} ({y})",
                yValueFormatString:"#,##0.#"%"",
                dataPoints: Object.keys(heroData.powerstats).map(keys => ({label: keys, y: Number(heroData.powerstats[keys])}))
        }]
    };
    $("#chartContainer").CanvasJSChart(options);
}