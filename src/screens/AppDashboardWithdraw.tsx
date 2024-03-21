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
} from "react-native";
import {
  Octicons,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { AppConstants } from "../../assets/AppConstants";
import BigButtonRectangle from "./AppDashboardHome/BigButtonRectangle";
import { LineChart } from "react-native-chart-kit";
import MarketItem from "./AppDashboardHome/MarketItem";
import RingButtonSquare from "./AppDashboardHome/RingButtonSquare";
import ConfigModal from "./AppDashboardInvest/ConfigModal";
import Constants from "expo-constants";
import ResponseModal from "../components/ResponseModal";
import messages from "../components/ory/ui/messages";
export default function AppDashboardWithdraw({
  navigation,
  sellValue,
  userBalances,
  alpacaService,
}: any) {
  const [showResponseModal, setResponseModal] = useState(false);
  const [sellVal, setSellVal] = useState(sellValue);
  const [availableForWithdrawal, setCashBalance] = useState(
    47749 * (sellValue / 100)
  );
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

        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 6,
            marginTop: 50,
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
              borderBottomWidth: 1,
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
                  fontSize: 11,
                  color: "#1E293BCC",
                }}
              >
                Available for withdrawal
              </Text>
              <Text
                style={{
                  fontFamily: "Overpass_700Bold",
                  fontSize: 24,
                  paddingTop: 10,
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
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
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
                  fontSize: 11,
                  color: "#8692A6",
                }}
              >
                The balance available for withdrawal can be less than the total
                cash balance when trades are awaiting settlement (typically 2
                business days after the trade is made).
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "rgba(151,151,151,0.2)",
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: AppConstants.loginHeaderBlue,
              borderBottomStartRadius: 6,
              borderBottomEndRadius: 6,
            }}
            onPress={() => navigation.navigate("Withdrawal")}
          >
            <Text
              style={{ fontFamily: "ArialNova", fontSize: 16, color: "white" }}
            >
              Withdraw now
            </Text>
            <Ionicons name="ios-arrow-forward" size={24} color="white" />
          </TouchableOpacity>
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
                Want to withdraw more?
              </Text>
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
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
                Sell some of your investments/trading positions to be able to
                withdraw more cash. {"\n\n"}(Cash will be available for
                withdrawal after 2 business days)
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "rgba(151,151,151,0.2)",
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#737A86",
              borderBottomStartRadius: 6,
              borderBottomEndRadius: 6,
            }}
            onPress={() => navigation.navigate("Sell")}
          >
            <Text
              style={{ fontFamily: "ArialNova", fontSize: 16, color: "white" }}
            >
              Sell Now
            </Text>
            <Ionicons name="ios-arrow-forward" size={24} color="white" />
          </TouchableOpacity>
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
