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
import Constants from "expo-constants";
import { nasdaq100, snp500, dji30 } from "../../assets/sampleIndices";
import MarketItem from "./AppDashboardHome/MarketItem";
import InvestItem from "./AppDashboardMyPortfolio/InvestmentItem";
import AlpacaService from "../../api/lib/AlpacaService";
import { UserPostion } from "../Interfaces/UserPositionInterface";
import { StockDictionary } from "../Interfaces/StockDictionaryInterface";
import ResponseModal from "../components/ResponseModal";
import { TransactionItem } from "./AppDashboardTransactions/TransactionItem";
import {
  TransferInItem,
  TransferOutItem,
} from "./AppDashboardTransactions/TransferItem";
import { AppConstants } from "../../assets/AppConstants";
import { DividendsItem } from "./AppDashboardTransactions/DividendsItem";

function convertDateFormat(datetime: any) {
  const date = new Date(datetime);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const dateString = date.toLocaleDateString("en-US", options as any);
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dateString}`;
}

export default function AppDashboardMyTransactions({
  navigation,
  account_id,
  userPositions,
  stockDictionary,
  userBalances,
  alpacaService,
  alpacaBrokerAPIService,
  refreshFunction,
  miscValues,
}: {
  navigation: any;
  account_id?: string;
  userPositions: UserPostion[];
  stockDictionary: StockDictionary[];
  userBalances: any;
  refreshFunction: any;
  alpacaService: AlpacaService;
  alpacaBrokerAPIService: any;
  miscValues: any;
}) {
  const [showResponseModal, setResponseModal] = useState(false);
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

  const [selectedCategory, setCategory] = useState<any>("Transactions");
  const [transferCategory, setTransferCategory] = useState<any>("in");
  const [transactionsObject, setTransactionsObject] = useState<any>([]);
  const [dividendsObject, setDividendsObject] = useState<any>([]);
  const [transefersInList, setTransfersInList] = useState<any>([]);
  const [transefersOutList, setTransfersOutList] = useState<any>([]);
  const [corporateActions, setCorporateActions] = useState<any>([]);
  useEffect(() => {
    alpacaService
      .getTransactionHistory()
      .then((cb) => setTransactionsObject(cb));
  }, []);

  useEffect(() => {
    alpacaService
      .getAccountActivites()
      .then((cb) => setDividendsObject(cb))
      .catch((err) => console.log(`ERROR WHILE GETTING ACTIVITIES: `, err))
    console.log(`ACTIVIITES: `, dividendsObject);

    // setDividendsObject([
    //   {
    //       "id": "20230614122106570::2e138408-eded-43a2-ad9f-73b0a863311b",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-06-14T16:21:06.570424Z",
    //       "type": "fill",
    //       "price": "61.028",
    //       "qty": "0.463556072",
    //       "side": "buy",
    //       "symbol": "ILCG",
    //       "leaves_qty": "0",
    //       "order_id": "49247e3c-9217-4461-9875-977b77a879f6",
    //       "cum_qty": "0.463556072",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230614122106192::3c83016a-4869-4938-9e36-fe5702cb3bcb",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-06-14T16:21:06.192959Z",
    //       "type": "fill",
    //       "price": "110.172",
    //       "qty": "0.271568339",
    //       "side": "sell",
    //       "symbol": "SHV",
    //       "leaves_qty": "0",
    //       "order_id": "343c5502-4c7a-4dbe-a2bc-0995751f33fc",
    //       "cum_qty": "0.271568339",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230614122105678::7445b471-07c7-4c0a-8e5c-a842c8934b14",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-06-14T16:21:05.678653Z",
    //       "type": "fill",
    //       "price": "95.916",
    //       "qty": "0.31510384",
    //       "side": "buy",
    //       "symbol": "IUSG",
    //       "leaves_qty": "0",
    //       "order_id": "5c5fccbc-606c-4fc3-9a12-7ab8c8ebc141",
    //       "cum_qty": "0.31510384",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230614122104923::91e085ae-ee9e-489b-b8f7-36c2b5c37cdf",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-06-14T16:21:04.923257Z",
    //       "type": "fill",
    //       "price": "99.842",
    //       "qty": "0.299710195",
    //       "side": "sell",
    //       "symbol": "GBIL",
    //       "leaves_qty": "0",
    //       "order_id": "3c84001e-3f13-4b90-9acd-c2f5a739c998",
    //       "cum_qty": "0.299710195",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230614122104904::2ee3a733-b0ac-45fb-a93f-5632bd57ea17",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-06-14T16:21:04.904391Z",
    //       "type": "fill",
    //       "price": "96.508",
    //       "qty": "0.316617275",
    //       "side": "buy",
    //       "symbol": "ITOT",
    //       "leaves_qty": "0",
    //       "order_id": "b06853f1-8e35-404c-b836-375960dca6dd",
    //       "cum_qty": "0.316617275",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230614122104536::1fee53eb-e990-4479-baee-90865c29e7f3",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-06-14T16:21:04.536435Z",
    //       "type": "fill",
    //       "price": "50.422",
    //       "qty": "0.59365691",
    //       "side": "sell",
    //       "symbol": "USFR",
    //       "leaves_qty": "0",
    //       "order_id": "37869083-2356-43b5-bb57-b637bd28d024",
    //       "cum_qty": "0.59365691",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230614122104115::0ad46c5b-ca8f-484a-9163-6b69588a8c90",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-06-14T16:21:04.115433Z",
    //       "type": "fill",
    //       "price": "60.224",
    //       "qty": "0.507656416",
    //       "side": "buy",
    //       "symbol": "ILCB",
    //       "leaves_qty": "0",
    //       "order_id": "7e3eae0e-8103-4397-b7b9-000724b1adb9",
    //       "cum_qty": "0.507656416",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230614122103787::752e26e4-6c7c-471c-9c87-12c96899de8d",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-06-14T16:21:03.787777Z",
    //       "type": "fill",
    //       "price": "50.532",
    //       "qty": "0.592422807",
    //       "side": "sell",
    //       "symbol": "TFLO",
    //       "leaves_qty": "0",
    //       "order_id": "96a8098d-de23-4b84-a760-805e2d04834e",
    //       "cum_qty": "0.592422807",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230614122103768::947932f4-ac48-488c-b629-6e73a351c042",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-06-14T16:21:03.768323Z",
    //       "type": "fill",
    //       "price": "439.006",
    //       "qty": "0.070096764",
    //       "side": "buy",
    //       "symbol": "IVV",
    //       "leaves_qty": "0",
    //       "order_id": "daa81c26-7d7a-470a-9f88-e71f03d8f671",
    //       "cum_qty": "0.070096764",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230614122103046::7c52bd1a-31fb-40c1-adf7-15db783e46f3",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-06-14T16:21:03.04684Z",
    //       "type": "fill",
    //       "price": "91.582",
    //       "qty": "0.326959434",
    //       "side": "sell",
    //       "symbol": "BIL",
    //       "leaves_qty": "0",
    //       "order_id": "7bcb5e66-0968-47f0-a44a-032b80a7ddf5",
    //       "cum_qty": "0.326959434",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230613000000000::fb64533e-c3da-412c-ab8d-c953c3be3b87",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIVNRA",
    //       "date": "2023-06-13",
    //       "net_amount": "-0.08",
    //       "description": "DIV tax withholding on $0.28 at 30% for tax country PAK; w8w9: w8",
    //       "symbol": "ITOT",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230613000000000::f21da9fd-9673-45ed-a4ef-f0f14a44ab83",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIVNRA",
    //       "date": "2023-06-13",
    //       "net_amount": "-0.06",
    //       "description": "DIV tax withholding on $0.22 at 30% for tax country PAK; w8w9: w8",
    //       "symbol": "IUSG",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230613000000000::c6e81fb0-5b6b-49d9-af97-63fb4f786477",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIV",
    //       "date": "2023-06-13",
    //       "net_amount": "0.27",
    //       "description": "Cash DIV @ 0.171762, Pos QTY: 1.586107672, Rec Date: 2023-06-08",
    //       "symbol": "ILCB",
    //       "per_share_amount": "0.171762",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230613000000000::b73f569f-31f0-4dcd-807a-74ab4fb2eb33",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIV",
    //       "date": "2023-06-13",
    //       "net_amount": "0.28",
    //       "description": "Cash DIV @ 0.282666, Pos QTY: 0.991497036, Rec Date: 2023-06-08",
    //       "symbol": "ITOT",
    //       "per_share_amount": "0.282666",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230613000000000::b1543c4b-2f20-4717-b651-ecb0fdd851bb",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIVNRA",
    //       "date": "2023-06-13",
    //       "net_amount": "-0.08",
    //       "description": "DIV tax withholding on $0.29 at 30% for tax country PAK; w8w9: w8",
    //       "symbol": "IVV",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230613000000000::a1473ba5-cdf2-4b63-8aaf-ba96e1de0402",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIVNRA",
    //       "date": "2023-06-13",
    //       "net_amount": "-0.08",
    //       "description": "DIV tax withholding on $0.27 at 30% for tax country PAK; w8w9: w8",
    //       "symbol": "ILCB",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230613000000000::93869b3b-7e18-4bdb-8c23-0945704cd2fc",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIV",
    //       "date": "2023-06-13",
    //       "net_amount": "0.22",
    //       "description": "Cash DIV @ 0.219709, Pos QTY: 1.001755576, Rec Date: 2023-06-08",
    //       "symbol": "IUSG",
    //       "per_share_amount": "0.219709",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230613000000000::4f2cb4f3-9996-4a27-a75d-2c5c1cda3e77",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIV",
    //       "date": "2023-06-13",
    //       "net_amount": "0.29",
    //       "description": "Cash DIV @ 1.338569, Pos QTY: 0.217354788, Rec Date: 2023-06-08",
    //       "symbol": "IVV",
    //       "per_share_amount": "1.338569",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230613000000000::148a786a-5ee3-4850-808d-3c0d122724e3",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIVNRA",
    //       "date": "2023-06-13",
    //       "net_amount": "-0.03",
    //       "description": "DIV tax withholding on $0.13 at 30% for tax country PAK; w8w9: w8",
    //       "symbol": "ILCG",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230613000000000::04961d3c-6264-466e-b7dd-52b8252fc7e3",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIV",
    //       "date": "2023-06-13",
    //       "net_amount": "0.13",
    //       "description": "Cash DIV @ 0.083647, Pos QTY: 1.599612757, Rec Date: 2023-06-08",
    //       "symbol": "ILCG",
    //       "per_share_amount": "0.083647",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230608113858838::067227cf-d55e-49a1-936f-5a2ebfaeb70e",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-06-08T15:38:58.838304Z",
    //       "type": "fill",
    //       "price": "58.792",
    //       "qty": "1.016740372",
    //       "side": "buy",
    //       "symbol": "ILCB",
    //       "leaves_qty": "0",
    //       "order_id": "1c70a569-1be7-49b0-9acc-76968aab5aa4",
    //       "cum_qty": "1.016740372",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230608113858231::a896b0a4-5026-4330-8357-95670fd0816d",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-06-08T15:38:58.23157Z",
    //       "type": "fill",
    //       "price": "94.318",
    //       "qty": "0.63377298",
    //       "side": "buy",
    //       "symbol": "ITOT",
    //       "leaves_qty": "0",
    //       "order_id": "a344ed63-1a73-4540-aba7-3fcbfb5ac88b",
    //       "cum_qty": "0.63377298",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230608113857942::2193b01d-9e6c-4d8c-9e68-d26b1b25a126",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-06-08T15:38:57.942265Z",
    //       "type": "fill",
    //       "price": "428.716",
    //       "qty": "0.139430765",
    //       "side": "buy",
    //       "symbol": "IVV",
    //       "leaves_qty": "0",
    //       "order_id": "39e797a6-1d91-4491-9777-9f12b41ba78c",
    //       "cum_qty": "0.139430765",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230608113857456::8b05372c-ec2e-4971-86e4-782cb34a4a4e",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-06-08T15:38:57.456437Z",
    //       "type": "fill",
    //       "price": "93.818",
    //       "qty": "0.637150653",
    //       "side": "buy",
    //       "symbol": "IUSG",
    //       "leaves_qty": "0",
    //       "order_id": "d926b58a-195a-4f3d-bdce-d49bd8adbc9d",
    //       "cum_qty": "0.637150653",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230608113857050::dbfa6366-f01a-4c08-87c1-46ad8d83f714",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-06-08T15:38:57.050797Z",
    //       "type": "fill",
    //       "price": "59.288",
    //       "qty": "1.008234381",
    //       "side": "buy",
    //       "symbol": "ILCG",
    //       "leaves_qty": "0",
    //       "order_id": "f5a12aad-0dd2-4d70-b873-2f868ab57568",
    //       "cum_qty": "1.008234381",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230608000000000::4c951254-2ba4-498a-9318-98a6babe5802",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "JNLC",
    //       "date": "2023-06-08",
    //       "net_amount": "300",
    //       "description": "ID: a9fa7281-4ed4-4a32-8154-bfcf257f19fe - transaction_id: f469b3ea-3ef2-4cfe-9025-9e82865505af-15-06-61-08-06-2023-lw4ho, type: \"DEPOSIT\"",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230607000000000::fd38ccd7-ee0b-4111-b0b6-dbadf4d241da",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIVNRA",
    //       "date": "2023-06-07",
    //       "net_amount": "-0.03",
    //       "description": "DIV tax withholding on $0.13 at 30% for tax country PAK; w8w9: w8",
    //       "symbol": "SHV",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230607000000000::f2de3ec9-5547-409f-bbe1-e543d96c0965",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIV",
    //       "date": "2023-06-07",
    //       "net_amount": "0.13",
    //       "description": "Cash DIV @ 0.219305, Pos QTY: 0.592422807, Rec Date: 2023-06-02",
    //       "symbol": "TFLO",
    //       "per_share_amount": "0.219305",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230607000000000::c7cb249a-2d92-4e16-9c62-8e99bada2726",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIVNRA",
    //       "date": "2023-06-07",
    //       "net_amount": "-0.03",
    //       "description": "DIV tax withholding on $0.12 at 30% for tax country PAK; w8w9: w8",
    //       "symbol": "BIL",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230607000000000::9474aa1a-c23f-4948-8120-c9f27cc2b668",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIV",
    //       "date": "2023-06-07",
    //       "net_amount": "0.12",
    //       "description": "Cash DIV @ 0.38727, Pos QTY: 0.299710195, Rec Date: 2023-06-02",
    //       "symbol": "GBIL",
    //       "per_share_amount": "0.38727",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230607000000000::9122b915-91a7-4c49-a5bd-cd7c24c40457",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIVNRA",
    //       "date": "2023-06-07",
    //       "net_amount": "-0.03",
    //       "description": "DIV tax withholding on $0.12 at 30% for tax country PAK; w8w9: w8",
    //       "symbol": "GBIL",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230607000000000::63cfb133-caf8-443f-85ef-dc22436b961e",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIV",
    //       "date": "2023-06-07",
    //       "net_amount": "0.13",
    //       "description": "Cash DIV @ 0.481759, Pos QTY: 0.271568339, Rec Date: 2023-06-02",
    //       "symbol": "SHV",
    //       "per_share_amount": "0.481759",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230607000000000::50d717c9-6570-45b1-88fb-e7cd93a6d484",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIVNRA",
    //       "date": "2023-06-07",
    //       "net_amount": "-0.03",
    //       "description": "DIV tax withholding on $0.13 at 30% for tax country PAK; w8w9: w8",
    //       "symbol": "TFLO",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230607000000000::4e93e497-3752-4858-84c2-5a33cece42fb",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIV",
    //       "date": "2023-06-07",
    //       "net_amount": "0.12",
    //       "description": "Cash DIV @ 0.370699, Pos QTY: 0.326959434, Rec Date: 2023-06-02",
    //       "symbol": "BIL",
    //       "per_share_amount": "0.370699",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230530000000000::b958e9e9-5b16-4c01-aaef-adc33b9ae3f1",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIVNRA",
    //       "date": "2023-05-30",
    //       "net_amount": "-0.03",
    //       "description": "DIV tax withholding on $0.13 at 30% for tax country PAK; w8w9: w8",
    //       "symbol": "USFR",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230530000000000::31baf7bb-2789-4f90-9c8c-e2b1297d3857",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIV",
    //       "date": "2023-05-30",
    //       "net_amount": "0.13",
    //       "description": "Cash DIV @ 0.219, Pos QTY: 0.59365691, Rec Date: 2023-05-25",
    //       "symbol": "USFR",
    //       "per_share_amount": "0.219",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230510120657707::5c32d7a2-1fbd-4171-bbff-9cef2b531e0f",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:06:57.707709Z",
    //       "type": "fill",
    //       "price": "173.132",
    //       "qty": "0.007253823",
    //       "side": "sell",
    //       "symbol": "AAPL",
    //       "leaves_qty": "0",
    //       "order_id": "879f4596-39e3-420c-adc0-b716062f509b",
    //       "cum_qty": "0.007253823",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120657349::fe95852b-ea91-4008-9cc1-bcea288c9bbc",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:06:57.349006Z",
    //       "type": "fill",
    //       "price": "50.398",
    //       "qty": "0.297690384",
    //       "side": "buy",
    //       "symbol": "USFR",
    //       "leaves_qty": "0",
    //       "order_id": "9a99157c-ee21-4f37-89c3-b90c8d80b1b5",
    //       "cum_qty": "0.297690384",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120656648::76a68b88-a40c-489f-8eb1-b72d28862866",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:06:56.64804Z",
    //       "type": "fill",
    //       "price": "50.508",
    //       "qty": "0.297275679",
    //       "side": "buy",
    //       "symbol": "TFLO",
    //       "leaves_qty": "0",
    //       "order_id": "d7f2e4e1-4cde-4580-8ff7-75b9bff7a1da",
    //       "cum_qty": "0.297275679",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120656173::5129a891-6121-4aaa-8a39-c83bd3e3a97e",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:06:56.173494Z",
    //       "type": "fill",
    //       "price": "62.492",
    //       "qty": "0.478583393",
    //       "side": "sell",
    //       "symbol": "O",
    //       "leaves_qty": "0",
    //       "order_id": "897efbf5-64ec-4404-8bf3-365c3ef10e78",
    //       "cum_qty": "0.478583393",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120655870::900dc49b-651c-4f52-87bd-dce60af72961",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:06:55.87015Z",
    //       "type": "fill",
    //       "price": "110.178",
    //       "qty": "0.136351177",
    //       "side": "buy",
    //       "symbol": "SHV",
    //       "leaves_qty": "0",
    //       "order_id": "cb13dc77-4f26-4db5-853c-baf80779ac02",
    //       "cum_qty": "0.136351177",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120655515::0e001370-968d-4b0d-8eaa-e156193578e9",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:06:55.515526Z",
    //       "type": "fill",
    //       "price": "99.828",
    //       "qty": "0.150516889",
    //       "side": "buy",
    //       "symbol": "GBIL",
    //       "leaves_qty": "0",
    //       "order_id": "6a6d8c3e-bff1-4619-8287-58fc2605280b",
    //       "cum_qty": "0.150516889",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120655123::e419f7b3-0892-489c-b100-dd46dffd1cc9",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:06:55.123352Z",
    //       "type": "fill",
    //       "price": "64.722",
    //       "qty": "0.465044179",
    //       "side": "sell",
    //       "symbol": "SHOP",
    //       "leaves_qty": "0",
    //       "order_id": "13a7b836-4440-422e-8614-3c4585b8b05d",
    //       "cum_qty": "0.465044179",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120654368::0fcd2515-cbb3-4b7a-afba-cb3276f12e81",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:06:54.368218Z",
    //       "type": "fill",
    //       "price": "56.106",
    //       "qty": "0.786172601",
    //       "side": "buy",
    //       "symbol": "ILCG",
    //       "leaves_qty": "0",
    //       "order_id": "93cf6173-28a9-44e0-9d0a-7462421d951f",
    //       "cum_qty": "0.786172601",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120653728::021a944d-e95e-4f80-96b7-e4d2c9a04817",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:06:53.728054Z",
    //       "type": "fill",
    //       "price": "168.114",
    //       "qty": "0.237925291",
    //       "side": "sell",
    //       "symbol": "TSLA",
    //       "leaves_qty": "0",
    //       "order_id": "4c3132a7-cbb6-4e0e-ad8a-f50dc9574060",
    //       "cum_qty": "0.237925291",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120653067::1094a0f2-92e3-4a38-9a91-01d858018685",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:06:53.067664Z",
    //       "type": "fill",
    //       "price": "91.508",
    //       "qty": "0.16425012",
    //       "side": "buy",
    //       "symbol": "BIL",
    //       "leaves_qty": "0",
    //       "order_id": "9513cbee-e9ec-4921-8859-76cf93b135d9",
    //       "cum_qty": "0.16425012",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120652432::3e1cfc2e-0c36-4563-a79a-1806a9b3dde3",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:06:52.432123Z",
    //       "type": "fill",
    //       "price": "89.604",
    //       "qty": "0.49941074",
    //       "side": "buy",
    //       "symbol": "IUSG",
    //       "leaves_qty": "0",
    //       "order_id": "67c7a2ba-1fc8-41b1-93ee-a7e018031635",
    //       "cum_qty": "0.49941074",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120651803::6a2d49bb-b08f-4389-9c89-a8a3d4822922",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:06:51.803366Z",
    //       "type": "fill",
    //       "price": "56.542",
    //       "qty": "0.794218457",
    //       "side": "buy",
    //       "symbol": "ILCB",
    //       "leaves_qty": "0",
    //       "order_id": "725e4ddd-4845-4641-88da-5982d5eee7d4",
    //       "cum_qty": "0.794218457",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120651409::ebc6148c-5060-477f-95f4-a72a5465c1ff",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:06:51.409619Z",
    //       "type": "fill",
    //       "price": "412.974",
    //       "qty": "0.108962791",
    //       "side": "buy",
    //       "symbol": "IVV",
    //       "leaves_qty": "0",
    //       "order_id": "bc87840f-a924-49f3-a81d-dddc1bc4f8c7",
    //       "cum_qty": "0.108962791",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120651039::7fe711bc-8937-4618-91b3-1bc6f4384259",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:06:51.039559Z",
    //       "type": "fill",
    //       "price": "90.538",
    //       "qty": "0.497934568",
    //       "side": "buy",
    //       "symbol": "ITOT",
    //       "leaves_qty": "0",
    //       "order_id": "bb08d279-808c-4697-8a6c-af7620407862",
    //       "cum_qty": "0.497934568",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120429686::c3e118d5-a740-4de2-bee4-a2c4e5b9c61d",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:04:29.68693Z",
    //       "type": "fill",
    //       "price": "167.876",
    //       "qty": "0.237925291",
    //       "side": "buy",
    //       "symbol": "TSLA",
    //       "leaves_qty": "0",
    //       "order_id": "b0beb0e7-a29e-4b89-bfe7-58a8eec32767",
    //       "cum_qty": "0.237925291",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120204675::94d7c9dd-b121-42ac-abc2-a8784bb668ae",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:02:04.675536Z",
    //       "type": "fill",
    //       "price": "64.506",
    //       "qty": "0.465044179",
    //       "side": "buy",
    //       "symbol": "SHOP",
    //       "leaves_qty": "0",
    //       "order_id": "b771c627-48c4-4bc2-bfc1-c4f16288eb6b",
    //       "cum_qty": "0.465044179",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510120124842::8694130c-31bb-4acb-b769-279de00baf45",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-05-10T16:01:24.842555Z",
    //       "type": "fill",
    //       "price": "62.618",
    //       "qty": "0.478583393",
    //       "side": "buy",
    //       "symbol": "O",
    //       "leaves_qty": "0",
    //       "order_id": "4432d870-303d-430b-bb94-75ae63d74d2b",
    //       "cum_qty": "0.478583393",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230510000000000::40e15a87-3f0f-46c3-a667-08515592d6ef",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "JNLC",
    //       "date": "2023-05-10",
    //       "net_amount": "300",
    //       "description": "ID: f6d86a6c-e769-458b-94c3-c0adc5703cb6 - transaction_id: f469b3ea-3ef2-4cfe-9025-9e82865505af-13-05-54-10-05-2023-KS64l, type: \"DEPOSIT\"",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230505000000000::ebbd0f8a-e90a-4832-8611-87ae62eb9244",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIV",
    //       "date": "2023-05-05",
    //       "net_amount": "0.05",
    //       "description": "Cash DIV @ 0.397518, Pos QTY: 0.135217162, Rec Date: 2023-05-02",
    //       "symbol": "SHV",
    //       "per_share_amount": "0.397518",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230505000000000::dd523f24-4695-493f-87bf-e0c36676f78d",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIV",
    //       "date": "2023-05-05",
    //       "net_amount": "0.06",
    //       "description": "Cash DIV @ 0.3775, Pos QTY: 0.149193306, Rec Date: 2023-05-02",
    //       "symbol": "GBIL",
    //       "per_share_amount": "0.3775",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230505000000000::cc86846a-4c4e-4b65-a53b-1d5cbae67146",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIVNRA",
    //       "date": "2023-05-05",
    //       "net_amount": "-0.01",
    //       "description": "DIV tax withholding on $0.06 at 30% for tax country PAK; w8w9: w8",
    //       "symbol": "BIL",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230505000000000::a5b754c8-941d-423a-8d23-8e763043ac14",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIV",
    //       "date": "2023-05-05",
    //       "net_amount": "0.06",
    //       "description": "Cash DIV @ 0.201107, Pos QTY: 0.295147128, Rec Date: 2023-05-02",
    //       "symbol": "TFLO",
    //       "per_share_amount": "0.201107",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230505000000000::98cf89b4-14a1-4159-9d8d-9139fed1492d",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIVNRA",
    //       "date": "2023-05-05",
    //       "net_amount": "-0.01",
    //       "description": "DIV tax withholding on $0.06 at 30% for tax country PAK; w8w9: w8",
    //       "symbol": "TFLO",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230505000000000::4fa59519-bca1-4b87-a2f6-8e85f41e9d13",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIVNRA",
    //       "date": "2023-05-05",
    //       "net_amount": "-0.01",
    //       "description": "DIV tax withholding on $0.06 at 30% for tax country PAK; w8w9: w8",
    //       "symbol": "GBIL",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230505000000000::4b115c2a-d095-4c07-9482-452cad85ebdb",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIV",
    //       "date": "2023-05-05",
    //       "net_amount": "0.06",
    //       "description": "Cash DIV @ 0.353155, Pos QTY: 0.162709314, Rec Date: 2023-05-02",
    //       "symbol": "BIL",
    //       "per_share_amount": "0.353155",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230505000000000::23fc8657-2577-4960-8552-7d47141c1d43",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIVNRA",
    //       "date": "2023-05-05",
    //       "net_amount": "-0.01",
    //       "description": "DIV tax withholding on $0.05 at 30% for tax country PAK; w8w9: w8",
    //       "symbol": "SHV",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230427000000000::c2b612c9-116f-49ce-b11b-9f65b0207d2d",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIVNRA",
    //       "date": "2023-04-27",
    //       "net_amount": "-0.01",
    //       "description": "DIV tax withholding on $0.06 at 30% for tax country PAK; w8w9: w8",
    //       "symbol": "USFR",
    //       "status": "executed"
    //   },
    //   {
    //       "id": "20230427000000000::1a1b8b6d-0cb5-458e-bce7-bac02b56d040",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "DIV",
    //       "date": "2023-04-27",
    //       "net_amount": "0.06",
    //       "description": "Cash DIV @ 0.205, Pos QTY: 0.295966526, Rec Date: 2023-04-25",
    //       "symbol": "USFR",
    //       "per_share_amount": "0.205",
    //       "status": "correct"
    //   },
    //   {
    //       "id": "20230421102116653::5d5dcead-e385-4a19-8bc2-7523f8838ad4",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-04-21T14:21:16.653632Z",
    //       "type": "fill",
    //       "price": "165.536",
    //       "qty": "0.007253823",
    //       "side": "buy",
    //       "symbol": "AAPL",
    //       "leaves_qty": "0",
    //       "order_id": "3ec0a65f-eb05-4ae8-895b-9940a4cebd4f",
    //       "cum_qty": "0.007253823",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230421101204994::5f112710-5f50-47d8-ab0d-3f413e22f08e",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-04-21T14:12:04.994885Z",
    //       "type": "fill",
    //       "price": "50.568",
    //       "qty": "0.295147128",
    //       "side": "buy",
    //       "symbol": "TFLO",
    //       "leaves_qty": "0",
    //       "order_id": "39811162-4f50-487f-8091-c9902631c11d",
    //       "cum_qty": "0.295147128",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230421101204498::429da239-e462-4119-9a6f-9402a98ae6d1",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-04-21T14:12:04.498893Z",
    //       "type": "fill",
    //       "price": "50.428",
    //       "qty": "0.295966526",
    //       "side": "buy",
    //       "symbol": "USFR",
    //       "leaves_qty": "0",
    //       "order_id": "d23bd362-dc41-4f36-bf86-56f922e7c962",
    //       "cum_qty": "0.295966526",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230421101203868::f5c490d4-5cc3-4c86-afef-911e94f23425",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-04-21T14:12:03.868689Z",
    //       "type": "fill",
    //       "price": "110.378",
    //       "qty": "0.135217162",
    //       "side": "buy",
    //       "symbol": "SHV",
    //       "leaves_qty": "0",
    //       "order_id": "a7f4379e-55a7-4219-864a-be0b09c2242a",
    //       "cum_qty": "0.135217162",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230421101203571::7adf241f-38d7-41bb-99a3-0be79ae8b2ed",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-04-21T14:12:03.571307Z",
    //       "type": "fill",
    //       "price": "100.038",
    //       "qty": "0.149193306",
    //       "side": "buy",
    //       "symbol": "GBIL",
    //       "leaves_qty": "0",
    //       "order_id": "afb8d004-ec3f-4209-9ef3-9682fc73a58f",
    //       "cum_qty": "0.149193306",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230421101202833::d469ded3-8c70-4d1d-9d8f-3a65585e6af8",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-04-21T14:12:02.833903Z",
    //       "type": "fill",
    //       "price": "91.728",
    //       "qty": "0.162709314",
    //       "side": "buy",
    //       "symbol": "BIL",
    //       "leaves_qty": "0",
    //       "order_id": "311afb1d-e46a-4c7d-85b5-0f8eedc778e4",
    //       "cum_qty": "0.162709314",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230421101202283::13d47db4-50ea-40bf-8450-ccde60243ac9",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-04-21T14:12:02.283337Z",
    //       "type": "fill",
    //       "price": "56.542",
    //       "qty": "0.791889215",
    //       "side": "buy",
    //       "symbol": "ILCB",
    //       "leaves_qty": "0",
    //       "order_id": "fc3e0219-7e5d-4cc0-83bb-05f0f3a140ad",
    //       "cum_qty": "0.791889215",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230421101201543::1eb09fd9-a596-4e15-99a2-9fbfce733e0c",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-04-21T14:12:01.543707Z",
    //       "type": "fill",
    //       "price": "90.718",
    //       "qty": "0.493562468",
    //       "side": "buy",
    //       "symbol": "ITOT",
    //       "leaves_qty": "0",
    //       "order_id": "7c1e2d35-a389-412d-bfe4-3e88aefd2bad",
    //       "cum_qty": "0.493562468",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230421101201151::670b5a5a-a775-4adf-9881-1461dccd9a2f",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-04-21T14:12:01.151272Z",
    //       "type": "fill",
    //       "price": "413.084",
    //       "qty": "0.108391997",
    //       "side": "buy",
    //       "symbol": "IVV",
    //       "leaves_qty": "0",
    //       "order_id": "16e225a5-2364-4ff1-8c9f-095d449dc45e",
    //       "cum_qty": "0.108391997",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230421101200629::7d2ebe69-c45d-4e30-b1d4-68889d546a3c",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-04-21T14:12:00.629661Z",
    //       "type": "fill",
    //       "price": "89.132",
    //       "qty": "0.502344836",
    //       "side": "buy",
    //       "symbol": "IUSG",
    //       "leaves_qty": "0",
    //       "order_id": "91eb5da4-9f54-487a-aa08-1f50f8c61ac4",
    //       "cum_qty": "0.502344836",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230421101200026::af87dbbd-e2f3-4bd3-9e56-ee686ba6e237",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "FILL",
    //       "transaction_time": "2023-04-21T14:12:00.026395Z",
    //       "type": "fill",
    //       "price": "55.044",
    //       "qty": "0.813440156",
    //       "side": "buy",
    //       "symbol": "ILCG",
    //       "leaves_qty": "0",
    //       "order_id": "f3c8cff1-09c1-4eb9-ae16-c9e2b7310064",
    //       "cum_qty": "0.813440156",
    //       "order_status": "filled"
    //   },
    //   {
    //       "id": "20230420000000000::676cb6cb-c3ff-4b25-a103-2efcd635ee48",
    //       "account_id": "f469b3ea-3ef2-4cfe-9025-9e82865505af",
    //       "activity_type": "JNLC",
    //       "date": "2023-04-20",
    //       "net_amount": "300",
    //       "description": "ID: da35a7d4-7a3a-4ddc-871e-2327c85a2350 - ",
    //       "status": "executed"
    //   }
    // ])

    console.log(dividendsObject);
  }, []);

  useEffect(() => {
    alpacaService
      .getCorporateActions()
      .then((cb) => setCorporateActions(cb)) 
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    
  })

  function getStockFromSymbol(symbol: string) {
    if (stockDictionary) {
      return stockDictionary.filter((cb: any) => cb.symbol === symbol)[0]?.name;
    }
    return "";
  }

  useEffect(() => {
    alpacaService.getJournalsIn().then((cb) => setTransfersInList(cb));
    alpacaService.getJournalsOuts().then((cb) => setTransfersOutList(cb));
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      <ResponseModal
        show={showResponseModal}
        closeModal={() => setResponseModal(false)}
        {...responseModalConfig}
        onClose={refreshFunction}
      />

      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "transparent",
          paddingTop: 100,
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
              <View>
                <Text
                  style={{
                    fontFamily: "ArialNova",
                    color: "#1E293BCC",
                    paddingBottom: 10,
                    fontSize: 11,
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
        </View>

        <ScrollView
          bounces={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View
            style={{
              width: "100%",
              paddingHorizontal: 30,
              flexDirection: "row",
              marginTop: 30,
              marginBottom: 10,
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => setCategory("Transactions")}
            >
              <View
                style={{
                  borderBottomColor: AppConstants.loginHeaderBlue,
                  borderBottomWidth:
                    selectedCategory === "Transactions" ? 2 : 0,
                }}
              >
                <Text style={{ fontFamily: "Overpass_700Bold", fontSize: 16 }}>
                  Transactions
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ width: 20 }} />

            <TouchableWithoutFeedback
              onPress={() => setCategory("Dividends")}
            >
              <View
                style={{
                  borderBottomColor: AppConstants.loginHeaderBlue,
                  borderBottomWidth:
                    selectedCategory === "Dividends" ? 2 : 0,
                }}
              >
                <Text style={{ fontFamily: "Overpass_700Bold", fontSize: 16 }}>
                Dividends
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ width: 20 }} />

            <TouchableWithoutFeedback onPress={() => setCategory("Transfers")}>
              <View
                style={{
                  borderBottomColor: AppConstants.loginHeaderBlue,
                  borderBottomWidth: selectedCategory === "Transfers" ? 2 : 0,
                }}
              >
                <Text style={{ fontFamily: "Overpass_700Bold", fontSize: 16 }}>
                  Transfers
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <View style={{ width: 20 }} />

            <TouchableWithoutFeedback
              onPress={() => setCategory("Corporate Transactions")}
            >
              <View
                style={{
                  borderBottomColor: AppConstants.loginHeaderBlue,
                  borderBottomWidth:
                    selectedCategory === "Corporate Transactions" ? 2 : 0,
                }}
              >
                <Text style={{ fontFamily: "Overpass_700Bold", fontSize: 16 }}>
                  Corporate Actions
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>

        {selectedCategory === "Transfers" && (
          <View
            style={{
              width: "100%",
              paddingHorizontal: 30,
              flexDirection: "row",
              marginVertical: 5,
              marginBottom: 30,
            }}
          >
            <TouchableWithoutFeedback onPress={() => setTransferCategory("in")}>
              <View
                style={{
                  borderBottomColor: AppConstants.loginHeaderBlue,
                  borderBottomWidth: transferCategory === "in" ? 1 : 0,
                }}
              >
                <Text style={{ fontFamily: "Overpass_700Bold", fontSize: 12 }}>
                  Transfers In
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ width: 20 }} />

            <TouchableWithoutFeedback
              onPress={() => setTransferCategory("out")}
            >
              <View
                style={{
                  borderBottomColor: AppConstants.loginHeaderBlue,
                  borderBottomWidth: transferCategory === "out" ? 1 : 0,
                }}
              >
                <Text style={{ fontFamily: "Overpass_700Bold", fontSize: 12 }}>
                  Transfers Out
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
        
        {selectedCategory === "Dividends" &&
          dividendsObject.map((cb: any) => {
            if (cb.activity_type == "DIVNRA" || cb.activity_type == "DIV") {

              return (
                <DividendsItem
                  {...cb}
                  name={getStockFromSymbol(cb.symbol)}
                  key={cb.id}
                />
              )
            }
          })}

        {selectedCategory === "Transactions" &&
          transactionsObject.map((cb: any) => (
            <TransactionItem
              {...cb}
              name={getStockFromSymbol(cb.symbol)}
              key={cb.client_order_id}
              cancelOrderFunction={() =>
                alpacaService
                  .cancelPendingOrder(cb.id)
                  .then((cb: any) => {
                    launchResponseModal({
                      message: `Your order cancellation request has been submitted successfully`,
                      subMessage:
                        "We’ve sent you a confirmation email. Please check your inbox.",
                      isSuccess: true,
                    });
                  })
                  .catch((cb: any) => {
                    console.log(cb);
                    launchResponseModal(AppConstants.GenericErrorResponse);
                  })
              }
            />
          ))}

        {selectedCategory === "Transfers" &&
          transferCategory === "in" &&
          transefersInList.map((transferObject: any) => (
            <TransferInItem {...transferObject} key={transferObject.id} />
          ))}

        {selectedCategory === "Transfers" &&
          transferCategory === "out" &&
          transefersOutList.map((transferObject: any) => (
            <TransferOutItem {...transferObject} key={transferObject.id} />
          ))}

        {selectedCategory === "Corporate Transactions" &&
          corporateActions.map((item: any, index: any) => (
            <CorporateActionItem {...item} key={index} />
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
const ActionTypeMap = {
  dividend: {
    cash: "Cash Dividend",
    stock: "Stock Dividend",
  },
  merger: {
    merger_completion: "Merger",
  },
  split: {
    reverse_split: "Reverse Split",
    stock_split: "Stock Split",
    unit_split: "Unit Split",
  },
  spinoff: {
    spinoff: "Spinoff",
  },
};

const CorporateActionItem = (props: any) => {
  const {
    ca_type,
    declaration_date,
    record_date,
    payable_date,
    ca_sub_type,
    initiating_symbol,
    target_symbol,
    new_rate,
    old_rate,
    effective_date,
    cash,
  } = props;
  if (ca_sub_type === "merger_update") {
    return null;
  }
  return (
    <View
      style={{
        width: Dimensions.get("window").width * 0.9,
        borderRadius: 6,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 9,
        elevation: 5,
        marginVertical: 10,
        // overflow: 'hidden'
      }}
    >
      <View style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "Overpass_700Bold", fontSize: 18 }}>
            {ActionTypeMap[ca_type][ca_sub_type]}
          </Text>
          <View>
            <Text style={{ fontFamily: "ArialNova", fontSize: 12 }}>
              {record_date && convertDateFormat(record_date)}
            </Text>
          </View>
        </View>
        <Text style={{ fontFamily: "Overpass_400Regular" }}>
          {ca_type === "dividend" &&
            ca_sub_type === "cash" &&
            `Cash dividend ${cash} per share`}
          {ca_type === "dividend" &&
            ca_sub_type === "stock" &&
            `Stock dividend ${((new_rate - old_rate) * 100).toLocaleString(
              undefined,
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            )}% per share`}
          {ca_type === "merger" &&
            ca_sub_type === "merger_completion" &&
            `${initiating_symbol} will acquire ${target_symbol}`}
          {ca_type === "split" &&
            ca_sub_type === "reverse_split" &&
            `Stock reverse split ${old_rate}:${new_rate}`}
          {ca_type === "split" &&
            ca_sub_type === "stock_split" &&
            `Stock split ${old_rate}:${new_rate}`}
          {ca_type === "split" &&
            ca_sub_type === "unit_split" &&
            `${initiating_symbol} is splitting out ${target_symbol}`}
          {ca_type === "spinoff" &&
            ca_sub_type === "spinoff" &&
            `${initiating_symbol} will spin off ${target_symbol}`}
        </Text>
      </View>
      <View
        style={{
          padding: 20,
          justifyContent: "center",
          borderTopWidth: 0.25,
          borderColor: "#bbb",
        }}
      >
        <Text style={{ fontFamily: "ArialNova", lineHeight: 24, fontSize: 13 }}>
          {ca_type === "dividend" &&
            ca_sub_type === "cash" &&
            `Declared on ${convertDateFormat(
              declaration_date
            )} for shareholders of ${target_symbol} who own the shares on ${convertDateFormat(
              record_date
            )}, and will be paid on ${convertDateFormat(payable_date)}`}
          {ca_type === "dividend" &&
            ca_sub_type === "stock" &&
            `Declared on ${convertDateFormat(
              declaration_date
            )} for shareholders ${target_symbol} who own the shares on ${convertDateFormat(
              record_date
            )}, and will be paid on ${convertDateFormat(payable_date)}`}
          {ca_type === "merger" &&
            ca_sub_type === "merger_completion" &&
            `All shareholders of ${target_symbol} will receive ${new_rate} shares of ${initiating_symbol} for every ${old_rate} share of ${target_symbol} that they own. This transaction is expected to close on ${convertDateFormat(
              effective_date
            )}.`}
          {ca_type === "split" &&
            ca_sub_type === "reverse_split" &&
            `${target_symbol} is reducing its number of shares in a ${old_rate}:${new_rate} ratio. This change will go into effect on ${convertDateFormat(
              payable_date
            )} and will reduce your number of shares - and increase the price of the shares - accordingly. This will not directly affect that value of your shares.`}
          {ca_type === "split" &&
            ca_sub_type === "stock_split" &&
            `${target_symbol} is increasing its number of shares in a ${old_rate}:${new_rate} ratio. This change will go into effect on ${convertDateFormat(
              payable_date
            )} and will increase your number of shares - and decrease the price of the shares - accordingly. This will not directly affect that value of your shares.`}
          {ca_type === "split" &&
            ca_sub_type === "unit_split" &&
            `All shareholders of ${initiating_symbol} will receive ${new_rate} units of ${target_symbol} for every ${old_rate} share of ${initiating_symbol}. The new shares will be available on ${convertDateFormat(
              effective_date
            )}.`}
          {ca_type === "spinoff" &&
            ca_sub_type === "spinoff" &&
            `All shareholders of ${initiating_symbol} will receive ${new_rate} shares of ${target_symbol} for every ${old_rate} share of ${initiating_symbol} that they own as of ${convertDateFormat(
              record_date
            )}. The new shares will be available on ${convertDateFormat(
              payable_date
            )}.`}
        </Text>
      </View>
    </View>
  );
};
