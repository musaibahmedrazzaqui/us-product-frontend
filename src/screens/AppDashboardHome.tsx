import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import BigButtonSquare from "./AppDashboardHome/BigButtonSquare";
import AssetDataRectangle from "./AppDashboardHome/AssetDataRectangle";
import {
  Octicons,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import BigButtonRectangle from "./AppDashboardHome/BigButtonRectangle";
import MarketItem from "./AppDashboardHome/MarketItem";
import RingButtonSquare from "./AppDashboardHome/RingButtonSquare";
import ServiceDownModal from "../components/ServiceDownModal";
import { useEffect } from "react";
export default function AppDashboardHome({
  show,
  navigation,
  route,
  userBalances,
  refreshFunction,
  alpacaService,
  alpacaBalanceService
}: any) {
  useEffect(() => refreshFunction(), []);
  // console.log(Constants.statusBarHeight)
  return (
    
    <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={{}}>
      {/* <ServiceDownModal show={show}/> */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          paddingTop: 100,
        }}
      >
        <View style={{ alignSelf: "flex-start", paddingHorizontal: 30 }}>
          <Text
            style={{
              fontFamily: "Overpass_700Bold",
              fontSize: 40,
              color: "white",
            }}
          >
            $
            {userBalances.portfolio_value &&
              parseFloat(userBalances?.portfolio_value).toLocaleString(
                undefined,
                {
                  currency: "USD",
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }
              )}
          </Text>
          <Text
            style={{ fontFamily: "ArialNova", fontSize: 16, color: "white" }}
          >
            Portfolio Value
          </Text>
        </View>

        <View style={{ flexDirection: "column", marginTop: 70 }}>
          <AssetDataRectangle alpacaBalanceService={alpacaBalanceService} userBalance={userBalances}/>
        </View>

        <View style={{ paddingTop: 50 }}>
          <View style={{ flexDirection: "row" }}>
            <BigButtonSquare
              title="Portfolio"
              Icon={({ color }: any) => {
                return <Octicons name="briefcase" size={26} color={color} />;
              }}
              text="Track your current holdings and investment performance"
              onPress={() => navigation.navigate("My Portfolio")}
            />

            <BigButtonSquare
              title="Trade"
              Icon={({ color }: any) => {
                return <Feather name="bar-chart" size={26} color={color} />;
              }}
              text="Trade individual stocks and ETFs listed on US exchanges"
              onPress={() => navigation.navigate("Markets")}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <BigButtonSquare
              title="Invest"
              Icon={({ color }: any) => {
                return (
                  <MaterialIcons name="show-chart" size={26} color={color} />
                );
              }}
              text="Automatically invest in fully diversified portfolios"
              isInverted={true}
              onPress={() => navigation.navigate("Invest")}
            />

            <BigButtonSquare
              title="Transactions"
              Icon={({ color }: any) => {
                return (
                  <MaterialCommunityIcons
                    name="bank-outline"
                    size={26}
                    color={color}
                  />
                );
              }}
              text="History of all cash balance and trade transactions"
              onPress={() => navigation.navigate("Transactions")}
            />
          </View>
        
        </View>
        <BigButtonRectangle
          title="Market Data"
          Icon={({ color }: any) => {
            return <Octicons name="copy" size={26} color={color} />;
          }}
          text="Track major indices, stocks, bonds and other data"
          onPress={() => navigation.navigate("Markets")}
        />

        <View style={{ alignItems: "center", width: "100%" }}>
          {ChosenCompanies.map((item, index) => (
            <MarketItem
              key={index}
              {...item}
              isLast={index === ChosenCompanies.length - 1}
              alpacaService={alpacaService}
              onPress={() =>
                navigation.navigate("Stock", { stockTicker: item.stockTicker })
              }
            />
          ))}
        </View>

        <View style={{ alignSelf: "center", marginTop: 30, marginBottom: 50 }}>
          <Text
            style={{
              fontFamily: "Overpass_300Light",
              paddingHorizontal: 10,
              fontSize: 20,
            }}
          >
            Quick Actions
          </Text>
          <View style={{ width: "100%" }}>
            <View style={{ flexDirection: "row" }}>
              <RingButtonSquare
                title={"Add \nFunds"}
                Icon={({ color }: any) => {
                  return (
                    <AntDesign name="pluscircle" size={24} color={color} />
                  );
                }}
                dark={true}
                onPress={() => navigation.navigate("Add Funds")}
              />

              <RingButtonSquare
                title={"Withdraw \nFunds"}
                Icon={({ color }: any) => {
                  return (
                    <AntDesign name="minuscircle" size={24} color={color} />
                  );
                }}
                onPress={() => navigation.navigate("Withdraw")}
              />
            </View>
          </View>
        </View>
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
const ChosenCompanies = [
  {
    stockName: "Apple Inc.",
    stockTicker: "AAPL",
  },
  {
    stockName: "The Coca-Cola Company",
    stockTicker: "KO",
  },
  {
    stockName: "JPMorgan Chase & Co.",
    stockTicker: "JPM",
  },
  {
    stockName: "The Walt Disney Company",
    stockTicker: "DIS",
  },
  {
    stockName: "Procter & Gamble Company",
    stockTicker: "PG",
  },
];
