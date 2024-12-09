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

export const getHomeBannerAPI = (params:GetHomeBannerParams)=>{
    return http<GetHomeBannerResult[]>({
        method:'GET',
        url:'/home/banner',
        data:{
            params
        }
    })
}