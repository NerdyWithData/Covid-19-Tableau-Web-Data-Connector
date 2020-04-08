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
	        alias: "Total Tests",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Calculated value (positive + negative) of total test results."
	    }, {
	        id: "totalTestResultsIncrease",
	        alias: "Pending Tests (Cumulative)",
	        dataType: tableau.dataTypeEnum.int,
	        description: "Increase in total test results from the day before."
	    }];

        var data_tableSchema = {
	        id: "covid19databystate",
	        alias: "Covid19 Data by State",
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
	        id: "covid19stateinfo",
	        alias: "Covid19 State Information",
            columns: info_cols
        };
        schemaCallback([info_tableSchema, data_tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
    	if (table.tableInfo.id == "covid19databystate") {
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
		} else {
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
		}
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Covid19 Data by US State Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
