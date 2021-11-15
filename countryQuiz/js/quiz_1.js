

var countries = []
var countriesUser = []


class User {
    constructor(  ){
        this.name = ""
        this.puntos = 0
        this.country = {}
        this.options = []
        this.count_question = 0
}

    setName ( name ) {
        this.name = name
    }

    currenCountry ( country ) {
        this.country = country
    }

    currenOptions ( options ) {
        this.options = options
    }

    sumQuestion () {
        this.count_question ++
    }

    sumarPuntos ( ) {
        this.puntos += 1
    }

    getResult () {
        return this.puntos
    }
}


//Obtener todos los paises
async function getCountries () {

    await fetch(`https://restcountries.com/v2/all`)
    .then(response => response.json())
    .then(data => countries = data)

    console.log(countries)
    // getQuest(countries)
}

function stoppedTyping(){
    // console.log("algo")
    var name = document.getElementById("input").value
    // console.log(name,"nombre")
    if( name.length > 0 ) { 
        this.user.setName(name)
        document.getElementById('start').disabled = false; 
    } else { 
        document.getElementById('start').disabled = true;
    }
}

function getRamdomCountry () {
    var aux = true
    while ( aux ) {
        var country = countries[Math.floor(Math.random()*countries.length)]; 
        if ( countriesUser.includes(country.name) ) {
            aux = true
        }else{
            countriesUser.push(country.name)
            aux = false
        }
    }
    return country
}

async function nextQuestion () {

    var country_ramdom =  getRamdomCountry()
    var options = []

    if (user.count_question == 5){
        finish()
    }else{
        for (let x = 0; x <  3; x++) {
            // Se selecciona un país random
            var option_ramdom = getRamdomCountry ()
            // Guardo la capital del pais ramdom a la array del las capitales
            options.push(option_ramdom)
        }
        options.push(country_ramdom) 
        options = await shuffle(options)
    
        this.user.currenCountry(country_ramdom)
        this.user.currenOptions(options)

        user.sumQuestion()
        renderCountries()
        // await renderCountries(country_ramdom,options)
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

  function blockButtons () {
    document.getElementsByClassName("option").disabled=true;
    document.getElementById("next").style.visibility="visible"
}

  function check ( i ) {

    var index_correct = this.user.options.findIndex( x => x.name == this.user.country.name)

    // Si es correcto o no
    if ( this.user.country.name == this.user.options[i].name ) {
        document.getElementById("option_"+i).style.backgroundColor="green";
        this.user.sumarPuntos()
        blockButtons ()
    }else{
        document.getElementById("option_"+i).style.backgroundColor="red";
        document.getElementById("option_"+index_correct).style.backgroundColor="green";
        blockButtons ()
    }
  }

  async function renderCountries( ) {

    let boolean = null
    let quest = null
    let flag = `<img class="flag" src="${this.user.country.flags.png}">`

    if ( Math.floor(Math.random() * 10) > 5 ){
        boolean =  true
        quest = `<h3 class="question">¿Cual es la capital de ${this.user.country.name}?</h3>`
    }else{
        boolean = false
        quest = `<h3 class="question">¿A que pais pertence esta bandera?</h3>`
    }


    const country_info =  `
        ${ boolean ? "" : flag}
        ${quest}
        <div class="capital_list">
            <button type="button" onclick="check(0)" id="option_0" class="option">A &nbsp;&nbsp; ${ boolean ?  this.user.options[0].capital : this.user.options[0].name }</button></br>
            <button type="button" onclick="check(1)" id="option_1" class="option">B &nbsp;&nbsp; ${ boolean ?  this.user.options[1].capital : this.user.options[1].name }</button></br>
            <button type="button" onclick="check(2)" id="option_2" class="option">C &nbsp;&nbsp; ${ boolean ?  this.user.options[2].capital : this.user.options[2].name }</button></br>
            <button type="button" onclick="check(3)" id="option_3" class="option">D &nbsp;&nbsp; ${ boolean ?  this.user.options[3].capital : this.user.options[3].name }</button></br>
        </div>
        <button type="button" onclick="nextQuestion()" class="next id="next" hidden>Next</button>`
    document.getElementById("country").innerHTML=country_info;

  }

  function finish () {
    console.log(this.user)
    const country_info =  `
    <div class="country">
        <img class="flag" src="../styles/trophy.png">
        <h1> Result </h1>
        <h3> You got ${ user.getResult() } correct answers </h3>

    </div>`
    document.getElementById("country").innerHTML=country_info;
  }


getCountries()
var user = new User()
