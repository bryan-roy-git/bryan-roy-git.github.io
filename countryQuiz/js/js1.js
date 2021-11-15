class Quiz {
    constructor( name ){
        this.name = name
        this.puntos = 0
    }
    sumarPuntos ( ) {
        this.puntos += 2.5
    }
    getRsult () {
        return this.puntos
    }
}

//Obtener todos los paises
async function allCountries( name ) {

    exam = new Quiz ()

    var countries = []
    await fetch(`https://restcountries.com/v2/all`)
    .then(response => response.json())
    .then(data => countries = data)

    countriesQuiz(countries)

}
// Examen
async function countriesQuiz ( countriesData ) {

    for (let i = 0; i <  25; i++) {

        // Se selecciona un país random
        var country_ramdom = countriesData[Math.floor(Math.random()*countriesData.length)]; 
        var options = [] 

        for (let x = 0; x <  3; x++) {

            // Se selecciona un país random
            var option_ramdom = await countriesData[Math.floor(Math.random()*countriesData.length)];
            // Guardo la capital del pais ramdom a la array del las capitales
            options.push(option_ramdom)

        }
        options.push(country_ramdom) 
        options = await shuffle(options)

        await renderCountries(country_ramdom,options,i)
    }
}

// Ordernar la array de las 4 capitales de manera aleatorea
async function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...f
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

async function renderCountries(country, options ,i) {

    console.log(country)
    console.log(options)

    let boolean = null
    let quest = null
    let flag = `<img class="flag" src="${ boolean ? '' : country.flags.png}">`

    if ( Math.floor(Math.random() * 10) > 4 ){
        boolean =  true
        quest = `<h3 class="question">¿Cual es la capital de ${country.name}?</h3>`
    }else{
        boolean = false
        quest = `<h3 class="question">¿A que pais pertence esta bandera?</h3>`
    }

    setTimeout(function() { 
        const country_info =  `
        <div class="country">
            ${ boolean ? "" : flag}
            ${quest}
            <div class="capital_list">
                <button type="button" class="option">${ boolean ?  options[0].capital : options[0].name }</button></br>
                <button type="button" class="option">${ boolean ?  options[1].capital : options[1].name }</button></br>
                <button type="button" class="option">${ boolean ?  options[2].capital : options[2].name }</button></br>
                <button type="button" class="option">${ boolean ?  options[3].capital : options[3].name }</button></br>
            </div>
        </div>`
        document.getElementById("country").innerHTML=country_info;
    }, i * 1000);
  }

// allCountries()
