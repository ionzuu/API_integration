'use-strict';

locations = [
    {
        id: 'mx-nln',
        name: 'Nuevo Leon, Mexico',
        lat: 25.686613,
        lon: -100.316116,
    },
    {
        id: 'us-al-tx',
        name: 'Arlington, Texas, United States',
        lat: 32.705002,
        lon: -97.122780,
    },
    {
        id: 'jp-osk',
        name: 'Osaka, Japan',
        lat: 34.6937378,
        lon: 135.50216509999996,
    },
]


const send = document.getElementById('btnset');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

send.addEventListener('click', (e)=>{
    e.preventDefault();
    const location = document.getElementById('location').value;
    location !== '' ? openModal(location) : alert('Select a correct location.');
    
});

let getInfo;

function openModal(location){
    console.log(location)
    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('show');
    // Active an overlay
    overlay.classList.remove('hidden');
    overlay.classList.add('show');
    getData(location)
}

async function getData(location) {
    currentLocation = {};
    currentLocation = locations.find((locat) => locat.id === location)
    console.log(currentLocation)
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${currentLocation?.lat}&longitude=${currentLocation?.lon}&current=temperature_2m,wind_speed_10m&current=&timezone=auto`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return showInfo( await response.json(), currentLocation);
    } catch (error) {
        console.error("Error:", error);
    }
}


function showInfo(getInfo, currentLocation){
    const header = document.getElementById('header');
    const main = document.getElementById('main');
    const footer = document.getElementById('footer');
    console.log(getInfo)
    header.innerHTML = `<h1 class='title-header'>${currentLocation.name}</h1><br><h3 class='title-header'>Current Time: ${getInfo?.current.time.replace('T', ' ')}</h3>`
    main.innerHTML = `  
        <div class="temp"><img src="../API_integration/img/sunny.png"><h3 class='title-header'>Temperature: ${getInfo?.current.temperature_2m}°</h3></div>
        <div class="locate"><img src="../API_integration//img/world.png"><h3 class='title-header'>Latitude: ${currentLocation.lat} <br> Longitude: ${currentLocation.lon}</h3></div>
        <div class="wind"><img src="../API_integration/img/wind.webp"><h3 class='title-header'>Wind speed: ${getInfo?.current.wind_speed_10m} mph</h3></div>
    `
}

// id: 'mx-nln',
// name: 'Nuevo Leon, Mexico',
// lat: 25.686613,
// lon: -100.316116,
