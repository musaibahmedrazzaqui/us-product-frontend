import axios from "axios";
import axiosClient from "../axiosWrapper";
import axiosClientBro from "../axiosWrapperBalanceService";
import axiosClientBrokerAPIService from "../axiosWrapperBrokerAPI";


export default class AlpacaBrokerAPIService {

    private account_id;
    
    constructor(account_id : any) {
        this.account_id = account_id
    }

    async getUserTransfers(){
        let url= `/v1/accounts/${this.account_id}/transfers`
        const data =  await axiosClientBrokerAPIService.get(url)
        return data.data
    }
    async getUserJournalOuts(){
        let url= `/v1/journals`
        const data =  await axiosClientBrokerAPIService.get(url,{
            params:{
                from_account :this.account_id
            }
        })
        return data.data
    }
    async cancelTransferOut(journalId : string) {
        let url = `/v1/journals/${journalId}`
        const data = await axiosClientBrokerAPIService.delete(url)
    }
    
}