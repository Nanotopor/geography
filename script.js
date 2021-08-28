let countries;
let trueCapital;

const showCountry = () => {
    const trueCountry = getRandomCountry();
    document.querySelector('.country').textContent = trueCountry.name;
    document.querySelector('.flag').src = trueCountry.flag;
    const radio = document.querySelectorAll('.radio-button');
    const trueRadioIndex = randomArrayIndex(radio.length);

    trueCapital = trueCountry.capital;

    for (let i = 0; i < radio.length; i++) {
        let capital;

        if (i === trueRadioIndex){
            capital = trueCountry.capital;
        } else {
            capital = getRandomCountry().capital;
        }

        const radioButton = radio[i];
        radioButton.querySelector('input').value = capital;
        radioButton.querySelector('label').textContent = capital;
    }
}

const getCountries = async () => {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const countriesArray = await res.json(); 

    countries = countriesArray.filter(country => country.capital);
}

const getRandomCountry = () => {
    const randomIndex = randomArrayIndex(countries.length);

    return countries[randomIndex];
}

const randomArrayIndex = (length) => {
    return Math.round(Math.random() * (length - 1));
}

document.querySelector('.button-start').addEventListener('click', () => {
    document.querySelector('.first-page').style = 'display: none';
    document.querySelector('.game').style = 'display: flex';

    showCountry();
})


document.querySelector('.submit').addEventListener('click', () => {
    const form = document.querySelector('.form');
    const div = document.querySelectorAll('.radio-button'); 

    if (form.radio.value) {
        for (let i = 0; i < div.length; i++) {
            if (div[i].querySelector('input').value === trueCapital) {
                div[i].querySelector('label').style = 'background-color: green';
            } else if (div[i].querySelector('input').checked){
                div[i].querySelector('label').style = 'background-color: red';   
            }
            setTimeout(() => div[i].querySelector('label').style = '', 2000);
        }
        setTimeout(() => {
            showCountry();
            form.reset();
        }, 2000);
       
    }
});

getCountries();
