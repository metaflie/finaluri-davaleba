const body = document.body;
const darkModeButton = document.querySelector('.dark_mode');

darkModeButton.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
  body.classList.toggle('night-mode');
  body.classList.toggle('day-mode');

  const isNightMode = body.classList.contains('night-mode');
  const buttonText = isNightMode ? 'Light Mode' : 'Dark Mode';
  darkModeButton.querySelector('p').textContent = buttonText;

  const icon = darkModeButton.querySelector('.material-symbols-outlined');
  icon.textContent = isNightMode ? 'light_mode' : 'dark_mode';

  // Update the background color of the heading
  const heading = document.querySelector('.heading');
  heading.style.backgroundColor = isNightMode ? 'rgb(33, 33, 33)' : 'white';
}

const cardContainer = document.querySelector('.card-container');
const sortBy = document.querySelector('#sort-by');

let countries = [];

// Fetch data from API
fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        countries = data;
        displayCards(countries);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Display cards
function displayCards(countries) {
    cardContainer.innerHTML = '';
    countries.forEach(country => {
        const card = document.createElement('div');
        card.classList.add('card');

        const flag = document.createElement('img');
        flag.src = country.flags.png; 
        flag.alt = `${country.name.common} flag`;
        card.appendChild(flag);

        const details = document.createElement('div');
        details.classList.add('details');

        const name = document.createElement('h2');
        name.textContent = country.name.common;
        details.appendChild(name);

        const population = document.createElement('p');
        population.textContent = `Population: ${country.population}`;
        details.appendChild(population);

        const region = document.createElement('p');
        region.textContent = `Region: ${country.region}`;
        details.appendChild(region);

        const capital = document.createElement('p');
        capital.textContent = `Capital: ${country.capital}`;
        details.appendChild(capital);

        card.appendChild(details);
        cardContainer.appendChild(card);
    });
}

const searchInput = document.querySelector('.search-input');

// Event listener for search input
searchInput.addEventListener('input', handleSearch);

// Function to handle search
function handleSearch() {
    const searchText = searchInput.value.toLowerCase();
    
    const filteredCountries = countries.filter(country => {
        const countryName = country.name.common.toLowerCase();
        return countryName.includes(searchText);
    });

    displayCards(filteredCountries);
}

// Sort functionality
sortBy.addEventListener('change', () => {
    const region = sortBy.value;
    if (region === 'none') {
        displayCards(countries);
    } else {
        const filteredCountries = countries.filter(country => {
            return country.region === region;
        });
        displayCards(filteredCountries);
    }
});
