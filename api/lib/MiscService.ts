import axios from "axios";

export default class MiscService {
    public static async getUSDPKR(){
        var data = 'length=1&id=1&buysell=1';
        var config = {
            method: 'post',
          maxBodyLength: Infinity,
            url: 'https://www.khistocks.com/ajax/kerb_rates',
            headers: { 
              'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 
            },
            data : data
          };
          const res = await axios(config)
          return res.data
          
    }
}