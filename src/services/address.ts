import { http } from "@/utils/http";

export interface AddMemberAddressParams {
     /**
     * 详细地址
     */
     address: string;
     /**
      * 所在城市编码
      */
     cityCode: string;
     /**
      * 联系方式
      */
     contact: string;
     /**
      * 所在区/县编码
      */
     countyCode: string;
     /**
      * 是否为默认，1为是，0为否
      */
     isDefault: number;
     /**
      * 所在省份编码
      */
     provinceCode: string;
     /**
      * 收货人姓名
      */
     receiver: string;
}
export interface AddMemberAddressResult {
    id: number;
}
export interface MemberAddressListItem {
     /**
     * 详细地址
     */
     address: string;
     /**
      * 所在城市编码
      */
     cityCode: string;
     /**
      * 联系方式
      */
     contact: string;
     /**
      * 所在区/县编码
      */
     countyCode: string;
     /**
      * 省市区(县)
      */
     fullLocation: string;
     /**
      * 收货地址id
      */
     id: string;
     /**
      * 是否为默认，1为是，0为否
      */
     isDefault: number;
     /**
      * 所在省份编码
      */
     provinceCode: string;
     /**
      * 收货人姓名
      */
     receiver: string;
}

export const addMemberAddressAPI = (data:AddMemberAddressParams)=>{
    return http<AddMemberAddressResult>({
        method:'POST',
        url:'/member/address',
        data,
    })
}

export const setMemberAddressAPI = (id:string,data:AddMemberAddressParams)=>{
    return http<AddMemberAddressResult>({
        method:'PUT',
        url:`/member/address/${id}`,
        data,
    })
}

export const getMemberAddressListAPI = ()=>{
    return http<MemberAddressListItem[]>({
        method:'GET',
        url:'/member/address'
    })
}

export const getMemberAddressDetailAPI = (id:string)=>{
    return http<MemberAddressListItem>({
        method:'GET',
        url:`/member/address/${id}`,
    })
}

export const deleteMemberAddressAPI = (id:string)=>{
    return http<AddMemberAddressResult>({
        method:'DELETE',
        url:`/member/address/${id}`
    })
}
