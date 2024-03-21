import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { date } from "yup";

function convertDateFormat(datetime: any) {
  const date = new Date(datetime);
  const options = {
    day: "numeric",
    month: "short",
  };
  const dateString = date.toLocaleDateString("en-US", options as any);
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dateString}, ${timeString}`;
}

export function DividendsItem(props: any) {
  const {
    symbol,
    name,
    date,
    qty,
    filled_at,
    filled_avg_price,
    filled_qty,
    submitted_at,
    failed_at,
    activity_type,
    status,
    updated_at,
    id,
    cancelOrderFunction,
    net_amount,
  } = props;
  return (
    <View
      style={{
        width: Dimensions.get("window").width * 0.9,
        height: 120,
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
        marginVertical: 7.5,
        // overflow: 'hidden'
      }}
    >
      <View style={{ height: 20, alignItems: "flex-end" }}>
        <View
          style={{
            width: 60,
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backgroundColor: activity_type === "DIV" ? "#71DE5633" : "#3293F633",
            borderBottomStartRadius: 6,
            borderTopEndRadius: 6,
          }}
        >
          <Text style={{ fontFamily: "ArialNova", fontSize: 12, color: "#6C757D" }}>
            {activity_type === "DIV" ? "DIV" : "DIV Tax"}
          </Text>

        </View>
      </View>

      <View
        style={{
          padding: 15,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ height: "100%", justifyContent: "flex-start" }}>

          <Text style={{ fontFamily: "ArialNova", fontSize: 16 }}>
            {name?.slice(0, 9)}... /{" "}
            <Text style={{ fontSize: 10, color: "#888" }}>{symbol}</Text>
          </Text>

        </View>

        <View style={{ width: "50%", alignItems: "flex-end" }}>

      
          <Text style={{ fontFamily: "ArialNova", fontSize: 16 }}>
            Total: ${" "}
            {net_amount}
          </Text>
          

          <Text
            style={{
              fontFamily: "ArialNova",
              fontSize: 10,
              paddingVertical: 5,
              color: "#888",
            }}
          >
            {convertDateFormat(date)}
          </Text>

          {filled_at && (
            <Text
              style={{
                fontFamily: "ArialNova",
                fontSize: 10,
                color: "#21BF73",
              }}
            >
              Successfully Completed
            </Text>
          )}
					
        </View>
      </View>

    </View>
  );
}
