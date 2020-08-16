import React from "react";
import { Circle,Popup } from "react-leaflet";
import numeral from "numeral";
import "./utils.css";

const caseTypeColors = {
    cases:{
        hex: "#cc1034",
        rgb: "rgb(204,16,52)",
        half_op: "rgba(204, 16,52, 0.5)",
        multiplier: 800,
    },
    recovered:{
        hex: "#7dd71d",
        rgb: "rgb(125,215,29)",
        half_op: "rgba(125,215,29, 0.5)",
        multiplier: 1200,
    },
    deaths:{
        hex: "#fb4443",
        rgb: "rgb(251,68,67)",
        half_op: "rgba(251,68,67, 0.5)",
        multiplier: 2000,
    },
}

export const sortData = (data) =>{
    const sortedData = [...data];
    sortedData.sort((a,b) =>{
        if(a.cases > b.cases){
            return -1;
        }else{
            return 1;
        }
    });
    return sortedData;
};

export const buildChartData = (data, caseType) =>{
    const chartData = []
    let lastDataPoint;

    for(let date in data.cases ){
        if(lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[caseType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[caseType][date];
    }
    return chartData;
};

export const showDataOnMap = (countries, caseType="cases") =>
    countries.map(country =>(
        <Circle
            centre={[country.countryInfo.lat, country.countryInfo.long]}
            color={caseTypeColors[caseType].hex}
            fillColor={caseTypeColors[caseType].hex}
            fillOpacity={0.4}
            radius={
                Math.sqrt(country[caseType])* caseTypeColors[caseType].multiplier
            }
        >
            <Popup>
                <div className="info-container">
                    <div className="info-flag"
                        style={{backgroundImage:`url(${country.countryInfo.flag})`}}
                    ></div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-comfirmed">
                        Cases:{numeral(country.cases).format("0,0")}
                    </div>
                    <div className="info-recovered">
                        Cases:{numeral(country.recovered).format("0,0")}
                    </div>
                    <div className="info-deaths">
                        Cases:{numeral(country.deaths).format("0,0")}
                    </div>
                </div>
            </Popup>
        </Circle>
    ));
