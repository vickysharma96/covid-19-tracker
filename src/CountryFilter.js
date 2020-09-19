import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import './CountryFilter.css'


function CountryFilter({countryDataForDropDown, dataChange}){
    const [searchName,setSearchName] = useState("")

    const countryFilterList = (e) => {
        setSearchName(e.target.value)
    }

    const results = !searchName 
        ? countryDataForDropDown 
        : countryDataForDropDown.filter(country => 
            country.Country_Region.toLowerCase().includes(searchName.toLowerCase())
            );


    return(
        <>
        <DropdownButton value={countryDataForDropDown.Code} className='dropdownButton' id="dropdown-info-button" title={"Select Country"}>
            <div className='dropdownMenu'>
                    <input className='searchCountryInput' type="text" placeholder="  Eg: Brazil..." onChange={countryFilterList} value={searchName}/>
                <Dropdown.Item onClick={dataChange} value="Worldwide">
                    Worldwide
                </Dropdown.Item>
                {results.map((country) =>(
                    <Dropdown.Item onClick={dataChange} value={country.Code}>{country.Country_Region}</Dropdown.Item>
                ))}
            </div>
        </DropdownButton>
        </>
    );
}

export default CountryFilter;