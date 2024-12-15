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
export interface CartListItem{
    /**
     * 属性文字，例如“颜色:瓷白色 尺寸：8寸”
     */
    attrsText: string;
    /**
     * 数量
     */
    count: number;
    /**
     * 折扣信息
     */
    discount: number;
    /**
     * SPUID
     */
    id: string;
    /**
     * 是否收藏
     */
    isCollect: boolean;
    /**
     * 是否为有效商品
     */
    isEffective: boolean;
    /**
     * 商品名称
     */
    name: string;
    /**
     * 当前的价格
     */
    nowPrice: number;
    /**
     * 图片
     */
    picture: string;
    /**
     * 加入时价格
     */
    price: number;
    /**
     * 是否选中
     */
    selected: boolean;
    /**
     * SKUID
     */
    skuId: string;
    /**
     * 库存
     */
    stock: number;
}
export interface DeleteCartParams{
    /**
     * SKUID集合
     */
    ids: string[];
}
export interface SetMemberCartParams {
    /**
     * 商品数量 - 可选参数
     */
    count?: number;
    /**
     * 选中状态 - 可选参数
     */
    selected?: boolean;
}

export const addMemberCartAPI = (data:AddMemberCartParams)=>{
    return http({
        method:'POST',
        url:'/member/cart',
        data,
    })
}
export const getMemberCartListAPI = ()=>{
    return http<CartListItem[]>({
        method:'GET',
        url:'/member/cart'
    })
}
export const deleteCartAPI = (data:DeleteCartParams)=>{
    return http({
        method:'DELETE',
        url:'/member/cart',
        data,
    })
}
export const setMemberCartAPI = (skuId:string,data:SetMemberCartParams)=> {
    return http<CartListItem>({
        method:'PUT',
        url:`/member/cart/${skuId}`,
        data,
    })
}
export const selectMemberCartAPI = (selected:boolean)=>{
    return http({
        method:'PUT',
        url:'/member/cart/selected',
        data:{
            selected
        }
    })
}