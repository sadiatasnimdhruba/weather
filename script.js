window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let feelsLike = document.querySelector('.feels');
    let Humidity = document.querySelector('.humidity');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let tempIcon = document.getElementById("temp-icon");
    let temperatureSpan = document.querySelector('.temperature span');


    if (navigator.geolocation) {
        console.log('geolocation available')
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(position);

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d509406020f54b82e1841ee0e32410fb`;
            //    const api = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&cnt=7&appid=d509406020f54b82e1841ee0e32410fb`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temp, feels_like, humidity } = data.main;
                    const { id, description, icon } = data.weather[0];
                    const location = data.name;
                    temperatureDegree.textContent = Math.floor(temp - 273) + '°';
                    feelsLike.textContent = Math.floor(feels_like - 273) + '°C';
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = location;
                    Humidity.textContent = humidity + '%';

                    if (id < 250) {
                        tempIcon.src = './icons/storm.svg';
                    }
                    else if (id < 350) {
                        tempIcon.src = './icons/drizzle.svg';
                    }
                    else if (id < 550) {
                        tempIcon.src = './icons/rain.svg';
                    }
                    else if (id < 650) {
                        tempIcon.src = './icons/snow.svg';
                    }
                    else if (id <= 800) {
                        tempIcon.src = './icons/atmosphere.svg';
                    }
                    /* else if (id===800){
                       tempIcon.src = './icons/sun.svg' ;
                     }*/
                    else if (id > 800) {
                        tempIcon.src = './icons/clouds.svg';
                    }

                    let farenhite = ((temp - 273) * 9) / 5 + 32;
                    let now = new Date();
                    let date = document.querySelector('.date');
                    date.innerText = dateBuilder(now);

                    //setIcons(icon, document.querySelector('.icon'));
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === 'C') {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = Math.floor(farenhite) + '°';
                        }
                        else {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(temp - 273) + '°';
                        }
                    })
                });
        });


    }
    else alert('geolocation not available');

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
    function dateBuilder(d) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day}, ${date} ${month}, ${year}`;
    }
});