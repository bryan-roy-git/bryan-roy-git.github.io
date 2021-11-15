
var countries = []
var countriesUser = []
var error = `<span class="material-icons icon"> highlight_off </span>`
var correct = `<span class="material-icons icon"> check_circle_outline </span>`

class User {
    constructor () {
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
    addOptions ( options ) {
        this.options.push(options)
    }
    sumQuestion () {
        this.count_question ++
    }
    sumarPuntos () {
        this.puntos += 1
    }
    getResult () {
        return this.puntos
    }
}

async function getCountries () {
    await fetch(`https://restcountries.com/v2/all`)
    .then(response => response.json())
    // Filter  crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
    .then(data => countries = data.filter(country => country.capital) ) 
    .catch(error => console.error("Error:", error))
}

function stoppedTyping(){
    var name = $("#name").val()
    if( name.length > 0 ) { 
        this.user.setName(name)
        $('#start').prop('disabled', false);
        $('#start').removeClass("disabled")
        $('#start').addClass("enabled")
    } else { 
        $('#start').prop('disabled', true);
        $('#start').removeClass("enabled")
        $('#start').addClass("disabled")
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
    if (user.count_question == 5){
        finish()
    }else{
        // Generar un index aleatoreo para ubicar la respues correcta
        var random = Math.floor(Math.random()*4) 
        console.log(random,"index de 0-3")
        this.user.options = []
        for (let x = 0; x <  4; x++) {
            var country_ramdom = getRamdomCountry()
            if ( x == random ) {
                this.user.currenCountry(country_ramdom)
            }
            this.user.addOptions(country_ramdom)
        }
        user.sumQuestion()
        renderCountries()
    }
}

function blockButtons () {
    $("#option_0").prop('disabled', true);
    $("#option_1").prop('disabled', true);
    $("#option_2").prop('disabled', true);
    $("#option_3").prop('disabled', true);

}

async function check ( i ) {
    // Si es correcto o no
    console.log("ENTRA")
    if ( this.user.country.name == this.user.options[i].name ) {
        $("#option_"+i).css("background-color", "rgb(103, 181, 129)")
        // $("#option_"+i).wrapInner('<span>hol</span>')
        $(correct).appendTo("#option_"+i);
        this.user.sumarPuntos()
 
    }else{
        var index_correct = await this.user.options.findIndex( x => x.name == this.user.country.name)
        $("#option_"+i).css("background-color", "rgb(223, 122, 122)")
        $(error).appendTo("#option_"+i);
        $("#option_"+index_correct).css("background-color", "rgb(103, 181, 129)")
        $(correct).appendTo("#option_"+index_correct);
    }
    $('#next').show()
    blockButtons ()
}

async function renderCountries( ) {

    console.log(this.user.country.name)
    console.log(this.user.options)

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
            
            <button type="button" onclick="check(0)" id="option_0" class="option"><span class="answer">A &nbsp; ${ boolean ?  this.user.options[0].capital : this.user.options[0].name }</span></button></br>
            <button type="button" onclick="check(1)" id="option_1" class="option"><span class="answer">B &nbsp; ${ boolean ?  this.user.options[1].capital : this.user.options[1].name }</span></button></br>
            <button type="button" onclick="check(2)" id="option_2" class="option"><span class="answer">C &nbsp; ${ boolean ?  this.user.options[2].capital : this.user.options[2].name }</span></button></br>
            <button type="button" onclick="check(3)" id="option_3" class="option"><span class="answer">D &nbsp; ${ boolean ?  this.user.options[3].capital : this.user.options[3].name }</span></button></br>
        </div>
        <button type="button" onclick="nextQuestion()" class="next" id="next" hidden>Next</button>`
    $("#country").html(country_info)
}

function refresh () {
    location.reload();
}

function finish () {
    console.log(this.user)
    const result_info =  `
    <div>
        <img class="flag" src="./countryQuiz/styles/trophy.png"><br>
        <span class="result"> Result </span>
        <h3> You got <span class="puntos"> ${ user.getResult() }</span> correct answers </h3>
        <button type="button" class="enabled" onclick="refresh()" >Try again </button>
    </div>`
    $("#country").html(result_info)
}
    
getCountries()
var user = new User()