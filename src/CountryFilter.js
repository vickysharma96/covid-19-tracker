import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import './CountryFilter.css'


function CountryFilter({countryDataForDropDown, dataChange}){
    const [searchName,setSearchName] = useState("")

    const countryFilterList = (e) => {
        setSearchName(e.target.value)
    }

    var results = !searchName 
        ? countryDataForDropDown 
        : countryDataForDropDown.filter(country => 
            country.Country_Region.toLowerCase().includes(searchName.toLowerCase())
            );
    
    const dataChange2 = (e) => {
        dataChange(e.target.innerHTML.replace(/[()]/g,''));
        setSearchName("")
    };

    return(
        <>
        <DropdownButton value={countryDataForDropDown.Code} className='dropdownButton' id="dropdown-info-button" title={"Select Country"}>
            <div className="dropDownMenu">
                    <input className='searchCountryInput' type="search"  placeholder="Eg: Brazil..." onChange={countryFilterList} value={searchName}/>
                <Dropdown.Item onClick={dataChange} value="Worldwide">
                    Worldwide
                </Dropdown.Item>
                {results.map((country) =>(
                    <Dropdown.Item onClick={dataChange2} value={country.Code}>{country.Country_Region}</Dropdown.Item>
                ))}
            </div>
        </DropdownButton>
        </>
    );
}

export default CountryFilter;