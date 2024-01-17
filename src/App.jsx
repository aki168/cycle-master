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
  return (
    <div id="gradient">
      <div className="page-loading bg-white bg-opacity-90">
        <div
          className="page-loading-logo"
          // className=""
        >
            <img src="logo.png" alt="logo" className="w-[250px]" />
          <Text paddingY={3} fontSize={"xl"} fontWeight={"bold"} color={"purple.800"}>
            開始探索景氣循環
          </Text>
        </div>
      </div>
      <section className="bg-black bg-opacity-70 min-h-full">
        <div className="container mx-auto py-4">
          <Box padding={4}>
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="bold"
              textAlign="center"
              paddingY={6}
            >
              景氣循環全貌探測大師
            </Text>
            <Tabs isFitted variant={"unstyled"}>
              <TabList color={"white"}>
                <Tab>首頁</Tab>
                <Tab>指標探測中心</Tab>
                <Tab>商品行情觀測站</Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg={"#7928CA"}
                borderRadius="1px"
              />
              <TabPanels className="bg-white bg-opacity-35">
                <TabPanel>
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
    </div>
  );
}

export default App;
