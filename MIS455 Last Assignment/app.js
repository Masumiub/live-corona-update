function connectAPI(){
    fetch('https://api.covid19api.com/world/total')
    .then(res=>res.json())
    .then(data=>loadAPI(data))
}

connectAPI();

function loadAPI(data){
    console.log(data);
    var defaultdiv = document.getElementById('default-corona-summary');
    defaultdiv.innerHTML = `<h1>${data.TotalConfirmed}</h1>
                            <p>Total Confirmed Cases<p>
                            <h2>${data.TotalDeaths}</h2>
                            <p>Total Deaths<p>
                            `;
}


var text = '';
function findCountry(){
    text = document.getElementById('country-search').value;
    connectCountry(text);
    //document.getElementById('country-search').value="";
}


function connectCountry(text) {
    fetch(`https://api.covid19api.com/total/dayone/country/${text}`)
    .then(res=> res.json() )
    .then(cdata=> loadcountry(cdata));

}

connectCountry();

function loadcountry(cdata){
    console.log(cdata.length);
    console.log(cdata);
    var countryCoronraInfo = document.getElementById('corona-info-of-a-country');
    countryCoronraInfo.innerHTML = `<h2>${cdata[cdata.length-1].Active}</h2>
                                    <p>Total Active Cases</p>
                                    `;
    
    var confirmedCaseDiv = document.getElementById('confirmed-cases');
    confirmedCaseDiv.innerHTML = `<h2>${cdata[cdata.length-1].Confirmed}</h2>
                                    <p>Total Confirmed Cases</p>
                                    `;
    
    var deathCaseDiv = document.getElementById('deaths-cases');
    deathCaseDiv.innerHTML = `<h2>${cdata[cdata.length-1].Deaths}</h2>
                              <p>Total Deaths</p>`;
    
    var butnDiv = document.getElementById('buttondiv');
    butnDiv.innerHTML = `<button onclick="FindCountryDetails();scrollWin()">Click Here to Show More</button><br> <br>`;
}

function scrollWin() {
window.scrollBy(0, 700);
}

function FindCountryDetails(){
    text = document.getElementById('country-search').value;
    connectCountryDetails(text);
}

function connectCountryDetails(text){
    fetch(`https://restcountries.com/v3.1/name/${text}`)
    .then(res=> res.json() )
    .then(CountryDetailsdata=> LoadCountryDetails(CountryDetailsdata));
}

function LoadCountryDetails(CountryDetailsdata){
    
    console.log(CountryDetailsdata);
    var countryDetailsDiv = document.getElementById('countrydetails');
    countryDetailsDiv.innerHTML = ` <img src='${CountryDetailsdata[0].flags.png}'><br><br>
                                    <p>Common Name: ${CountryDetailsdata[0].name.common}<br>
                                    Official Name: ${CountryDetailsdata[0].name.official}<br>
                                    Population: ${CountryDetailsdata[0].population}<br>
                                    Capital: ${CountryDetailsdata[0].capital[0]}<br>
                                    Region: ${CountryDetailsdata[0].region}<p>
                                    `;
    
}

//<h6>Country : ${cdata[cdata.length-1].Country}</h6>
//<h6>Date: ${cdata[cdata.length-1].Date}</h6>