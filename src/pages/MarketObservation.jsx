import { useMemo, useRef } from "react";
import {
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  ListItem,
  List,
  Box,
  ListIcon,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MarketObservation = () => {
  const chartComponent = useRef({});
  const options = useMemo(() => {
    return {
      chart: {
        type: "line",
      },
      title: {
        text: "Monthly Average Temperature",
      },
      subtitle: {
        text:
          "Source: " +
          '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
          'target="_blank">Wikipedia.com</a>',
      },
      xAxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yAxis: {
        title: {
          text: "Temperature (°C)",
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },
      series: [
        {
          name: "Reggane",
          data: [
            16.0, 18.2, 23.1, 27.9, 32.2, 36.4, 39.8, 38.4, 35.5, 29.2, 22.0,
            17.8,
          ],
        },
        {
          name: "Tallinn",
          data: [
            -2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5, 2.0, -0.9,
          ],
        },
      ],
      credits: {
        enabled: false,
      },
    };
  }, []);
  const products = [
    { id: "stock", name: "股票", color: "red.500" },
    { id: "bond", name: "債券", color: "purple.500" },
    { id: "future", name: "期貨", color: "green.500" },
    { id: "estate", name: "房地產", color: "blue.500" },
    { id: "gold", name: "黃金", color: "yellow.500" },
    { id: "oil", name: "石油", color: "orange.500" },
  ];
  return (
    <div className="py-4">
      <Tabs isManual variant="enclosed" maxW={"800px"} className="mx-auto">
        <TabList color={"gray"} bg={"white"}>
          {products.map((product) => (
            <Tab
              key={product.id}
              _selected={{ color: "white", bg: product.color }}
            >
              {product.name}
            </Tab>
          ))}
        </TabList>
        <TabPanels display={"flex"} flexWrap={"wrap"}>
          {products.map((product) => (
            <TabPanel key={product.id}>
              <Text
                marginBottom={"16px"}
                fontWeight={700}
                fontSize={{ base: "xl", md: "2xl" }}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
              >
                {product.name}
              </Text>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  相關指數一：1234
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  相關指數二：5678
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  相關指數三：9012
                </ListItem>
                {/* You can also use custom icons from react-icons */}
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  相關指數四：3456
                </ListItem>
              </List>
            </TabPanel>
          ))}
          <div className="p-1">
            <HighchartsReact
              ref={chartComponent}
              highcharts={Highcharts}
              options={options}
            />
          </div>
          <div className="w-100">
            <Accordion>
              <AccordionItem>
                <h2>
                  <AccordionButton
                    _expanded={{
                      color: "white",
                      bgGradient: "linear(to-l, #7928CA, #FF0080)",
                    }}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      推薦相關 ETF 商品
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default MarketObservation;
