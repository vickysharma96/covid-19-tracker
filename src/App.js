import React, { useState, useEffect } from 'react';
import TotalStats from './TotalStats';
import CountryFilter from './CountryFilter';
import MainData from './MainData'
import './App.css';
import { Container, Row, Col, Image, Spinner } from 'react-bootstrap';
import logo from './images/virus.png'

function App() {
  const [globalData, setGlobalData] = useState({});
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [selectedName, setSelectedName] = useState("Worldwide");
  const [stateNull, setStateNull] = useState(false)
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    setLoading(true)
    fetch("https://corona.azure-api.net/summary")
    .then((response) => response.json())
    .then((data) => {
      setGlobalData(data.globalData);
      setLoading(false)
    });
  },[]);

  useEffect(()=>{
    setLoading(true)
    fetch(`https://corona.azure-api.net/summary`)
    .then((response) => response.json())
    .then((data) => {
        let newData = sortData(data.countries);
        setCountryData(newData);
        setCountries(newData)
        setLoading(false)
    });
  },[]);
  const onCountryChange = async (e) => {
    setLoading(true)
    const countryCode = e.target.innerHTML.replace(/[()]/g,'');
    setSelectedName(e.target.innerHTML)
    if (!(countryCode.localeCompare("Worldwide"))){
      fetch("https://corona.azure-api.net/summary")
      .then((response) => response.json())
      .then((data) => {
        setGlobalData(data.globalData);
        let newData = sortData(data.countries);
        setCountryData(newData);
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
    <div className="App">
      <Container>
      <header className="App-header">
        <Row>
          <Col lg={10} sm={9}>
            <h1>Covid-19 Tracker</h1>
          </Col>
          <Col lg={2} md={3} sm={1}>
            <Image src={logo} alt="" width="170px"/>
          </Col>
        </Row>
      <h6><small>Provides Covid-19 details on a Country-State level</small></h6>
      <h6><b>Last updated : {String(globalData.Last_Update).slice(0,10)}</b></h6>
      </header>
      <hr />
      <div>
        <Row>
          <Col>
            <br />
            <CountryFilter countryDataForDropDown={countries} dataChange={onCountryChange} />
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
        />}
      </div>
      <div className = 'mainData'>
        {loading ? <Spinner animation='border' style={{position:'relative',top:'50%',left:'50%'}}/> : <MainData data={countryData} selection={selectedName} stateEmpty={stateNull} loader={loading}/>}
      </div>
      </Container>
    </div>
  );
}

export default App;
