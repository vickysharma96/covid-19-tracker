import React from 'react';
import { Table, Card } from 'react-bootstrap';
import './MainData.css'

function MainData({ data = [], selection, stateEmpty, darkMode }) {

    const display = (selection === 'Worldwide' ? 'Country' : 'State')
    // console.log(`${selection} : ${stateEmpty} DATA ${data.length}`)
    return data.length ? 
    (
        <Table striped responsive variant={darkMode ? "dark" : "light"}>
            <thead >
                <tr className='tableTitle'>
                    <th>{display}</th>
                    <th>Confirmed</th>
                    <th>Active</th>
                    <th>Recovered</th>
                    <th>Deaths</th>
                </tr>
            </thead>
            <tbody >
                {data.map((country) => (
                    <tr className='tableBody'>
                        <td>
                            {selection === 'Worldwide' ? country.Country_Region : country.Province_State}
                        </td>
                        <td>
                            {country.Confirmed.toLocaleString('en-US')}
                            {<h6><b>(+{country.NewConfirmed})</b></h6>}
                        </td>
                        <td>
                            {country.Active.toLocaleString('en-US')}
                        </td>
                        <td>
                            {country.Recovered.toLocaleString('en-US') + "   (" + (parseInt((country.Recovered / country.Confirmed) * 100)) + "%)"}
                            {<h6><b>(+{country.NewRecovered})</b></h6>}
                        </td>
                        <td>
                            {country.Deaths.toLocaleString('en-US') + "   (" + (parseInt((country.Deaths / country.Confirmed) * 100)) + "%)"}
                            {<h6><b>(+{country.NewDeaths})</b></h6>}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    ):<Card>
    <Card.Body className={darkMode ? "dark-mode" : "light-mode"}><h3 >State Data not available</h3></Card.Body>
  </Card>;
}

export default MainData;