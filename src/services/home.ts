import { http } from "@/utils/http"
export interface GetHomeBannerParams {
    /**
     * 广告区域展示位置
     * 1 为首页（默认值）
     * 2 为商品分类页
     */
    distributionSite?: number;
}
export interface GetHomeBannerResult {
    /**
     * 跳转链接
     */
    hrefUrl: string;
    /**
     * id
     */
    id: string;
    /**
     * banner链接
     */
    imgUrl: string;
    /**
     * 跳转类型1、页面2、H5 3、小程序（小程序使用）
     */
    type: number;
}
export interface getCategoryResult {
    /**
     * 展示图标
     */
    icon: string;
    /**
     * id
     */
    id: string;
    /**
     * 分类名称
     */
    name: string;
}
export interface getHotResult {
     /**
     * 推荐说明
     */
     alt: string;
     /**
      * id
      */
     id: string;
     /**
      * 图片集合
      */
     pictures: string[];
     /**
      * 跳转地址
      */
     target: string;
     /**
      * 推荐标题
      */
     title: string;
     /**
      * 推荐类型
      */
     type: string;
}

export interface getGuessLikeParams {
    /**
     * 页码默认值1
     */
    page?: number;
    /**
     * 页大小默认是10
     */
    pageSize?: number;
}
//写成泛型方便之后书写
export interface PageResult<T> {
     /**
     * 总条数
     */
     counts: number;
     /**
      * 当前页数据
      */
     items: T[];
     /**
      * 当前页数
      */
     page: number;
     /**
      * 总页数
      */
     pages: number;
     /**
      * 每页条数
      */
     pageSize: number;
}
export interface GuessLikeItem {
    /**
     * 商品描述
     */
    desc: string;
    /**
     * 商品折扣
     */
    discount: number;
    /**
     * id
     */
    id: string;
    /**
     * 商品名称
     */
    name: string;
    /**
     * 商品已下单数量
     */
    orderNum: number;
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
 * 首页-广告区域（获取轮播图）
 */
export const getHomeBannerAPI = (params:GetHomeBannerParams)=>{
    return http<GetHomeBannerResult[]>({
        method:'GET',
        url:'/home/banner',
        data:{
            params
        }
    })
}

/**
 * 获取前台分类
 */
export const getCategoryAPI = ()=>{
    return http<getCategoryResult[]>({
        method:'GET',
        url:'/home/category/mutli'
    })
}

/**
 * 获取热门推荐
 */
export const getHotAPI=()=>{
    return http<getHotResult[]>({
        method:'GET',
        url:'/home/hot/mutli'
    })
}

/**
 * 猜你喜欢
 */
export const getGuessLikeAPI = (params:getGuessLikeParams)=>{
    return http<PageResult<GuessLikeItem>>({
        method:'GET',
        url:'/home/goods/guessLike',
        data:{
            params
        }
    })
}