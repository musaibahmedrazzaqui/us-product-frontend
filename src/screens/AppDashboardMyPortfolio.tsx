import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  Button,
  Image,
  TextInput,
} from "react-native";
import {
  Octicons,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { AppConstants } from "../../assets/AppConstants";
import BigButtonRectangle from "./AppDashboardHome/BigButtonRectangle";
import { LineChart, PieChart } from "react-native-chart-kit";
import RingButtonSquare from "./AppDashboardHome/RingButtonSquare";
import ConfigModal from "./AppDashboardInvest/ConfigModal";
import Constants from "expo-constants";

const indexNames = ["Equities", "Fixed Income", "Cash"];

const chartConfig = {
  fillShadowGradientFrom: "#3293F6",
  fillShadowGradientFromOpacity: 1,
  fillShadowGradientToOpacity: 0,
  fillShadowGradientTo: "#FFFFFF00",
  //   backgroundColor: "#e26a00",
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `#004DBC`,
  labelColor: (opacity = 1) => `black`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "0",
    strokeWidth: "0",
    // stroke: "#ffa726"
  },
  propsForBackgroundLines: {
    strokeDasharray: "",
    stroke: "#E3E3E3",
  },
  propsForLabels: {
    // fontFamily:'ArialNova'
    fontSize: 10,
    stroke: "#ccc",
    strokeWidth: 1,
  },
};

export default function AppDashboardMyPortfolio({ navigation }: any) {
  const [userPreferences, setUserPreferences] = useState({
    fundPreference: "Islamic",
    riskTolerance: "The Growth Seeker",
  });

  const [selectedCategory, setCategory] = useState<any>("");

  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "transparent",
          paddingTop: Constants.statusBarHeight + 50,
        }}
      >
        <View style={{ borderRadius: 6, height: 401 - 100, width: "100%" }}>
          <View style={{ alignSelf: "flex-start", paddingHorizontal: 30 }}>
            <Text
              style={{
                fontFamily: "Overpass_700Bold",
                fontSize: 40,
                color: "white",
              }}
            >
              $12,425
            </Text>
            <Text
              style={{ fontFamily: "ArialNova", fontSize: 16, color: "white" }}
            >
              Total Portfolio Value
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            width: Dimensions.get("window").width * 0.8,
            height: 180,
            marginTop: -120,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9,
            elevation: 5,
            borderRadius: 6,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "50%",
              borderBottomColor: "#97979744",
              borderBottomWidth: 1,
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "ArialNova",
                  color: "#1E293BCC",
                  paddingBottom: 10,
                }}
              >
                Change in portfolio
              </Text>
              <Text
                style={{
                  fontFamily: "Overpass_700Bold",
                  fontSize: 24,
                }}
              >
                $22,345
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 8, color: "#8B97A8", marginRight: 4 }}>
                  over past 1 year,{"\n"}
                  or since account opening
                </Text>
                <AntDesign name="infocirlceo" color={"#8B97A8"} />
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              height: "50%",
              borderBottomColor: "#97979744",
              borderBottomWidth: 1,
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "ArialNova",
                  color: "#1E293BCC",
                  paddingBottom: 10,
                }}
              >
                Portfolio value in PKR
              </Text>
              <Text
                style={{
                  fontFamily: "Overpass_700Bold",
                  fontSize: 24,
                }}
              >
                2,180,375
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            fontFamily: "Overpass_700Bold",
            alignSelf: "flex-start",
            paddingLeft: 30,
            marginTop: 30,
            fontSize: 16,
          }}
        >
          Total Portfolio Value
        </Text>
        <LineChart
          data={{
            labels: ["1D", "1M", "3M", "6M", "1Y", "10Y"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          withVerticalLines={false}
          // withHorizontalLines={false}
        />

        <ScrollView bounces={false} style={{ width: "100%" }} horizontal={true}>
          <View style={{ flexDirection: "row", padding: 20, height: 80 }}>
            {indexNames.map((cb) => (
              <TouchableOpacity
                key={cb}
                activeOpacity={1}
                onPress={() => {
                  selectedCategory === cb ? setCategory("") : setCategory(cb);
                }}
                style={{
                  margin: 10,
                  padding: 10,
                  backgroundColor:
                    selectedCategory === cb ? "#004DBC" : "#F5FAFF",
                  borderWidth: 0.5,
                  borderColor: "#3293F6",
                  height: "100%",
                  borderRadius: 6,
                }}
              >
                <Text
                  key={cb}
                  style={{
                    color: selectedCategory === cb ? "white" : "black",
                    fontFamily: "ArialNova",
                  }}
                >
                  {cb}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <PieChart
          data={data}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={chartConfig}
          accessor={"percentage"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
        />

        <View style={{ height: 100 }} />
      </View>

      <View style={{ zIndex: -1, position: "absolute", width: "100%" }}>
        <Image source={require("../../assets/nyse.png")} style={{}} />
        <View
          style={{
            backgroundColor: "rgba(0, 23, 139,0.8)",
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
        ></View>
      </View>
    </ScrollView>
  );
}

const NewsItem = ({ news, navigation }: any) => {
  return (
    <TouchableOpacity
      style={{
        paddingLeft: 10,
        height: 100,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
      activeOpacity={1}
      onPress={() =>
        navigation.navigate("News", {
          news_object: news,
        })
      }
    >
      <View style={{ width: "60%" }}>
        <Text style={{ fontFamily: "ArialNova" }} numberOfLines={3}>
          {news?.headline}
        </Text>
        <Text style={{ fontFamily: "ArialNova", color: "#8B97A8" }}>
          {news?.source} {" @ "}
          {new Date(news?.created_at).getHours()}:
          {new Date(news?.created_at).getMinutes()}
        </Text>
      </View>
      <Image
        source={{
          uri: news?.images[1]?.url,
        }}
        style={{
          height: 80,
          width: 80,
        }}
      />
    </TouchableOpacity>
  );
};

const data = [
  {
    name: "Equities",
    percentage: 60,
    color: "#004DBC",
    legendFontColor: "#00000061",
    legendFontSize: 12,
  },
  {
    name: "Fixed Income",
    percentage: 30,
    color: "#5388D8",
    legendFontColor: "#00000061",
    legendFontSize: 12,
  },
  {
    name: "Cash",
    percentage: 10,
    color: "#3293F6",
    legendFontColor: "#00000061",
    legendFontSize: 12,
  },
];
