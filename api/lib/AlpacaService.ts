import axios, { AxiosError } from "axios";
import axiosClient from "../axiosWrapper";
import HttpException from "../../src/Interfaces//HttpException";
export default class AlpacaService {
  public static async getAccountId(emailId: any) {
    const res = await axiosClient.get("/v1/accounts/fetchAccountByEmail", {
      params: {
        email_address: emailId,
      },
    });
   
    return res?.data;
  }
  public account_id;

  public static async getOnfidoToken(account_id: string) {
    const res = await axiosClient.get(`/v1/onfido/getToken`, {
      params: {
        account_id: account_id,
      },
    });
    return res?.data;
  }

  public static async patchOnfidoToken(account_id: string, body: any) {
    const res = await axiosClient.patch(`/v1/onfido/patchToken`, body, {
      params: {
        account_id: account_id,
      },
    });
    return res?.data;
  }

  constructor(account_id: any) {
    this.account_id = account_id;
  }

  async getAllStocks() {
    const res = await axiosClient.get("/v1/assets/getAllAssets", {
      params: { status: "active" },
    });
    return res?.data;
  }
  async getAllPositions() {
    const res = await axiosClient.get("/v1/trading/getAllPositions", {
      params: {
        account_id: this.account_id,
      },
    });
    return res?.data;
  }
  async placePortfolioSellOrder({
    sellPercentage,
  }: {
    sellPercentage: number;
  }) {
    await this.unsubscribeFromPortfolio();
    try{
    const res = await axiosClient.post(
      "/v1/trading/sellPercentageOfPortfolio",
      {},
      {
        params: {
          account_id: this.account_id,
          percentage: sellPercentage,
        },
      }
    );
    return res?.data;}catch(e : any){
      throw new HttpException(
        e.response.data.message,
        e.response.status
      );
    }
  }



  async placeIndividualStockSellOrder({
    stockTicker,
    qty,
  }: {
    stockTicker: string;
    qty: string;
  }) {
    await this.unsubscribeFromPortfolio();
    const res = await axiosClient.post(
      "/v1/trading/createOrder",
      {
        symbol: stockTicker,
        qty: qty,
        side: "sell",
        type: "market",
        time_in_force: "day",
      },
      {
        params: {
          account_id: this.account_id,
        },
      }
    );
  }

  async placeIndividualStockOrder({
    side,
    orderType,
    stockTicker,
    qty,
    limit_price,
    stop_price,
    trail_price,
    trail_percent,
    time_in_force,
  }: {
    orderType: string;
    side: string;
    stockTicker: string;
    qty: string;
    limit_price?: string;
    stop_price?: string;
    trail_price?: string;
    trail_percent?: string;
    time_in_force: string;
  }) {
    let bodyObject;
    switch (orderType) {
      case "Market":
        bodyObject = {
          symbol: stockTicker,
          qty: qty,
          side: side,
          type: "market",
          time_in_force: time_in_force,
        };
        break;
      case "Limit Price":
        bodyObject = {
          symbol: stockTicker,
          qty: qty,
          side: side,
          type: "limit",
          time_in_force: time_in_force,
          limit_price: limit_price,
        };
        break;
      case "Stop Price":
        bodyObject = {
          symbol: stockTicker,
          qty: qty,
          side: side,
          type: "stop",
          time_in_force: time_in_force,
          stop_price: stop_price,
        };
        break;
      case "Stop-Limit Price":
        bodyObject = {
          symbol: stockTicker,
          qty: qty,
          side: side,
          type: "stop_limit",
          time_in_force: time_in_force,
          limit_price: limit_price,
          stop_price: stop_price,
        };
        break;
      case "Trailing Stop":
        if (trail_percent) {
          bodyObject = {
            symbol: stockTicker,
            qty: qty,
            side: side,
            type: "trailing_stop",
            time_in_force: time_in_force,
            trail_percent: trail_percent,
          };
        } else if (trail_price) {
          bodyObject = {
            symbol: stockTicker,
            qty: qty,
            side: side,
            type: "trailing_stop",
            time_in_force: time_in_force,
            trail_price: trail_price,
          };
        }

        break;
    }
    
    await this.unsubscribeFromPortfolio();
    try{
      const res=await axiosClient.post("/v1/trading/createOrder", bodyObject, {
        params: {
          account_id: this.account_id,
        },
      });
      console.log(res)
    }catch(e:any){
      
      throw new HttpException(
        e.response.data.message,
        e.response.status
      );
      //throw new Error(e.response.data.message, e.response.status)
    }
    
    
  }

