import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { AppConstants } from "../../../assets/AppConstants";

import MiscService from "../../../api/lib/MiscService";
import ServiceDownModal from '../../components/ServiceDownModal'
import AlpacaBalanceService from "../../../api/lib/AlpacaBalanceService";
import AlpacaService from "../../../api/lib/AlpacaService";
import { color } from "@rneui/themed/dist/config";

export default function AssetDataRectangle({
  alpacaBalanceService,
  userBalance,
}: any) {
  const [miscValues, setMiscValues] = useState({ USDPKR: 272 });
  const [cash, setCashValue] = useState(0);
  const [showServiceDownModal, setShowServiceDownModal] = React.useState(false);
  useEffect(() => {
    MiscService.getUSDPKR()
      .then((cb) =>
        setMiscValues({
          ...miscValues,
          USDPKR:
            (parseFloat(cb?.data[0]?.buying) +
              parseFloat(cb?.data[0]?.selling)) /
            2,
        })
      )
      .catch((err) => console.log("USDPKR", err));

    

    alpacaBalanceService.getUserCash().then((cashAmount: any) => {
      setCashValue(cashAmount.cash);

      // Check if the status is not equal to 200 and show the modal
      if (cashAmount.statusCode != 200) {
          setShowServiceDownModal(true);
      }

      
  })
  .catch((err:any) => {
      console.log('err', err);

      // Handle error and show the modal
      setShowServiceDownModal(true);
  });


  }, []);

  const styles = StyleSheet.create({
    row_styles: {
      padding: 20,
      borderBottomWidth: 1,
      borderColor: "#979797",
    },
    bottom_row_styles: {
      padding: 20,
    },

    heading: {
      fontFamily: "ArialNova",
      fontSize: 11,
      color: "#1E293B",
      paddingBottom: 7,
      fontWeight: "300",
    },

    sub_heading: {
      fontFamily: "Overpass",
      fontWeight: "700",
      fontSize: 24,
      color: "#1E293B",
    },

    foot_note: {
      fontFamily: "ArialNova",
      fontWeight: "400",
      fontSize: 8,
      paddingTop: 5,
      color: "#8B97A8 "
    },
  });

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "white",
        width: Dimensions.get("window").width * 0.9,
        borderRadius: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 9,
        elevation: 10,
        marginTop: 20
      }}
    >
      { showServiceDownModal==true ? (<><ServiceDownModal/></>) :(<><View style={styles.row_styles}>
        <Text style={styles.heading}>Cash</Text>
        <Text style={styles.sub_heading}>${cash}</Text>
      </View>

      <View style={styles.bottom_row_styles}>
        <Text style={styles.heading}>
          Portfolio value in <Text style={{ fontWeight: "bold" }}>PKR</Text>
        </Text>
        <Text style={styles.sub_heading}>
          {(
            miscValues.USDPKR *
            (userBalance.portfolio_value
              ? parseFloat(userBalance?.portfolio_value)
              : 0)
          ).toLocaleString(undefined, {
            currency: "USD",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </Text>

        <Text style={styles.foot_note}>
          USD to PKR @ {miscValues.USDPKR}
        </Text>

      </View>
      </>)}
      
      
    </View>
  );
}
