
let country__body = document.querySelector('.country__body');
let regions  = [...document.querySelectorAll('.filter-list__item')];
let btnDark = document.querySelector('.dark-mode');
let body = document.querySelector('body');

// handing when occur erron
let errElement = document.createElement('div');
    errElement.className = 'erron'
    errElement.innerHTML = 'Sory, trang web của chúng tôi đang xải ra một số lỗi!';

// ======> start 
let url = "https://restcountries.com/v3.1/all";

let app = {
    getApi(){
        let GetCountrys = async (data) => {
            try{
                const res = await fetch(data);
                const callback = await res.json();
                renderUI(callback);             
            }
            catch(err){
                console.log(err);
                body.appendChild(errElement);       
            }
        }
        GetCountrys(url);
    },
    darkMode(){     
        function load() {
            // MediaQueryList object
            const useDark = window.matchMedia("(prefers-color-scheme: dark)");
          
            // Toggles the "dark-mode" class based on if the media query matches
            function toggleDarkMode(state) {
              // Older browser don't support the second parameter in the
              // classList.toggle method so you'd need to handle this manually
              // if you need to support older browsers.
              body.classList.classList.toggle("dark--mode", state);
            }
          
            // Initial setting
            toggleDarkMode(useDark.matches);
          
            // Listen for changes in the OS settings
            useDark.addListener((evt) => toggleDarkMode(evt.matches));
          
            // Toggles the "dark-mode" class on click
            btnDark.addEventListener('click',(evt) => {
                body.classList.toggle('dark--mode');
            });
          }
          
          window.addEventListener("DOMContentLoaded", load);
    },
    handleScroll(){
        window.addEventListener('scroll',(evt) => {
            const {scrollTop,scrollHeight,clientHeight} = document.documentElement;
        })
    },
    start(){
        this.getApi()
        this.darkMode()
        this.handleScroll()
    }
}
app.start();

function renderUI(data__){
    let htmls =  data__.map(country => {
        return   `<div class="country__box">
        <div class="image" style="background-image: url(${country.flags.png});"></div>
        <div class="country__details">
            <h3 class="country__title">${country.name.common}</h3>
 
             <p class="country__text-info pl"><span>Population:</span>${country.population}</p>
             <p class="country__text-info region"><span>Region:</span>${country.region}</p>
             <p class="country__text-info"><span>Capital:</span>${country.capital}</p>
        </div>
        </div>`
    }).join('');
    country__body.innerHTML = htmls;

    let country__box = document.querySelectorAll('.country__box');
    let inputSearch = document.querySelector('.input-country');

    // handle search country
    inputSearch.addEventListener('input',(evt) => {
        let value = inputSearch.value.trim().toLowerCase();
        handleSearch(value)
    })

    function handleSearch(value__){
        country__box.forEach(element => {
            let countryName = element.querySelector('.country__title');
            if(countryName.textContent.toLowerCase().includes(value__)){
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        });
    }

    // handle filter country
    regions.forEach(regionBTN => {
        regionBTN.addEventListener('click',(evt) => {
            let value = regionBTN.textContent;
            handle__Filter(value);
        })
    })

    function handle__Filter(value__){
        country__box.forEach(element => {
            let regionText = element.querySelector('.region').textContent;
            if(regionText.includes(value__)){
                element.style.display = "block";
            }else{
                element.style.display = "none";
            }
        })
    }

    // get index for section details modal country
    country__box.forEach((elm,index) => {
        elm.addEventListener('click',(evt) => {
            countryModal(data__[index]);
            countryWrap.classList.add('show');
        })
     })
}

// handle section modal country
let btnBack = document.querySelector('.back-btn');
let countryWrap = document.querySelector('.country__modal');

function countryModal(data__){
    let div = document.createElement('div');
    div.innerHTML = ` <div class="country__modal-content">
                    <div class="left-content">
                        <img src="${data__.flags.svg}" alt="">
                    </div>
                    <div class="right-content">
                        <h2>Information country : <span>${data__.name.common}</span></h2>
                        <p><strong>Population:</strong> <span>${data__.population}</span></p>
                        <p><strong>Region:</strong> <span>${data__.region}</span></p>
                        <p><strong>Capital:</strong> <span>${data__.capital}</span></p>
                        <p><strong>Subregion:</strong> <span>${data__.subregion}</span></p>
                        <p><strong>Status:</strong> <span>${data__.status}</span></p>
                    </div>
                </div>`;
        countryWrap.appendChild(div);

        btnBack.addEventListener('click',(evt) =>{
            countryWrap.classList.remove('show')
            div.innerHTML = '';
       })
}



