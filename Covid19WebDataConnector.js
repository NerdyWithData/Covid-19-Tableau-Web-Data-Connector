(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
	    var data_cols = [{
	        id: "date",
	        alias: "Date",
	        dataType: tableau.dataTypeEnum.string,
	        description: "Date website was visited and data logged."
	    }, {
	        id: "state",
	        alias: "State",
	        dataType: tableau.dataTypeEnum.string,
	        description: "State or territory postal code abbreviation."
	    }, {
	        id: "positive",
	        alias: "Positive Tests (Cumulative)",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Total cumulative positive test results."
	    }, {
	        id: "positiveIncrease",
	        alias: "Positive Tests",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Increase in positive test results from the day before."
	    }, {
	        id: "negative",
	        alias: "Negative Tests (Cumulative)",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Total cumulative negative test results."
	    }, {
	        id: "negativeIncrease",
	        alias: "Negative Tests",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Increase of negative test results from the day before."
	    }, {
	        id: "hospitalizedCurrently",
	        alias: "Hospitalizations (Current)",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Number of people currently hospitalized."
	    }, {
	        id: "hospitalized",
	        alias: "Hospitalizations (Cumulative)",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Total cumulative number of people hospitalized."
	    }, {
	        id: "hospitalizedIncrease",
	        alias: "Hospitalizations",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Increase in hospitalizations from the day before."
	    }, {
	        id: "inIcuCurrently",
	        alias: "in ICU (Currently)",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Number of people currently in the ICU."
	    }, {
	        id: "inIcuCumulative",
	        alias: "in ICU (Cumulative)",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Total cumulative number of people in the ICU."
	    }, {
	        id: "onVentilatorCurrently",
	        alias: "On Ventilator (Currently)",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Number of people currently on a ventilator."
	    }, {
	        id: "onVentilatorCumulative",
	        alias: "On Ventilator (Cumulative)",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Total cumulative number of people on a ventilator."
	    }, {
	        id: "death",
	        alias: "Deaths (Cumulative)",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Total cumulative number of people that have died."
	    }, {
	        id: "deathIncrease",
	        alias: "Deaths",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Increase in deaths from the day before."
	    }, {
	        id: "totalTestResults",
	        alias: "Total Tests (Cumulative)",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Calculated value (positive + negative) of total test results."
	    }, {
	        id: "totalTestResultsIncrease",
	        alias: "Total Tests",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Increase in total test results from the day before."
	    }];

        var data_tableSchema = {
	        id: "covid_tracking_data_by_state",
	        alias: "CovidTracking.com - State Data",
            columns: data_cols
        };

	    var info_cols = [{
	        id: "state",
	        alias: "State",
	        dataType: tableau.dataTypeEnum.string,
	        description: "State or territory postal code abbreviation."
	    }, {
	        id: "name",
	        alias: "State (Full Name)",
	        dataType: tableau.dataTypeEnum.string,
	        description: "Full state or territory name."
	    }, {
	        id: "fips",
	        alias: "FIPS",
	        dataType: tableau.dataTypeEnum.string,
	        description: "Federal Information Processing Standard state code."
	    }, {
	        id: "covid19Site",
	        alias: "Covid19 Primary Site",
	        dataType: tableau.dataTypeEnum.string,
	        description: "Webpage dedicated to making results available to the public. More likely to contain numbers. We make regular screenshots of this URL."
	    }, {
	        id: "covid19SiteSecondary",
	        alias: "Covid19 Secondary Site",
	        dataType: tableau.dataTypeEnum.string,
	        description: "Typically more informational."
	    }, {
	        id: "twitter",
	        alias: "Twitter Handle",
	        dataType: tableau.dataTypeEnum.string,
	        description: "Twitter for the State Health Department."
	    }, {
	        id: "notes",
	        alias: "Notes",
	        dataType: tableau.dataTypeEnum.string,
	        description: "Notes about the information available and how we collect or record it."
	    }];

        var info_tableSchema = {
	        id: "covid_tracking_state_information",
	        alias: "CovidTracking.com - State Information",
            columns: info_cols
        };

	    var cdc_cols = [{
	        id: "data_as_of",
	        alias: "Data As Of",
	        dataType: tableau.dataTypeEnum.date,
	        description: "Date of latest update"
	    }, {
	        id: "group",
	        alias: "Group",
	        dataType: tableau.dataTypeEnum.string,
	        description: ""
	    }, {
	        id: "indicator",
	        alias: "Indicator",
	        dataType: tableau.dataTypeEnum.string,
	        description: ""
	    }, {
	        id: "start_week",
	        alias: "Start Week",
	        dataType: tableau.dataTypeEnum.date,
	        description: "Date where the data starts from."
	    }, {
	        id: "end_week",
	        alias: "End Week",
	        dataType: tableau.dataTypeEnum.date,
	        description: "Date through which the data is recorded."
	   	}, {
	        id: "covid_deaths",
	        alias: "All Covid-19 Deaths",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Deaths with confirmed or presumed COVID-19."
	    }, {
	        id: "total_deaths",
	        alias: "Deaths from All Causes",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Deaths received and coded as of the date of analysis, and do not represent all deaths that occurred in that period."
	    }, {
	        id: "percent_expected_deaths",
	        alias: "Percent of Expected Deaths",
	        dataType: tableau.dataTypeEnum.float,
	        description: "The number of deaths for all causes for this week in 2020 compared to the average number across the same week in 2017–2019"
	    }, {
	        id: "pneumonia_deaths",
	        alias: "Pneumonia Deaths",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Deaths from Pneumonia excluding deaths involving influenza"
	    }, {
	        id: "pneumonia_and_covid_deaths",
	        alias: "Pneumonia and Covid Deaths",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Pneumonia deaths involving COVID-19."
	    }, {
	        id: "all_influenza_deaths_j09_j11",
	        alias: "Influenza Deaths",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Deaths from Influenza"
	    }];

        var cdc_tableSchema = {
	        id: "cdc_provisional_death_counts",
	        alias: "CDC.gov (US) - Provisional Death Counts",
            columns: cdc_cols
        };

	    /*var ecdc_cols = [{
	        id: "dateRep",
	        alias: "Date Reported",
	        dataType: tableau.dataTypeEnum.date
	    }, {
	        id: "countriesAndTerritories",
	        alias: "Country / Territory",
	        dataType: tableau.dataTypeEnum.string
	    }, {
	        id: "geoId",
	        alias: "Geographic ID",
	        dataType: tableau.dataTypeEnum.string
	    }, {
	        id: "countryterritoryCode",
	        alias: "Country / Territory Code",
	        dataType: tableau.dataTypeEnum.string
	    }, {
			id: "cases",
	        alias: "Cases",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Confirmed Covid-19 Cases"
	    }, {
	        id: "deaths",
	        alias: "Deaths",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Deaths from Covid-19"
	    }, {
	        id: "popData2018",
	        alias: "2018 Population",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Total Population in 2018"
	    }];

        var ecdc_tableSchema = {
	        id: "ecdc_global_cases",
	        alias: "ECDC - Global Covid-19 Cases",
            columns: ecdc_cols
        };*/
        schemaCallback([data_tableSchema, info_tableSchema, cdc_tableSchema/*, ecdc_tableSchema*/]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
    	if (table.tableInfo.id == "covid_tracking_data_by_state") {
			$.getJSON("https://covidtracking.com/api/v1/states/daily.json", function(resp) {
				tableData = [];

				// Iterate over the JSON object
				for (var i = 0, len = resp.length; i < len; i++) {
					tableData.push({
						"date": resp[i].date,
						"state": resp[i].state,
						"positive": resp[i].positive,
						"positiveIncrease": resp[i].positiveIncrease,
						"negative": resp[i].negative,
						"negativeIncrease": resp[i].negativeIncrease,
						"hospitalizedCurrently": resp[i].hospitalizedCurrently,
						"hospitalized": resp[i].hospitalized,
						"hospitalizedIncrease": resp[i].hospitalizedIncrease,
						"inIcuCurrently": resp[i].inIcuCurrently,
						"inIcuCumulative": resp[i].inIcuCumulative,
						"onVentilatorCurrently": resp[i].onVentilatorCurrently,
						"onVentilatorCumulative": resp[i].onVentilatorCumulative,
						"death": resp[i].death,
						"deathIncrease": resp[i].deathIncrease,
						"totalTestResults": resp[i].totalTestResults,
						"totalTestResultsIncrease": resp[i].totalTestResultsIncrease
					});
				}
				table.appendRows(tableData);
				doneCallback();
			});
		} else if (table.tableInfo.id == "covid_tracking_state_information"){
			$.getJSON("https://covidtracking.com/api/states/info", function(resp) {
				tableData = [];

				// Iterate over the JSON object
				for (var i = 0, len = resp.length; i < len; i++) {
					tableData.push({
						"state": resp[i].state,
						"name": resp[i].name,
						"fips": resp[i].fips,
						"covid19Site": resp[i].covid19Site,
						"covid19SiteSecondary": resp[i].covid19SiteSecondary,
						"twitter": resp[i].twitter,
						"notes": resp[i].notes
					});
				}

				table.appendRows(tableData);
				doneCallback();
			});
		} else {
			$.getJSON("https://data.cdc.gov/resource/hc4f-j6nb.json", function(resp) {
				tableData = [];

				// Iterate over the JSON object
				for (var i = 0, len = resp.length; i < len; i++) {
					tableData.push({
						"data_as_of": resp[i].data_as_of.substring(0,10),
						"group": resp[i].group,
						"indicator": resp[i].indicator,
						"start_week": resp[i].start_week.substring(0,10),
						"end_week":resp[i].end_week.substring(0,10),
						"covid_deaths": resp[i].covid_deaths,
						"total_deaths": resp[i].total_deaths,
						"percent_expected_deaths": resp[i].percent_expected_deaths,
						"pneumonia_deaths": resp[i].pneumonia_deaths,
						"pneumonia_and_covid_deaths": resp[i].pneumonia_and_covid_deaths,
						"all_influenza_deaths_j09_j11": resp[i].all_influenza_deaths_j09_j11
					});
				}

				table.appendRows(tableData);
				doneCallback();
			});
		} /*else {

			// Using YQL and JSONP
			$.ajax({
				url: "https://opendata.ecdc.europa.eu/covid19/casedistribution/json/",

				// The name of the callback parameter, as specified by the YQL service
				jsonp: "callback",

				// Tell jQuery we're expecting JSONP
				dataType: "jsonp",

				// Tell YQL what we want and that we want JSON
				data: {
					q: "select title,abstract,url from search.news where query=\"cat\"",
					format: "json"
				},

				// Work with the response
				success: function( response ) {
					console.log( response ); // server response
				}
			});
		}*/
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Covid19 Data - NerdyWithData.com WDC"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
