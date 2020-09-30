import React from 'react';
import { Line } from 'react-chartjs-2';
import numeral from "numeral"

function TimeLine({data, darkMode, selection}) {

    var backColor = darkMode ?  "rgba(0,0,0,1)" : "rgba(255,255,255,1)";
    var lineColor = darkMode ? "rgba(255,255,255,1)": "rgba(0,0,0,1)";
    var countryLabel, totalConfirmed;
    var globalLabel = [];
    var globalConfirmed = [];
    if(selection === "Worldwide"){
        for(var key in data.cases){
            globalLabel.push(key);
            globalConfirmed.push(data.cases[key]);
        }        
    }
    else{
        countryLabel =  data.map(country => (
            country.Date
        )).slice(-1*60)
        totalConfirmed = data.map(country => (
            country.Confirmed
        )).slice(-1*60)
    }
    // var totalDeaths = data.map(country => (
    //     country.Deaths
    // )).slice(-1*60)
    // var totalRecovered = data.map(country => (
    //     country.Recovered
    // )).slice(-1*60)
    const state = {
        labels: selection === "Worldwide" ? globalLabel : countryLabel,
        legend: {
            labels: {
              boxWidth: 1
            }
        },
        options: {
            scales:
            {
                yAxes: [{
                    //display:false,
                    ticks: {
                        userCallback: function(value)
                        {
                            return  (numeral(value).format('0 a'));
                        },
                    },
                }],
                xAxes: [{
                    display: false,
                }]
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItems) { 
                        return tooltipItems.yLabel;
                    }
                }
            }
        },
        datasets: [
          {
            label: 'Total Cases',
            showLine: true,
            fill : false,
            backgroundColor: backColor,
            borderColor: lineColor,
            borderWidth: 3,
            data: selection === "Worldwide" ? globalConfirmed : totalConfirmed,
            pointRadius: 0,
            pointHoverRadius: 1,
          },
        //   {
        //     showLine: true,
        //     label: 'Recovered',
        //     fill : false,
        //     backgroundColor: 'rgba(255,255,255,1)',
        //     borderColor: 'rgba(0,128,0,1)',
        //     borderWidth: 5,
        //     data: totalRecovered,
        //     pointRadius: 0,
        //     pointHoverRadius: 1,
        //   },
        //   {
        //     showLine: true,
        //     label: 'Deaths',
        //     fill : false,
        //     backgroundColor: 'rgba(255,255,255,1)',
        //     borderColor: 'rgba(255,0,0,1)',
        //     borderWidth: 5,
        //     data: totalDeaths,
        //     pointRadius: 0,
        //     pointHoverRadius: 1,
        //   }
        ]
      }
    return (
        <div className="trend-chart">
            <h6 style={{textAlign:'center'}}>Trend (Last 60 days)</h6>
            <Line 
               data={state}
               options={state.options}
            />
        </div>
    )
}

export default TimeLine;