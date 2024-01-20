import { useEffect, useMemo, useState, useRef } from "react";
// import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./EconomicIndicators.css";
import {
  Select,
  Tag,
  HStack,
  TagLabel,
  TagCloseButton,
  Spinner,
} from "@chakra-ui/react";
import { fetchApiData } from "../store/apiSlice";
import { flattenData } from "../utils/format";
import NoData from "../components/NoData";
import { getColors } from "../utils/theme";

const EconomicIndicators = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [currentIndicator, setCurrentIndicator] = useState("");

  const chartComponent = useRef({});
  const indicatorDataMap = useRef({});

  const dispatch = useDispatch();
  const {
    indicatorList: { data: indicatorList },
    pickedIndicator: {
      data: pickedIndicatorData,
      loading: pickedIndicatorLoading,
    },
  } = useSelector((state) => state.api);

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
        text: "觀測各項指標數據, 以預測未來走勢",
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
        type: "datetime",
        plotBands: [
          {
            from: 1604188800000,
            to: 1619827200000,
            color: getColors(0.1)[0],
          },
          {
            from: 1619827200000,
            to: 1625097600000,
            color: getColors(0.1)[1],
          },
          {
            from: 1625097600000,
            to: 1640995200000,
            color: getColors(0.1)[2],
          },
          {
            from: 1640995200000,
            to: 1698796800000,
            color: getColors(0.1)[3],
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
      series: graphData,
    }),
    [graphData]
  );
  useEffect(() => {
    dispatch(
      fetchApiData({
        url: import.meta.env.VITE_API_URL + "get/index_ist",
        target: "indicatorList",
      })
    );
  }, [dispatch]);

  const fetchIndicatorData = (code) => {
    dispatch(
      fetchApiData({
        url: import.meta.env.VITE_API_URL + "get/index_value",
        method: "POST",
        target: "pickedIndicator",
        params: {
          code,
          start_date: "2020-11-01",
          end_date: "2023-12-01",
        },
      })
    );
  };

  useEffect(() => {
    // 標籤更新且不為空時, 取得指標資料
    if (selectedItems.length === 0) return;
    const lastSelectedItem = selectedItems.at(-1);
    fetchIndicatorData(lastSelectedItem);
  }, [selectedItems]);

  useEffect(() => {
    // 指標資料更新時, 更新圖表資料
    if (pickedIndicatorData && selectedItems.length > 0) {
      const lastSelectedItem = selectedItems.at(-1);
      indicatorDataMap.current[lastSelectedItem] = pickedIndicatorData.map(
        (item) => [item.time, item.value]
      );
      const newGraphData = selectedItems.map((code) => ({
        name: flattenData(indicatorList)[code],
        data: indicatorDataMap.current[code] || [],
      }));
      setGraphData(newGraphData);
    } else {
      setCurrentIndicator("");
      setGraphData([]);
    }
  }, [pickedIndicatorData, selectedItems, indicatorList]);
  return (
    <div id="indicators">
      <Select
        bg="purple.500"
        borderColor="purple.500"
        color="white"
        placeholder="加入指標"
        onChange={(e) => {
          if (!e.target.value) return;
          if (selectedItems.includes(e.target.value)) return;
          setCurrentIndicator(e.target.value);
          setSelectedItems([...selectedItems, e.target.value]);
        }}
        value={currentIndicator}
      >
        {indicatorList &&
          Object.keys(flattenData(indicatorList)).map((key) => {
            return (
              <option key={key} value={key}>
                {flattenData(indicatorList)[key]}
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
            <TagLabel>{flattenData(indicatorList)[itemKey]}</TagLabel>
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
      <div className="text-center">
        {graphData.length > 0 ? (
          <HighchartsReact
            ref={chartComponent}
            highcharts={Highcharts}
            options={options}
          />
        ) : pickedIndicatorLoading ? (
          <Spinner color={"purple"} size={"xl"} />
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default EconomicIndicators;
