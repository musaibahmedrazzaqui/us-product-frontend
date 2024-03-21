import axios from "axios";
import axiosClient from "../axiosWrapper";
import axiosClientBalanceService from "../axiosWrapperBalanceService";


export default class AlpacaBalanceService {

    private account_id;
    
    constructor(account_id : any) {
        this.account_id = account_id
    }

    async getUserBalance(){
        let url= `/account-details/balance/${this.account_id}`
        try{
            const data =  await axiosClientBalanceService.get(url)
            const responseDataWithStatus = {
                ...data.data,
                statusCode: data.status,
            };
        
            return responseDataWithStatus;
        }catch(err){
            //console.log(err)
            const responseDataWithStatus = {
               
                statusCode: 404,
            };
        
            return responseDataWithStatus;
        }
    }
    async getUserPorfolio(){
        let url= `/account-details/portfolio/${this.account_id}`
        try{
            const data =  await axiosClientBalanceService.get(url)
            const responseDataWithStatus = {
                ...data.data,
                statusCode: data.status,
            };
            
            return responseDataWithStatus;
        }catch(err){
            console.log(err)
            const responseDataWithStatus = {
               
                statusCode: 404,
            };
        
            return responseDataWithStatus;
        }
    }
    async getUserCash(){
        let url= `/account-details/cash/${this.account_id}`
        try{
            const data =  await axiosClientBalanceService.get(url)
            const responseDataWithStatus = {
                ...data.data,
                statusCode: data.status,
            };
        
            return responseDataWithStatus;
        }catch(err){
            //console.log(err)
            const responseDataWithStatus = {
               
                statusCode: 404,
            };
        
            return responseDataWithStatus;
        }
    }
    async getAll() {
        let url= `/account-details/all/${this.account_id}`
        console.log(url)
        try{
            const data =  await axiosClientBalanceService.get(url)
            const responseDataWithStatus = {
                ...data.data,
                statusCode: data.status,
            };
        
            return responseDataWithStatus;
        }catch(err){
            console.log("getall",err)
            const responseDataWithStatus = {
               
                statusCode: 404,
            };
        
            return responseDataWithStatus;
        }
        
        
     // Append status to data before returning

}
    public static async getAccount(account_id : string) {
        let url= `/account-details/all/${account_id}`
        try{
            
            const data =  await axiosClientBalanceService.get(url)
            const responseDataWithStatus = {
                ...data.data,
                statusCode: data.status,
            };
            
            return responseDataWithStatus;
        }catch(err){
            //console.log(err)
            const responseDataWithStatus = {
               
                statusCode: 404,
            };
        
            return responseDataWithStatus;
        }
    }
}