import { useMemo, useState } from "react";
// import dayjs from "dayjs";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./EconomicIndicators.css";
import {
  Select,
  Tag,
  HStack,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";

const EconomicIndicators = () => {
  const [selectedItems, setSelectedItems] = useState([]);
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
        text: '觀測各項指標數據, 以預測未來走勢',
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
        // formatter: function (point) {
        //   return dayjs(point).format("YYYY-MM-DD")
        // },
        plotBands: [
          {
            from: 2000,
            to: 2004,
            color: "rgba(68, 10, 213, .2)",
          },
          {
            from: 2004,
            to: 2013,
            color: "rgba(681, 170, 213, .2)",
          },
          {
            from: 2013,
            to: 2020,
            color: "rgba(0, 170, 213, .2)",
          },
          {
            from: 2016,
            to: 2020,
            color: "rgba(1, 170, 213, .2)",
          },
        ],
      },
      yAxis: {
        title: {
          text: "指數",
        },
      },
      tooltip: {
        shared: true,
        headerFormat: "<b>{point.x}</b><br>",
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
          name: "台灣-景氣對策信號綜合分數-月",
          data: [
            38, 37, 37, 38, 36, 36, 31, 35, 13,
            35, 36, 36, 34, 34, 33, 31, 30, 13,
            30, 30, 31,
          ],
        },
        {
          name: "台灣-失業率-月",
          data: [
            22, 23, 24, 25, 25, 27, 29, 32, 32,
            37, 39, 36, 35, 36, 35, 33, 37, 42,
            43, 46, 50,
          ],
        },
      ],
    }),
    []
  );
  const factors = {
    EA1101: "台灣-景氣對策信號綜合分數-月",
    EB0101: "台灣-領先指標綜合指數-月",
    EB0103: "台灣-落後指標綜合指數-月",
    EB0104: "台灣-落後指標不含趨勢指數-月",
    EB0105: "台灣-領先指標不含趨勢指數-月",
    EB0302: "台灣-製造業採購經理人指數(PMI)-月(季節調整)",
    EB04: "台灣-非製造業經理人指數(NMI)-月",
    EC0101: "台灣-同時指標綜合指數-月",
    EC0102: "台灣-同時指標不含趨勢指數-月",
    LA07: "台灣-失業率-月",
  };
  return (
    <div id="indicators">
      <Select
        bg="purple.500"
        borderColor="purple.500"
        color="white"
        placeholder="加入指標"
        onChange={(e) => {
          setSelectedItems([...selectedItems, e.target.value]);
        }}
      >
        {Object.keys(factors).map((key) => {
          return (
            <option key={key} value={key}>
              {factors[key]}
            </option>
          );
        })}
      </Select>
      <HStack spacing={4} paddingY={4} minHeight={"80px"} flexWrap={"wrap"}>
        {selectedItems.map((itemKey) => (
          <Tag
            size={"md"}
            key={itemKey}
            borderRadius="full"
            colorScheme="purple"
            variant="outline"
          >
            <TagLabel>{factors[itemKey]}</TagLabel>
            <TagCloseButton
              onClick={() => {
                setSelectedItems((prevItems) => {
                  return prevItems.filter((item) => item !== itemKey);
                });
              }}
            />
          </Tag>
        ))}
      </HStack>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default EconomicIndicators;
