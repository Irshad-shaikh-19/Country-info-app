let searchInput = document.querySelector(".searchInput");
let main = document.querySelector(".main-container");
let allcountryData;  // ---> define for accessing in search function because element is not accessible outside
let filterRegion = document.querySelector('.filterRegion');

// Remove fetch method outside from function because we need all data of countries in one variable for search functionality
fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    allcountryData = data;   // All data assigned to allcountryData variable
    getCountries(data);     // Calling getCountries function with all data
  });


  

// Function to display countries
async function getCountries(countryData) {    // countryData = data --> above --> getCountries(data) 
  if (main) { // Ensure 'main' is not null
    main.innerHTML = "";   // Clear main container to handle search and region functionality

    countryData.forEach((ele) => {    // countryData = data
      let a = document.createElement("a");
      a.classList.add("card");

      a.href = `single.html?name=${ele.name.common}`;

      let content = ` 
        <div class="img-div">
          <img src="${ele.flags.svg}" alt="Flag of ${ele.name.common}">
        </div>
        <div class="content-div">
          <h2>${ele.name.common}</h2>
          <p><b>Population:</b> ${ele.population.toLocaleString("en-In")}</p>
          <p><b>Region:</b> ${ele.region}</p>
          <p><b>Capital:</b> ${ele.capital?.[0] || 'N/A'}</p>
        </div>`;

      a.insertAdjacentHTML("afterbegin", content);
      main.append(a);
    });
  }
}




// Search Functionality
if (searchInput) {
  searchInput.addEventListener("input", (evt) => {    // Input is an event
    let inputCountry = allcountryData.filter((country) => {   // Filter countries based on search input
      return country.name.common.toLowerCase().includes(evt.target.value.toLowerCase());  // Case-insensitive search
    });
    getCountries(inputCountry);  // Call getCountries with filtered data
  });
}




// Filter by Region Functionality
if (filterRegion) {
  filterRegion.addEventListener("change", (evt) => {
    console.log(evt.target.value);
    let inputRegion = allcountryData.filter((countryRegion) => {
      return countryRegion.region.includes(evt.target.value);
    });
    getCountries(inputRegion);
  });
}





// Dark Mode Functionality
document.addEventListener('DOMContentLoaded', () => {
  const darkBtn = document.querySelector(".dark-btn");
  const searchIcon = document.querySelector("#search");

  if (darkBtn) {
    darkBtn.addEventListener("click", () => {
      document.body.classList.toggle('dark-mode');

      if (document.body.classList.contains('dark-mode')) {
        darkBtn.innerHTML = `<i class="bi bi-brightness-high-fill"></i> Light Mode`;
        if (searchIcon) {
          searchIcon.style.color = "white";
        }
      } else {
        darkBtn.innerHTML = `<i class="bi bi-moon-fill"></i> Dark Mode`;
        if (searchIcon) {
          searchIcon.style.color = "black";
        }
      }
    });
  } else {
    console.error("Dark mode button not found!");
  }
});





//Filter by Region Functionality another method(api):-
/* 

filterRegion.addEventListener("change", (evt) => {
  fetch(`https://restcountries.com/v3.1/region/${evt.target.value}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      fetchcountry(data);
    });
});

*/