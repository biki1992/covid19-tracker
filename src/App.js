import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './component/Header';
import InfoBox from './component/InfoBox';
import Table from './component/Table';
import Maps from './component/Maps';
import LineGraph from './component/LineGraph';
import { Card, CardContent } from '@material-ui/core';
import { sortData } from './utils';

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("www");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [caseType, setCaseType] = useState("cases");
  //Set Map data
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom,] = useState(3);

  //get countries
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https:disease.sh/v3/covid-19/countries')
        .then(res => res.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
          console.log("map=> ", data);
        });
    };
    getCountriesData();


  }, []);

  useEffect(() => {
    const getInitialCountryInfo = async () => {
      await fetch('https:disease.sh/v3/covid-19/all')
        .then(res => res.json())
        .then(data => setCountryInfo(data));
    };

    getInitialCountryInfo();

  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log(countryCode);
    setCountry(countryCode);
    const url = countryCode === 'www' ?
      'https:disease.sh/v3/covid-19/all' :
      `https:disease.sh/v3/covid-19/countries/${countryCode}`;
    //https:disease.sh/v3/covid-19/all
    //https:disease.sh/v3/covid-19/countries/[country_code]

    await fetch(url)
      .then(res => res.json())
      .then(data => {
        setCountryInfo(data);
      });
  };

  const onInfoClick = (event) => {
    setCaseType(event.target.id);
  };
  // countries.map(country => console.log(country.value));
  return (


    <div className="app">  {/*BEM naming convention*/}
      {/* left plane */}
      <div className="app__left">
        <Header countries={countries} country={country} onCountryChange={onCountryChange} />
        <div className="app__status">
          <InfoBox id="cases" onClick={onInfoClick} title="Coronovirus Cases" total={countryInfo.cases} cases={countryInfo.todayCases} />
          <InfoBox id="recovered" onClick={onInfoClick} title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered} />
          <InfoBox id="deaths" onClick={onInfoClick} title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths} />
        </div>
        <div className="app__map">
          <Maps countries={mapCountries} caseType={caseType} center={mapCenter} zoom={mapZoom} />
        </div>
      </div>
      {/* ringht plane */}
      <Card className="app__right">
        <CardContent>
          <h2>Live Country cases</h2>
          <Table tableData={tableData} />
          <h3>Live New {caseType}</h3>
          <LineGraph caseType={caseType} />
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
