import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getColors } from "../utils/theme";

const EconomicCycleOverview = () => {
  const options = useMemo(
    () => ({
      chart: {
        type: "pie",
      },
      title: {
        text: "景氣循環全貌",
      },
      colors: getColors(0.9),
      tooltip: {
        // valueSuffix: "%",
        formatter: function () {
          return (
            "<b>" +
            this.point.name +
            "</b><br/>" +
            "2023 年 5 月" +
            "</b><br/>" +
            "2024 年 1 月" +
            "<br/>"
          );
        },
      },
      subtitle: {
        text: '探索: <a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">現在的循環週期</a>',
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: [
            {
              enabled: true,
              distance: 20,
            },
            {
              enabled: true,
              distance: -40,
              format: "{point.percentage:.1f}%",
              style: {
                fontSize: "1.2em",
                textOutline: "none",
                opacity: 0,
              },
              filter: {
                operator: ">",
                property: "percentage",
                value: 10,
              },
            },
          ],
        },
      },
      series: [
        {
          name: "循環週期",
          colorByPoint: true,
          data: [
            {
              name: "趨緩期",
              y: 25,
              // color: "yellow",
            },
            {
              name: "衰退期",
              sliced: true,
              selected: true,
              y: 25,
              // color:"green"
            },
            {
              name: "復甦期",
              y: 25,
              // color:"blue"
            },
            {
              name: "擴張期",
              y: 25,
              // color:"orange"
            },
          ],
        },
      ],
      credits: {
        enabled: false,
      },
    }),
    []
  );

  return (
    <div className="overview">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default EconomicCycleOverview;
