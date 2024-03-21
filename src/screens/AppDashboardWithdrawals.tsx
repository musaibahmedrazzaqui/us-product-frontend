import React, { useState } from "react";
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
} from "@expo/vector-icons";
import { AlpacaAccountsError, AppConstants } from "../../assets/AppConstants";
import BigButtonRectangle from "./AppDashboardHome/BigButtonRectangle";
import { LineChart } from "react-native-chart-kit";
import MarketItem from "./AppDashboardHome/MarketItem";
import RingButtonSquare from "./AppDashboardHome/RingButtonSquare";
import ConfigModal from "./AppDashboardInvest/ConfigModal";
import Constants from "expo-constants";
import ResponseModal from "../components/ResponseModal";
import Slider from "@react-native-community/slider";
import AlpacaService from "../../api/lib/AlpacaService";

export default function AppDashboardWithdrawals({
  navigation,
  setSellValue,
  account_id,
  userBalances,
  alpacaService,
}: any) {
  const [showResponseModal, setResponseModal] = useState(false);
  const [availableForWithdrawal, setCashBalance] = useState(0);
  const [proportion, setProportion] = useState("");
  const [responseModalConfig, setResponseModalConfig] = useState({
    isSuccess: null,
    message: "",
    subMessage: "",
  });
  function launchResponseModal({ message, subMessage, isSuccess }: any) {
    setResponseModalConfig({
      message,
      subMessage,
      isSuccess,
    });
    setResponseModal(true);
  }

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          paddingTop: 100,
        }}
      >
        <ResponseModal
          show={showResponseModal}
          closeModal={() => setResponseModal(false)}
          {...responseModalConfig}
          onClose={() => {
            setSellValue(proportion);
          }}
        />

        <View style={{ alignSelf: "flex-start", paddingHorizontal: 30 }}>
          <Text
            style={{
              fontFamily: "Overpass_700Bold",
              fontSize: 40,
              color: "white",
            }}
          >
            $
            {userBalances.cash_withdrawable &&
              parseFloat(userBalances?.cash_withdrawable).toLocaleString(
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
            Available for withdrawal
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 6,
            marginTop: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 9,
            elevation: 5,
            width: "95%",
          }}
        >
          <View
            style={{
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
                  fontSize: 16,
                  color: "#1C1939",
                }}
              >
                Withdraw your cash
              </Text>
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 0,
              borderBottomColor: "rgba(151,151,151,0.2)",
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
                  fontSize: 14,
                  color: "#8692A6",
                }}
              >
                Choose how much do you want to withdraw
              </Text>
            </View>
          </View>
          <TextInput
  style={{
    width: "90%",
    height: 64,
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 6,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 20,
  }}
  keyboardType="numeric"
  onChangeText={(val) => {
    const cleanedValue = val.replace(/[^0-9.]/g, '');
    console.log(cleanedValue)
    console.log(`VAL:`, val, typeof(val));
    if (cleanedValue.split(".").length > 2) {
      return;
    }
    if (cleanedValue === "") {
      setProportion(""); // Set proportion to an mpty string for better control
    } else {
      setProportion(cleanedValue);
    }
    try {
      if (parseFloat(cleanedValue) > parseFloat(userBalances.cash_withdrawable)) {
        setProportion(userBalances.cash_withdrawable.toString());
      }
    } catch (e) {}
  }}
  value={proportion}
/>

          {/* <TextInput
            style={{
              width: "90%",
              height: 64,
              borderWidth: 1,
              alignSelf: "center",
              borderRadius: 6,
              borderColor: "#ddd",
              padding: 10,
              marginBottom: 20,
            }}
            keyboardType="numeric"
            onChangeText={(val) => {

							console.log(`VAL:`, val, typeof(val));

              if (val.split(".").length > 2) {
								console.log(`REMOVED DECIMAL`);
                return;
              }
              if(val==""){
                val=""
                setProportion("")
              }
							if (val in ["N","Na", "NaN", "nan", "Nan"]) {
                console.log("inside if")
								setProportion(0)
								val = "0"
							}
              setProportion(val);
              try {
                if (parseFloat(val) > parseFloat(userBalances.cash_withdrawable)) {
                  setProportion(userBalances.cash_withdrawable);
                }
              } catch (e) {}
            }}
            value={`${proportion}`}
            // value={(proportion).toLocaleString() + '%'}
            // editable={false}
          /> */}
          {/* <Slider
  style={{width:'90%', height: 40, alignSelf:'center', marginBottom:20}}
  minimumValue={0}
  maximumValue={100}
  step={1}
  value={proportion}
  onValueChange={cb=>setProportion(cb)}
  minimumTrackTintColor="#004DBC"
//   maximumTrackTintColor="#004DBC"
  thumbImage={require('../../assets/images/slider_icon.png')} 
/> */}

          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "rgba(151,151,151,0.2)",
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#004DBC",
              borderBottomStartRadius: 6,
              borderBottomEndRadius: 6,
            }}
            onPress={() =>
              alpacaService
                .withdrawCash(proportion)
                .then((cb: any) => {
                  launchResponseModal({
                    message: `Your withdrawal request of USD ${proportion} has been placed successfully.`,
                    subMessage:
                      "We’ve sent you a confirmation email. Please check your inbox.",
                    isSuccess: true,
                  });
                })
                .catch((err: any) => {
                  launchResponseModal(AlpacaAccountsError(err.getErrorMsg(),err.getStatusCode(),'withdrawal').GenericErrorResponse);
                })
            }
          >
            <Text
              style={{ fontFamily: "ArialNova", fontSize: 16, color: "white" }}
            >
              Withdraw Now
            </Text>
            <Ionicons name="ios-arrow-forward" size={24} color="white" />
          </TouchableOpacity>
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
                title={"Invest \nNow"}
                Icon={({ color }: any) => {
                  return (
                    <MaterialIcons name="show-chart" size={26} color={color} />
                  );
                }}
                dark={true}
                onPress={() => navigation.navigate("Invest")}
              />

              <RingButtonSquare
                title={"Add \nFunds"}
                Icon={({ color }: any) => {
                  return (
                    <AntDesign name="pluscircle" size={24} color={color} />
                  );
                }}
                onPress={() => navigation.navigate("Add Funds")}
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
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
