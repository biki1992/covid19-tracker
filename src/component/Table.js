import React from 'react';
import '../css/Table.css';

function Table({ tableData }) {
    // console.log(tableData);
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Active cases</th>
                        <th>Reovered</th>
                        <th>Deaths</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map(({ country, cases, countryInfo,recovered, deaths }) => (
                        countryInfo?.iso3 !== null && (
                        <tr key={countryInfo.iso3}>
                            <td>{country}</td>
                            <td><strong style={{color:"#cc1034"}}>{cases}</strong></td>
                            <td><strong style={{color:"#7dd71d"}}>{recovered}</strong></td>
                            <td><strong style={{color:"#fb4443"}}>{recovered}</strong></td>
                        </tr>
                        )
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
