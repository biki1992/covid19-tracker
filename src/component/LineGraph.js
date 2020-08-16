import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'
import { buildChartData } from '../utils';
import numeral from 'numeral';


function LineGraph({ caseType }) {
    
    const [data, setData] = useState({});
    const options = {
        legend: {
            display: false
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: 'index',
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0");
                },
            },
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    format: 'MM/DD/YY',
                    tooltipFormat: 'll',
                }
            }
            ],
            yAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    callbacks: function (value, index, values) {
                        return numeral(value).format("0a")
                    },

                },
            }],
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                .then(res => res.json())
                .then(data => {
                    console.log("data=>", data);
                    const chartData = buildChartData(data, caseType);
                    setData(chartData);
                    console.log("chart data => ", chartData);
                });
        };
        fetchData();
        console.log("data=>", data);
    }, [caseType]);

    return (
        <div className="lineGraph">
            {data?.length > 0 && (
                < Line
                    data={{
                        datasets: [{
                            backgroundColor: "rgba(204, 16, 52, 0.5)",
                            borderColor: "#cc1034",
                            data: data
                        }]

                    }}
                    options={options}
                />  
            )}
        </div >
    )
}

export default LineGraph;
