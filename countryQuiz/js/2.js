class Country {
    constructor(){
        this.name="";
        this.capital="";
        this.flag="";
    }
    succes () {
    }
    faliure () {
    }
}

//Obtener todos los paises
async function allCountries() {
    
    var countriesName = []

    await fetch(`https://restcountries.com/v3.1/all`)
    .then(response => response.json())
    .then(data => {

        for (let i = 0; i <  data.length; i++) {
            countriesName.push(data[i].name.common)
        }

        countriesQuiz(countriesName)
    })

}

async function getCountry ( name ) {

    var country_info = null
    await fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => response.json())
    .then(country => {
        country_info = country[0]
    })
    return country_info
}

async function countriesQuiz ( countriesName ) {

    for (let i = 0; i <  25; i++) {

        var country_ramdom = await getCountry(countriesName[Math.floor(Math.random()*countriesName.length)]);
        var capitals = [] 

        for (let x = 0; x <  4; x++) {
            var capital_ramdom = await getCountry(countriesName[Math.floor(Math.random()*countriesName.length)]);
            capitals.push(capital_ramdom[x].capital[0]) 
            console.log(x)
        }

        console.log(country_ramdom)
        console.log(capitals)
        // if (capitals.length == 4) {
        //     capitals.push(capital_ramdom[0].capital[0])
        //     capitals = await shuffle(capitals)
    
        //     console.log(capital_ramdom,"Country")
        //     console.log(capitals, "Capitales")
        // }

        break
    }


    // renderCountries(countries,capitals)
}

// Ordernar la array de las 4 capitales de manera aleatorea
async function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

// Obtener de la array de las capitales, las 4 opciones para la pregunta
async function getCapitals ( capitals ) {
    var capitals_quest = []
    count = 0

    while ( count < 3) {

        // Sacamos una capital aleatorea de la array con las capitales
        var capital_ramdom = await capitals[Math.floor(Math.random()*capitals.length)];

        // Evitar que la capital se repita en la array
        if ( capitals_quest.indexOf(capital_ramdom) == -1) { 
            capitals_quest.push(capital_ramdom)
            count ++
        }
    }
    return capitals_quest
}



async function renderCountries (countries,capitals) {

    var capitales = []
    for (let i = 0; i < countries.length; i++) {
        correct_capital = await countries[i].capital[0]
        capitales = await getCapitals(capitals)
        capitales.push(correct_capital)
        capitales = await shuffle(capitales)
        doSetTimeout(countries[i], capitales , i)
    }
}



async function doSetTimeout(country, capitales ,i) {
    console.log(country.name.common," - ",i,"Capital")
    setTimeout(function() { 

        const country_info =  `
        <div class="country">
            <h3 class="question">¿Cual es la capital de ${country.name.common}?</h3>
            <div class="capital_list">
                <h2>${capitales[0]}</h2>
                <h2>${capitales[1]}</h2>
                <h2>${capitales[2]}</h2>
                <h2>${capitales[3]}</h2>
            </div>
        </div>`
        document.getElementById("country").innerHTML=country_info;
    }, i * 1000);
  }

// var datos = allCountries()
// getCountriesCapitals ( )
allCountries()
// countriesQuiz()