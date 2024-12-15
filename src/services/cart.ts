import { http } from "@/utils/http";
export interface AddMemberCartParams {
     /**
     * 数量
     */
     count: number;
     /**
      * SKUID
      */
     skuId: string;
}
export const addMemberCartAPI = (data:AddMemberCartParams)=>{
    return http({
        method:'POST',
        url:'/member/cart',
        data,
    })
}