  async unsubscribeFromPortfolio() {
    try {
      const subscription_id = (await this.getSubscriptionDetails())
        .subscription_id;
      const res = await axiosClient.delete("/v1/portfolio/unsubscribe", {
        data: {
          subscription_id,
          account_id: this.account_id,
        },
      });
      return res.data
    } catch (e:any) {
      
    //  throw new HttpException(
    //    e.data,
    //    e.status
    //  );
  }
  }
  async placeIndividualStockBuyOrder({
    stockTicker,
    qty,
    type,
  }: {
    stockTicker: string;
    qty: string | undefined;
    type: string;
  }) {
    await this.unsubscribeFromPortfolio();
    const orderTypes = {
      Market: "market",
      "Limit Price": "limit",
    };
    const res = await axiosClient.post(
      "/v1/trading/createOrder",
      {
        symbol: stockTicker,
        qty: qty,
        side: "buy",
        time_in_force: "day",
        type: orderTypes[type],
      },
      {
        params: {
          account_id: this.account_id,
        },
      }
    );
    return res?.data;
  }
  async subscribePortfolio({ portfolio_id }: { portfolio_id: string }) {
    try {
      const res = await axiosClient.post("/v1/portfolio/subscribe", {
        portfolio_id: portfolio_id,
        account_id: this.account_id,
      });
    } catch (e) {
      console.log(e.response.data);
      if (
        e?.response?.data?.message ===
        "cannot create portfolio subscription when you have open orders"
      ) {
        throw new Error(
          "Cannot subscribe to portfolio when you have pending orders."
        );
      } else if (
        e?.response?.data?.message ===
        "Can not change portfolio preference for another 5 days."
      ) {
        throw new Error(
          "Can not change portfolio preference for another 5 days."
        );
      }
      throw new Error("Some error has occurred");
    }
  }
  async getSubscriptionDetails() {
    try {
      const res = await axiosClient.get("/v1/portfolio/subscriptionDetails", {
        params: {
          account_id: this.account_id,
        },
      });
  
      return res.data;
    } catch (error:any) {
      
      if (error.response) {
        // The request was made, but the server responded with a non-2xx status code
        console.error("Response Status:", error.response.status);
        console.error("Response Data:", error.response.data);
        throw new Error(`HTTP error: ${error.response.status}`);
      } else if (error.request) {
        // The request was made, but no response was received
        //console.error("No response received");
        throw new Error("No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        //console.error("Error:", error.message);
        throw new Error(error.message);
      }
    }
  }
  

  async getTransactionHistory() {
    const res = await axiosClient.get("/v1/trading/getOrderHistory", {
      params: {
        account_id: this.account_id,
      },
    });
    return res.data;
  }
  async getNews({ limit, symbols }: any) {
    const data = await axiosClient.get("/v1/news/getNews", {
      params: {
        limit: 5,
        symbols: "SPY",
      },
    });
    return data.data;
  }
  async getHistoricalStockData({ symbol }: any) {
    const data = await axiosClient.get("/v1/assets/getHistoricDataBySymbol", {
      params: {
        symbol,
      },
    });
    return data.data;
  }

  async getLatestStockData({ symbol }: any) {
    const data = await axiosClient.get("/v1/assets/getLatestPriceBySymbol", {
      params: {
        symbol,
      },
    });
    return data.data;
  }

  async getJournalsIn() {
    const data = await axiosClient.get("/v1/funding/fetchJournals", {
      params: {
        to_account: this.account_id,
      },
    });
    return data.data;
  }

  async getJournalsOuts() {
    const data = await axiosClient.get("/v1/funding/fetchJournals", {
      params: {
        from_account: this.account_id,
      },
    });
    return data.data;
  }
  async getPortfolios() {
    const data = await axiosClient.get("/v1/portfolio/");
    return data.data;
  }
  async withdrawCash(amount: any) {
    try{
      
    const data = await axiosClient.post(`/v1/funding/fundAccount`, {
      from_account: this.account_id,
      amount: amount,
    });}catch(e:any){
      throw new HttpException(
        e.response.data.message,
        e.response.status
      );
    }
  }

  async cancelPendingOrder(order_id: any) {
    const data = await axiosClient.delete(`/v1/trading/cancelOrder`, {
      params: {
        account_id: this.account_id,
        order_id: order_id,
      },
    });
  }

  async getCorporateActions() {
    const data = await axiosClient.get(
      `/v1/corporateActions/getCorporateActionsAccountId?accountId=${this.account_id}`
    );
    return data.data;
  }

  async getAccountActivites() {
    const res = await axiosClient.get("/v1/accounts/getAccountActivities", {
      params: {
        accountId: this.account_id,
      },
    });
    return res.data;
  }

  async fetchPortfolioName(portfolio_id:string) {
    try {
      const res = await axiosClient.post("/v1/portfolio/fetchportfolioname", {
        portfolio_id: portfolio_id,
      });
      return res?.data
    } catch (e:any) {
      console.log(e.response.data);
      
      throw new Error("Some error has occurred");
    }
  }
}


