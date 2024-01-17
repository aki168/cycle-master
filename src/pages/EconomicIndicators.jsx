import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./EconomicIndicators.css";

const EconomicIndicators = () => {
  const options = useMemo(
    () => ({
      chart: {
        type: "areaspline",
      },
      title: {
        text: "指標探測中心",
        align: "left",
      },
      subtitle: {
        text: 'Source: <a href="https://www.ssb.no/jord-skog-jakt-og-fiskeri/jakt" target="_blank">SSB</a>',
        align: "left",
      },
      legend: {
        layout: "vertical",
        align: "left",
        verticalAlign: "top",
        x: 120,
        y: 70,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      },
      xAxis: {
        plotBands: [
          {
            // Highlight the two last years
            from: 2000,
            to: 2004,
            color: "rgba(68, 10, 213, .2)",
          },
          {
            // Highlight the two last years
            from: 2004,
            to: 2010,
            color: "rgba(681, 170, 213, .2)",
          },
          {
            // Highlight the two last years
            from: 2010,
            to: 2013,
            color: "rgba(681, 170, 213, .2)",
          },
          {
            // Highlight the two last years
            from: 2013,
            to: 2020,
            color: "rgba(0, 170, 213, .2)",
          },
          {
            // Highlight the two last years
            from: 2016,
            to: 2020,
            color: "rgba(1, 170, 213, .2)",
          },
        ],
      },
      yAxis: {
        title: {
          text: "Quantity",
        },
      },
      tooltip: {
        shared: true,
        headerFormat: "<b>Hunting season starting autumn {point.x}</b><br>",
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        series: {
          pointStart: 2000,
        },
        areaspline: {
          fillOpacity: 0.5,
        },
      },
      series: [
        {
          name: "Moose",
          data: [
            38000, 37300, 37892, 38564, 36770, 36026, 34978, 35657, 35620,
            35971, 36409, 36435, 34643, 34956, 33199, 31136, 30835, 31611,
            30666, 30319, 31766,
          ],
        },
        {
          name: "Deer",
          data: [
            22534, 23599, 24533, 25195, 25896, 27635, 29173, 32646, 35686,
            37709, 39143, 36829, 35031, 36202, 35140, 33718, 37773, 42556,
            43820, 46445, 50048,
          ],
        },
      ],
    }),
    []
  );
  return (
    <div id="indicators">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default EconomicIndicators;
