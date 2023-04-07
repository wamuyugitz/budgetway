let settings_price = {
	"async": true,
	"crossDomain": true,
	"url": "https://cost-of-living-and-prices.p.rapidapi.com/prices?country_name=",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "3d5123f167msh30ca2814ff463e7p15a43djsn7a0dd901d698",
		"X-RapidAPI-Host": "cost-of-living-and-prices.p.rapidapi.com"
	}
};

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3d5123f167msh30ca2814ff463e7p15a43djsn7a0dd901d698',
		'X-RapidAPI-Host': 'country-facts.p.rapidapi.com'
	}
};

country_facts = fetch('https://country-facts.p.rapidapi.com/all', options)
.then(response => response.json())
.then(response => {return response})
.catch(err => console.error(err));

console.log(country_facts)

$(document).ready(function() {

    const costOfLivingAPIKey = '3d5123f167msh30ca2814ff463e7p15a43djsn7a0dd901d698';

    $('#search-btn').click(function() {
      const country = $('#country-inp').val();
      if (country === '') {
        $('#result').html('Please enter a country.');
        return;
      }
      
      country_facts.then((response) => {
            console.log(response[0])
            const countryFactsData = response.find(item => item.name.common == country) 
          const capital = countryFactsData.capital;
          const population = countryFactsData.population;
          const flag = countryFactsData.flag;
  
          const costOfLivingAPIURL = `https://rapidapi.com/cost_of_living/in/${country}`;
          const costOfLivingOptions = {
            headers: {
              'X-RapidAPI-Key': costOfLivingAPIKey,
              'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
            }
          };

        //   console.log("country facts data: ", countryFactsData);

          settings_price = {
            ...settings_price,
            url: `https://cost-of-living-and-prices.p.rapidapi.com/prices?country_name=${country}`
          }
          
          $.ajax(settings_price).done(function (costOfLivingData) 
          {
                // console.log("cost of living data: ", costOfLivingData)
                console.log("We are here")
                console.log(costOfLivingData["prices"])
                console.log("We pased here")
              //const costOfLiving = costOfLivingData.data[country].cost;
  
              let resultHTML = `<h2>${country}</h2>`;
              resultHTML += `<p><strong>Capital:</strong> ${capital}</p>`;
              resultHTML += `<p><strong>Population:</strong> ${population}</p>`;
              
            //   resultHTML += `<p><strong>Cost of living:</strong> ${JSON.stringify(costOfLivingData)}</p>`;
              resultHTML += `<img src="${flag}" alt="Flag of ${country}">`;

              resultHTML += `<p><strong>Prepaid Mobile Tariff Local:$</strong> ${costOfLivingData["prices"][45].usd.max}</p>`;
              resultHTML += `<p><strong>Accomodation:$</strong> ${costOfLivingData["prices"][29].usd.max}</p>`;
              resultHTML += `<p><strong>Water:$</strong> ${costOfLivingData["prices"][41].usd.max}</p>`;
              
              $('#result').html(resultHTML);
            })
            .fail(function() {
              $('#result').html('Error: Could not fetch cost of living data.');
            });
        })
        .fail(function() {
          $('#result').html('Error: Could not fetch country facts data.');
        });
    });
  });