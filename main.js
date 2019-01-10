$(document).ready(function() {
    $.ajax({
        url: 'http://157.230.17.132:4000/sales',
        method: 'GET',
        success: function(data)
        {
            printPieChart(data);
            printLineChart(data);
        },
        error: function()
        {
            alert('Si è verificato un errore');
        }
    });
});

function printLineChart(results)
{
    var oggetoVendite = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0
    };

    for (var i = 0; i < results.length; i++) {
        //oggetto della vendita
        var vendita = results[i];
        //ammontare della vendita
        var amount = vendita.amount;
        //data della vendita in formato stringa
        var originalDate = vendita.date;
        //data della vendita in formato moment
        var momentDate = moment(originalDate, "DD/MM/YYYY");
        //mese della vendita in formato stringa
        var mese = momentDate.format('MMMM');

        oggetoVendite[mese] += amount;
    }

    var arrayMesi = [];
    var arrayAmounts = [];

    for (var mese in oggetoVendite) {
        arrayMesi.push(mese);
        arrayAmounts.push(oggetoVendite[mese]);
    }

    console.log(arrayMesi);
    console.log(arrayAmounts);

    var chart = new Chart($('#line'), {
        type: 'line',
        data: {
            labels: arrayMesi,
            datasets: [{
                label: "Vendite dell'azienda",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: arrayAmounts,
            }]
        }
    });
}

function printPieChart(results)
{
    var processedObj = {};
    var fatturatoTotale = 0;

    for (var i = 0; i < results.length; i++) {
        var vendita = results[i];
        var venditore = vendita.salesman;
        var amount = vendita.amount;

        if (processedObj[venditore] == undefined)
        {
            processedObj[venditore] = 0;
        }

        processedObj[venditore] += amount;
        fatturatoTotale += amount;
    }

    var arrayLabels = [];
    var arrayAmounts = [];

    for (var nomeVenditore in processedObj) {
        var percentualeFatturato = processedObj[nomeVenditore] / fatturatoTotale * 100;
        console.log(percentualeFatturato);

        arrayLabels.push(nomeVenditore);
        arrayAmounts.push(percentualeFatturato.toFixed(2));
    }

    var myPieChart = new Chart($('#pie'), {
        type: 'pie',
        data: {
            datasets: [{
                data: arrayAmounts
            }],
            labels: arrayLabels
        }
    });
}
