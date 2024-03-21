import axios, { AxiosError } from "axios";
import axiosClient from "../axiosWrapperUserService";


export default class UserService {
	//Response bodies unclear
	public static async createUser(data: object) {
		const res = await axiosClient.post('/', data)
		return res
	}

	public static async initiateAlpacaAccountOpening(userId: any) {
		const res = await axiosClient.post(`/${userId}/agreements`)
		return res
	}

	//Document in formdata object as type file (application/pdf)
	//Document type = identity_verification
	//Document sub type = passport
	// formdata = {
	// 	file: document
	// 	sub_type = 'passport'
	// }
	public static async uploadSingleDocument(userId: any, documentType: any, data: any) {
		const res = await axiosClient.post(`/${userId}/documents/${documentType}`, data,{
			headers : {
				'Content-Type' : 'multipart/form-data'
			}
		})
		return res
	}

	public static async getUser(userId : any){
		const res = await axiosClient.get(`/${userId}`)
		return res.data
	}

	public static async updateUser(userId : string, body : any){
		const res = await axiosClient.patch(`/${userId}`,body)
		return res

		
	}

	public static async agreements(userId : string){
		const res = await axiosClient.post(`/${userId}/agreements`)
		return res.data
	}
}