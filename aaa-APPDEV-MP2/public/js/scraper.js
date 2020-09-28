const axios = require('axios');

const printNumbers = async () => {
	try {
		const { data } = await axios.get(
			'https://api.coronatracker.com/v3/stats/worldometer/country?countryCode=PH'
		);
        
        console.log(JSON.stringify(data))
        console.log("Confirmed cases: " + JSON.stringify(data[0].totalConfirmed))
        console.log("Confirmed deaths: " + JSON.stringify(data[0].totalDeaths))
        console.log("Confirmed recovered: " + JSON.stringify(data[0].totalRecovered))
		
	} catch (error) {
        console.log("error: " + err)
		throw error;
	}
};

printNumbers()