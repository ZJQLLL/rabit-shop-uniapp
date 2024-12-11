import { http } from "@/utils/http";

export type HotCommendParams ={
    /**
     * 分页页码
     */
    page?: number;
    /**
     * 分页数据每页条数
     */
    pageSize?: number;
    /**
     * Tab 项的 id，默认查询全部 Tab 项的第 1 页数据
     */
    subType?: string;
}
export type HotCommendResult = {
    /**
     * 活动图片
     */
    bannerPicture: string;
    /**
     * id信息
     */
    id: string;
    /**
     * 子类选项集合
     */
    subTypes: SubType[];
    /**
     * 活动标题
     */
    title: string;
}
/**
 * 子类选项
 */
export interface SubType {
    goodsItems: GoodsItem;
    /**
     * 子类选项id
     */
    id: string;
    /**
     * 子类选项名称
     */
    title: string;
}

export interface GoodsItem {
    /**
     * 总数量
     */
    counts: string;
    /**
     * 商品集合
     */
    items: Item[];
    /**
     * 页码
     */
    page: number;
    /**
     * 总页数
     */
    pages: number;
    /**
     * 页容量
     */
    pageSize: number;
}

/**
 * 商品项
 */
export interface Item {
    /**
     * 商品描述
     */
    desc: string;
    /**
     * 商品id
     */
    id: string;
    /**
     * 商品名称
     */
    name: string;
    /**
     * 商品图片
     */
    picture: string;
    /**
     * 商品价格
     */
    price: number;
}

/**
 * 
 * 热门推荐类API(特惠推荐、爆款推荐、一站买全、新鲜好物),格式相似,复用
 */
export const hotCommendAPI =  (url:string,data?:HotCommendParams)=>{
    return http<HotCommendResult>({
        method:'GET',
        url,
        data,
    })
}