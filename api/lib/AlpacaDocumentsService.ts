import axios from "axios";
import axiosClient from "../axiosWrapperDocumentService";


export default class AlpacaDocumentService {

    private account_id;
    
    constructor(account_id : any) {
        this.account_id = account_id
    }

    async getAllDocuments(){
        let url= `/reports/${this.account_id}/document/account_statement`
        const data =  await axiosClient.get(url)
        return data.data
    }
    async getDocument(date : string){
        let url= `/reports/${this.account_id}/document/account_statement/${date}`
        const data =  await axiosClient.get(url)
        return data.data
    }
}