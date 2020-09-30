import React, { useState, useEffect } from 'react';
import TotalStats from './TotalStats';
import CountryFilter from './CountryFilter';
import MainData from './MainData'
import './App.css';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import TimeLine from './TimeLine'

function App() {

  
  const [globalData, setGlobalData] = useState({});
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [selectedName, setSelectedName] = useState("Worldwide");
  const [stateNull, setStateNull] = useState(false)
  const [loading, setLoading] = useState(false);
  const [countryTimeline, setCountryTimeline] = useState([]);
  const [globalTimeline, setGlobalTimeline] = useState({});
  const [darkMode, setDarkMode] = useState(getInitialMode);

  // function getInitialStateNull(){
  //   const stateNullInitial = JSON.parse(localStorage.getItem('state_null'));
  //   return stateNullInitial || false;
  // }

  function getInitialMode(){
    const savedMode = JSON.parse(localStorage.getItem('dark'));
    return savedMode || false;
  }
  // function getGlobalSelection(){
  //   const savedGlobal = JSON.parse(localStorage.getItem('global'));
  //   return savedGlobal || 'Worldwide';
  // }

  // function getCountrySelection(){
  //   const savedCountry = JSON.parse(localStorage.getItem('country'));
  //   return savedCountry;
  // }
  
  // useEffect(() => {
  //   localStorage.setItem('state_null',JSON.stringify(stateNull));
  // },[stateNull])

  useEffect(() => {
    localStorage.setItem('dark',JSON.stringify(darkMode));
  },[darkMode])

  // useEffect(() => {
  //   localStorage.setItem('global',JSON.stringify(globalData));
  //   localStorage.setItem('country',JSON.stringify(countryData));
  // },[globalData,countryData])

  // useEffect(() => {
  //   fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=60")
  //   .then((response) => response.json())
  //   .then((data) => {
  //   setGlobalTimeline(data)
  //   setLoading(false)
  //   })
  // },[])
  useEffect(() => {
    setLoading(true)
    fetch("https://corona.azure-api.net/summary")
    .then((response) => response.json())
    .then((data) => {
      setGlobalData(data.globalData);
      setCountryData(sortData(data.countries));
      setCountries(data.countries)
      setLoading(false)
    });
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=60")
    .then((response) => response.json())
    .then((data) => {
    setGlobalTimeline(data)
    setLoading(false)
    })
  },[]);
  
  // useEffect(()=>{
  //   setLoading(true)
  //   fetch(`https://corona.azure-api.net/summary`)
  //   .then((response) => response.json())
  //   .then((data) => {
  //       setCountryData(sortData(data.countries));
  //       setCountries(data.countries)
  //       setLoading(false)
  //   });
  // },[]);
  const onCountryChange = (countryFromFilter) => {
    setLoading(true)
    var countryCode = countryFromFilter;
    //e.target.innerHTML.replace(/[()]/g,'');
    setSelectedName(countryCode)  
    console.log("Selected Name: " + countryCode)
    if (countryCode === "Worldwide"){
      fetch("https://corona.azure-api.net/summary")
      .then((response) => response.json())
      .then((data) => {
        setGlobalData(data.globalData);
        let newData = sortData(data.countries);
        setCountryData(newData);
        setLoading(false)
      })
      fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=60`)
        .then((response) => response.json())
        .then((data) => {
        setGlobalTimeline(data)
        setLoading(false)
      })
    }
    else{
      fetch(`https://corona.azure-api.net/country/${countryCode}`)
      .then((response) => response.json())
      .then((data) => {
      setGlobalData(data.Summary);
      let newData = sortData(data.State);
      data.State.length === 0 ?  setStateNull(true) :  setStateNull(false)
      setCountryData(newData);
      setLoading(false)
    })
    fetch(`https://api-corona.azurewebsites.net/timeline/${countryCode}`)
    .then((response) => response.json())
    .then((data) => {
      setCountryTimeline(data)
      setLoading(false)
    })
  }
}

  const sortData = (casesData) => {
    let sortedData = [...casesData]
    sortedData.sort((a,b) => {
        if(a.Confirmed > b.Confirmed){
            return -1;
        }else{
            return 1;
        }
    })
    return sortedData;
  }

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Container>
      <header className="App-header">
        <Row>
          <Col lg={10} sm={8}>
            <h1>COVID-19 Tracker</h1>
          </Col>
        </Row>
      <h6><small>Provides COVID-19 details on a Country-State level</small></h6>
      <h6><b>Last updated : {String(globalData.Last_Update).slice(0,10)}</b></h6>
      <span className="toggle">
        <input 
          checked={darkMode}
          onChange={() => setDarkMode(prevMode => !prevMode)}
          type="checkbox"
          className="checkbox"
          id="checkbox"
          style={{marginRight:'10px'}}
        />
        <label htmlFor="checkbox" />Use Dark Mode
      </span>
      </header>
      <hr />
      <div>
        <Row>
          <Col>
            <br />
            <CountryFilter countryDataForDropDown={countries} dataChange={onCountryChange} darkMode={darkMode}/>
          </Col>
        </Row>
        <hr />
        <h1 style={{textAlign:'left'}}>{`${selectedName}`}</h1>
        
        <br />
         {loading ? <Spinner animation='border' style={{position:'relative',top:'50%',left:'50%'}}/> : <TotalStats 
          totalCases={globalData.Confirmed} 
          activeCases={globalData.Active} 
          recoveredCases={globalData.Recovered} 
          deaths={globalData.Deaths}
          loader={loading}
          darkMode={darkMode}
        />}
        <br />
        {
         loading ? <Spinner animation='border' style={{position:'relative',top:'50%',left:'50%'}}/> : <TimeLine data={selectedName === "Worldwide" ? globalTimeline : countryTimeline} darkMode={darkMode} selection={selectedName}/>
        } 
      </div>
      <div className = 'mainData'>
        {loading ? <Spinner animation='border' style={{position:'relative',top:'50%',left:'50%'}}/> : <MainData data={countryData} selection={selectedName} stateEmpty={stateNull} loader={loading} darkMode={darkMode}/>}
      </div>
      <br /><br />
      </Container>
    </div>
  );
}

export default App;
