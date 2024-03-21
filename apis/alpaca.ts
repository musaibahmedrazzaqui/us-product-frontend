import axios from 'axios';
const moment = require('moment');

function get10thPreviousWorkday() {
    let date = moment();
    let count = 0;
    while (count < 10) {
      date.subtract(1, 'day');
      if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
        count++;
      }
    }
    return date.toDate();
  }
  
function getLastWorkday() {
    let date = moment().subtract(1,'day');
    while (date.isoWeekday() === 6 || date.isoWeekday() === 7) {
    date.subtract(1, 'day');
    }
    return date.format('YYYY-MM-DD');
}



function isTodayWorkday() {
    const today = moment();
    console.log(today.format('YYYY-MM-DD'))
    return today.isoWeekday() !== 6 && today.isoWeekday() !== 7;
}
    
  

const accountIdMap = {
    'shoaibkhalid@gmail.com' : '65074154-55bf-495d-9362-300bcb5901b4',
    'azharali@gmail.com' : '9e75187f-28e0-413a-88a0-18466c5355cd',
    'omaralevi@gmail.com' : 'b58cba94-e2b4-448f-a9c5-0361e4e0aa3f',
    'testuser@gmail.com' : '1cf84693-04ac-4ea8-9f17-70749eca9b5a'

}
const account_id = '1cf84693-04ac-4ea8-9f17-70749eca9b5a'

export async function alpacaNews({limit, symbols,} : any){
    const data =  await axios.get('https://data.sandbox.alpaca.markets/v1beta1/news',{
        params : {
            limit,
            symbols,
            include_content : true,
            exclude_contentless : true
        },
        auth: {
            username :'CKZON3S4RTI7BDVRDTGB',
            password : '18hv20G5pMpL3EsiUfJcOqKver1hAySZgY1P7l9v'
        }
    })
    return data.data
}

export async function getUserHoldings(){
    const data =  await axios.get(`https://broker-api.sandbox.alpaca.markets/v1/trading/accounts/${account_id}/account`,{
        auth: {
            username :'CKZZ16PCED1BUI4C0JSY',
            password : 'cl6qYDB6eRTx6FSNNE2TXZkQ49lf0ROAmoe6Ct8x'
        }
    })
    return data.data
}

export async function getLatestStockData({symbol} : any){
    const today = moment().format('YYYY-MM-DD')
    try {
        const data = await axios.get(`https://data.sandbox.alpaca.markets/v2/stocks/${symbol}/bars`,{
            auth: {
                username :'CKZON3S4RTI7BDVRDTGB',
                password : '18hv20G5pMpL3EsiUfJcOqKver1hAySZgY1P7l9v'
            },
            params : {
                timeframe: '1Day',
                start : today
            },
            }
        )
        // console.log(data.data)
        // console.log(getLastWorkday())
        if (data.data.bars === null){
            // console.log(data.data)
            const data = await axios.get(`https://data.sandbox.alpaca.markets/v2/stocks/${symbol}/bars`,{
            auth: {
                username :'CKZON3S4RTI7BDVRDTGB',
                password : '18hv20G5pMpL3EsiUfJcOqKver1hAySZgY1P7l9v'
            },
            params : {
                timeframe: '1Day',
                start : getLastWorkday()
            },
            
        })
        return data.data
        }
        return data.data
    }catch(e) {
        const data = await axios.get(`https://data.sandbox.alpaca.markets/v2/stocks/${symbol}/bars`,{
            auth: {
                username :'CKZON3S4RTI7BDVRDTGB',
                password : '18hv20G5pMpL3EsiUfJcOqKver1hAySZgY1P7l9v'
            },
            params : {
                timeframe: '1Day',
                start : getLastWorkday()
            },
            
        })
        return data.data
    }
        
    

}