import React from 'react';
import { Table } from 'react-bootstrap';
import './MainData.css'

function MainData({ data , selection, stateEmpty}) {

  const display = (selection === 'Worldwide' ? 'Country' : 'State')
  console.log(`${selection} : ${stateEmpty}`)
  return (
    <Table striped responsive>
        <thead >
            <tr className='tableTitle'>
                <th>{display}</th>
                <th>Total Confirmed</th>
                <th>Active Cases</th>
                <th>Recovered</th>
                <th>Deaths</th>
            </tr>
        </thead>
        <tbody >
            {data.map((country) => (
                <tr className='tableBody'>
                    <td>
                        {selection === 'Worldwide' ? country.Country_Region : ( stateEmpty === true ? `No state level data available for ${country.Country_Region}` : country.Province_State)}
                    </td>
                    <td>
                        {stateEmpty === false ? country.Confirmed.toLocaleString('en-IN') : "No data available"}
                        {<h6><b>(+{country.NewConfirmed})</b></h6>}
                    </td>
                    <td>
                        {stateEmpty === false ? country.Active.toLocaleString('en-IN') : "No data available"}
                    </td>
                    <td>
                        {stateEmpty === false ? country.Recovered.toLocaleString('en-IN') + "   (" + (parseInt((country.Recovered/country.Confirmed)*100)) + "%)": "No data available"}
                        {<h6><b>(+{country.NewRecovered})</b></h6>}
                    </td>
                    <td>
                        {stateEmpty === false ? country.Deaths.toLocaleString('en-IN') + "   (" + (parseInt((country.Deaths/country.Confirmed)*100)) + "%)" : "No data available"}
                        {<h6><b>(+{country.NewDeaths})</b></h6>}
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
  );
}

export default MainData;
