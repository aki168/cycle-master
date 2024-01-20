import { useDispatch, useSelector } from "react-redux";
import { START_TO_USE } from "./store/appSlice";
import EconomicCycleOverview from "./pages/EconomicCycleOverview";
import EconomicIndicators from "./pages/EconomicIndicators";
import MarketObservation from "./pages/MarketObservation";

import "./App.css";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
  TabIndicator,
} from "@chakra-ui/react";

function App() {
  const start = useSelector((state) => state.app.startToUse);
  const dispatch = useDispatch();
  return (
    <div id="gradient">
      {start ? (
        <section className="bg-black bg-opacity-70 h-dvh">
          <div className="container mx-auto py-4">
            <Box padding={4}>
              <Text
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight="bold"
                textAlign="center"
                paddingY={6}
              >
                景氣循環全貌の探測大師
              </Text>
              <Tabs isFitted variant={"unstyled"}>
                <TabList color={"gray"} bg={"white"} opacity={0.7}>
                  <Tab
                    _selected={{
                      color: "#7928CA",
                      opacity: 0.7,
                      fontWeight: 700,
                    }}
                  >
                    首頁
                  </Tab>
                  <Tab
                    _selected={{
                      color: "#7928CA",
                      opacity: 0.7,
                      fontWeight: "bold",
                    }}
                  >
                    指標探測中心
                  </Tab>
                  <Tab
                    _selected={{
                      color: "#7928CA",
                      opacity: 0.7,
                      fontWeight: "bold",
                    }}
                  >
                    商品行情觀測站
                  </Tab>
                </TabList>
                <TabIndicator
                  mt="-1.5px"
                  height="2px"
                  bg={"#7928CA"}
                  borderRadius="1px"
                />
                <TabPanels className="bg-white h-[72vh]" scrollBehavior={"smooth"} overflowY={"scroll"}>
                  <TabPanel >
                    <EconomicCycleOverview />
                  </TabPanel>
                  <TabPanel>
                    <EconomicIndicators />
                  </TabPanel>
                  <TabPanel>
                    <MarketObservation />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </div>
        </section>
      ) : (
        <div className="absolute bg-white bg-opacity-70 h-full w-full">
          <div
            className="relative top-1/4 cursor-pointer"
            onClick={() => {
              dispatch(START_TO_USE());
            }}
          >
            <img
              src="logo.png"
              alt="logo"
              className="w-[250px] mx-auto hover:opacity-80 hover:translate-x-2 hover:-translate-y-2 transition-all duration-500 ease-in-out"
            />
            <Text
              textAlign={"center"}
              paddingY={6}
              fontSize={"xl"}
              fontWeight={"bold"}
              color={"purple.800"}
            >
              點擊圖示開始探索景氣循環
            </Text>
            <Text className="max-w-[580px] mx-auto" color={"gray.600"}>
              “景氣循環描述經濟在擴張、頂峰、收縮、谷底四個階段的變動。擴張時經濟增長，頂峰後趨緩，進入收縮，最終到達谷底。利率、政策和國際貿易是影響因素。
              <br />
              了解景氣循環有助企業和政府做出適應性決策，緩解經濟波動帶來的風險。”
            </Text>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
