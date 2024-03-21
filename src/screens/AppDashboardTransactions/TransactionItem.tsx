import { View, Text, Dimensions, TouchableOpacity } from "react-native";

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

export function TransactionItem(props: any) {
  const {
    symbol,
    name,
    qty,
    filled_at,
    filled_avg_price,
    filled_qty,
    submitted_at,
    failed_at,
    side,
    status,
    updated_at,
    id,
    cancelOrderFunction,
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
            backgroundColor: side === "buy" ? "#71DE5633" : "#3293F633",
            borderBottomStartRadius: 6,
            borderTopEndRadius: 6,
          }}
        >
          <Text style={{ fontFamily: "ArialNova", fontSize: 12, color: "#6C757D" }}>
            {side}
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

          {filled_at ? (

            <Text style={{ fontSize: 10, color: "#888", marginVertical: 2 }}>
              No of Shares: {parseFloat(filled_qty).toFixed(2)}
            </Text>

          ) : (
            
            <Text style={{ fontSize: 10, color: "#888", marginVertical: 2 }}>
              No of Shares: {parseFloat(qty).toFixed(2)}
            </Text>
            
          )}

          {filled_at && (
            <Text style={{ fontSize: 10, color: "#888" }}>
              Price: $ {parseFloat(filled_avg_price).toFixed(2)}
            </Text>
          )}
        </View>

        <View style={{ width: "50%", alignItems: "flex-end" }}>
          {filled_at ? (
            <Text style={{ fontFamily: "ArialNova", fontSize: 16 }}>
              Total: ${" "}
              {(parseFloat(filled_qty) * parseFloat(filled_avg_price)).toFixed(2)}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: "ArialNova",
                fontSize: 16,
                color: status === "canceled" ? "red" : "black",
              }}
            >
              {status === "canceled" ? "Canceled" : "Pending"}
            </Text>
          )}
          <Text
            style={{
              fontFamily: "ArialNova",
              fontSize: 10,
              paddingVertical: 5,
              color: "#888",
            }}
          >
            {convertDateFormat(updated_at)}
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
					
          {[
            "new",
            "partially_filled",
            "done_for_day",
            "accepted",
            "pending_new",
            "accepted_for_bidding",
            "stopped",
            "suspended",
          ].includes(status) && (
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 100,
                borderColor: "red",
                padding: 2,
                paddingHorizontal: 7.5,
                marginTop: 5,
              }}
              onPress={cancelOrderFunction}
            >
              <Text
                style={{ fontFamily: "ArialNova", fontSize: 9, color: "red" }}
              >
                Cancel Order
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

    </View>
  );
}
