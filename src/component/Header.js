import React from 'react';
import {
    FormControl,
    Select,
    MenuItem
} from '@material-ui/core';
import '../css/Header.css'

//https:disease.sh/v3/covid-19/countries


function Header({countries, country, onCountryChange}) {
    

    return (
        <div className="header">
            <h1>Covid19 Tracker</h1>
            <FormControl className="header__dropdown">
                <Select onChange={onCountryChange} variant="outlined" value={country}>
                    <MenuItem value="www">Worldwide</MenuItem>
                    {countries.map(country => (
                        country.value ? (
                        <MenuItem key={country.value} value={country.value}>{country.name}</MenuItem>
                        ):""
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default Header;
