import axios, { AxiosError } from "axios";
import axiosClientReferralService from "../axiosWrapperReferralService";
import HttpException from "../../src/Interfaces/HttpException";
export default class ReferralService {
  public static async getRewards() {
    const res = await axiosClientReferralService.get("/v1/get-reward");
   
    return res?.data;
  }
  public email
  public phone;
  constructor(email: any,phone:any) {
    this.email = email;
    this.phone=phone;
  }
  async validateReferral(code:any){
    try{
      
    const res= await axiosClientReferralService.post("/v1/validate-referral",{
      email:this.email,
      phone_number:this.phone,
      code:code
    })
    
    return res?.data
  }catch(e : any){
   
    throw new HttpException(
      "Referral Code Not Found",404
    );
  }
  }

}


