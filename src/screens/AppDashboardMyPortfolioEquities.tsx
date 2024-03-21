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
  TouchableWithoutFeedback,
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

import { UserPostion } from "../Interfaces/UserPositionInterface";
import { StockDictionary } from "../Interfaces/StockDictionaryInterface";

import ResponseModal from "../components/ResponseModal";

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

export default function AppDashboardMyPortfolioEquities({
  navigation,
  userPositions,
  stockDictionary,
  resetPositions,
  userBalances,
  alpacaService,
  isSubscribed,
  portfolioid,
  miscValues,
  alpacaBalanceService,
}: {
  navigation: any;
  userPositions: UserPostion[];
  stockDictionary: StockDictionary[];
  resetPositions: any;
  userBalances: any;
  alpacaService: any;
  isSubscribed:any;
  portfolioid:any;
  miscValues: any;
  alpacaBalanceService :any;
}) {
  const [viewData, setViewData] = useState(false);
  const [portfolioDetails,setPortfolioDetails]=useState({})
  const [showResponseModal, setResponseModal] = useState(false)
  const [responseModalConfig, setResponseModalConfig] = useState({
    isSuccess : null,
    message : "",
    subMessage : ""
})
  useEffect(() => {
    if(portfolioid!=null){
      console.log(portfolioid)
      alpacaService.fetchPortfolioName(portfolioid).then(cb=>setPortfolioDetails(cb.data))
    }
    
   
    resetPositions();
  }, []);
  const [selectedCategory, setCategory] = useState<any>("");

  function getStockFromSymbol(symbol: string) {
    if (stockDictionary) {
      return stockDictionary.filter((cb: any) => cb.symbol === symbol)[0]?.name;
    }
    return "";
  }
  const handleUnsubscribe = () => {
    // Handle unsubscribe logic
    alpacaService.unsubscribeFromPortfolio().then(cb=>{
      console.log(cb);
      if(cb!=undefined){
        launchResponseModal({message: 'Your unsubscription request has been received successfully', subMessage:'Please reload the app for the changes to reflect. E-mail us at help@elphinstone.us for any queries or concerns', isSuccess: true})
      }else{
        launchResponseModal({message: 'Your unsubscription request could not be processed at the moment', subMessage:'Please try again in a few minutes or e-mail us at help@elphinstone.us if the error persists.', isSuccess: false})}
      
      })
    
    
  };
  function launchResponseModal({message, subMessage, isSuccess} : any) {
    setResponseModalConfig({
        message,
        subMessage,
        isSuccess
    })
    setResponseModal(true)
}
  setTimeout(() => setViewData(true), 1000);

  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "transparent",
          paddingTop: 100,
        }}
      >
      <ResponseModal show={showResponseModal} closeModal={()=>setResponseModal(false)} {...responseModalConfig} />
      
        <View style={{ borderRadius: 6, height: 401 - 100, width: "100%" }}>
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
              Total Portfolio Value
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            width: Dimensions.get("window").width * 0.8,
            height: 200,
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
              height: "100%",
              borderBottomColor: "#97979744",
              borderBottomWidth: 0,
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
            {isSubscribed==false ?  <>
              <Text
                style={{
                  fontFamily: "Overpass_700Bold",
                  paddingBottom: 10,
                }}
              >
                You are currently not subscribed to a portfolio!
              </Text>
              </>: 
              (<><Text
                style={{
                  fontFamily: "Overpass_700Bold",
                  paddingBottom: 10,
                }}
              >
                You are subscribed to a portfolio! {'\n'} Portfolio Type: {portfolioDetails.portfoliotype}{'\n'} Portfolio Name: {portfolioDetails.portfolioname}
              </Text>
             {/* //<Button style={{color:'#004DBC',paddingBottom:5}} onPress={()=>alpacaService.unsubscribeFromPortfolio()} title="Unsubscribe"/> */}
             <TouchableOpacity style={{ backgroundColor: "#004DBC",padding: 10,borderRadius: 5,marginLeft:20,marginBottom:10,alignItems:'center'}}
              onPress={handleUnsubscribe}>
                  <Text style={{fontFamily: "Overpass_700Bold",
                  color: "white",
                  }}>Unsubscribe</Text>
              </TouchableOpacity></>
             )}
            
              <Text
                style={{
                  fontFamily: "ArialNova",
                  color: "#1E293BCC",
                  paddingBottom: 10,
                }}
              >
                Equity portfolio value in PKR
              </Text>
              <Text
                style={{
                  fontFamily: "Overpass_700Bold",
                  fontSize: 24,
                }}
              >
                {(
                  miscValues.USDPKR *
                  (userBalances.portfolio_value
                    ? parseFloat(userBalances?.portfolio_value)
                    : 0)
                ).toLocaleString(undefined, {
                  currency: "USD",
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
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
          Stocks & ETFs
        </Text>
        {viewData &&
          userPositions.map((cb) => (
            <PortfolioItem
              onPress={() =>
                navigation.navigate("Stock", {
                  stockTicker: cb.symbol,
                })
              }
              stockName={getStockFromSymbol(cb.symbol)}
              stockTicker={cb.symbol}
              qty={cb.qty}
              value={(parseFloat(cb.current_price) * parseFloat(cb.qty))
                .toFixed(2)
                .toLocaleString()}
              key={cb.symbol}
              ldp={parseFloat(cb.current_price) - parseFloat(cb.lastday_price)}
            />
          ))}

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

function PortfolioItem({
  stockTicker,
  stockName,
  data,
  qty,
  value,
  isLast,
  ldp,
  onPress,
}: any) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          width: "95%",
          height: 100,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          borderBottomWidth: isLast ? 0 : 1,
          borderBottomColor: "rgba(151,151,151,0.2)",
          paddingHorizontal: 10,
          paddingRight: 30,
        }}
      >
        <View style={{ width: "50%" }}>
          <Text style={{ fontFamily: "Overpass_600SemiBold", fontSize: 16 }}>
            {stockTicker}
          </Text>
          <Text
            style={{
              fontFamily: "ArialNova",
              fontSize: 12,
              zIndex: 2,
            }}
          >
            {stockName}
          </Text>
        </View>
        <View style={{ width: "30%", alignItems: "flex-end" }}>
          <Text
            style={{
              fontFamily: "Overpass_600SemiBold",
              fontSize: 16,
            }}
          >
            <Text style={{ color: ldp > 0 ? `#44D94C` : "red" }}>$ </Text>{" "}
            {value}
          </Text>
          <Text
            style={{
              fontFamily: "Overpass_600SemiBold",
              color: ldp > 0 ? `#44D94C` : "red",
            }}
          >
            <Feather
              name={ldp > 0 ? "arrow-up" : "arrow-down"}
              size={16}
              color={ldp > 0 ? `#44D94C` : "red"}
            />

            {(ldp * parseInt(qty)).toFixed(2)}
          </Text>
          <Text
            style={{
              fontFamily: "ArialNova",
              zIndex: 2,
              fontSize: 12,
              color: "#888",
              marginVertical: 2,
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            No of shares:{" "}
            {parseFloat(qty).toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
