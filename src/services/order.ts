import { http } from "@/utils/http";

export enum OrderState {
    /** 待付款 */
  DaiFuKuan = 1,
  /** 待发货 */
  DaiFaHuo = 2,
  /** 待收货 */
  DaiShouHuo = 3,
  /** 待评价 */
  DaiPingJia = 4,
  /** 已完成 */
  YiWanCheng = 5,
  /** 已取消 */
  YiQuXiao = 6,
}
/** 订单状态列表 */
export const orderStateList = [
    { id: 0, text: '' },
    { id: 1, text: '待付款' },
    { id: 2, text: '待发货' },
    { id: 3, text: '待收货' },
    { id: 4, text: '待评价' },
    { id: 5, text: '已完成' },
    { id: 6, text: '已取消' },
  ]
export interface GetMemberOrderPreResult {
    /**
     * 商品集合
     */
    goods: Good[];
    /**
     * 结算信息
     */
    summary: Summary;
    /**
     * 用户地址列表
     */
    userAddresses: UserAddress[];
}
/**
 * 商品信息
 */
export interface Good {
    /**
     * 属性文字，例如“颜色:瓷白色 尺寸：8寸”
     */
    attrsText: string;
    /**
     * 数量
     */
    count: number;
    /**
     * id
     */
    id: string;
    /**
     * 商品名称
     */
    name: string;
    /**
     * 实付单价
     */
    payPrice: number;
    /**
     * 图片
     */
    picture: string;
    /**
     * 原单价
     */
    price: number;
    /**
     * SKUID
     */
    skuId: string;
    /**
     * 实付价格小计
     */
    totalPayPrice: number;
    /**
     * 小计总价
     */
    totalPrice: number;
}

/**
 * 结算信息
 */
export interface Summary {
    /**
     * 折扣总计
     */
    discountPrice: number;
    /**
     * 商品件数
     */
    goodsCount: number;
    /**
     * 邮费
     */
    postFee: number;
    /**
     * 应付总计
     */
    totalPayPrice: number;
    /**
     * 价格总计
     */
    totalPrice: number;
}

/**
 * 地址信息
 */
export interface UserAddress {
    /**
     * 详细地址
     */
    address: string;
    /**
     * 城市编码
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
     * 完整行政区
     */
    fullLocation: string;
    /**
     * id
     */
    id: string;
    /**
     * 是否为默认，1为是，0为否
     */
    isDefault: number;
    /**
     * 邮编
     */
    postalCode: string;
    /**
     * 省份编码
     */
    provinceCode: string;
    /**
     * 收货人
     */
    receiver: string;
}
export interface GetMemberOrderNowParams{
     /**
     * 下单时已经选择好的地址id
     */
     addressId?: string;
     /**
      * 购买商品的数量
      */
     count: string;
     /**
      * 商品skuId
      */
     skuId: string;
}
export interface SubmitOrderParams{
    /**
     * 所选地址Id
     */
    addressId: string;
    /**
     * 买家留言
     */
    buyerMessage: string;
    /**
     * 配送时间类型，1为不限，2为工作日，3为双休或假日
     */
    deliveryTimeType: number;
    /**
     * 商品集合
     */
    goods:Partial<Good>[];
    /**
     * 支付渠道：支付渠道，1支付宝、2微信--支付方式为在线支付时，传值，为货到付款时，不传值
     */
    payChannel: number;
    /**
     * 支付方式，1为在线支付，2为货到付款
     */
    payType: number;
}
export interface GetMemberOrderDetailResult {
    /**
     * 预计到货时间
     */
    arrivalEstimatedTime: string;
    /**
     * 交易关闭时间
     */
    closeTime: string;
    /**
     * 发货时间
     */
    consignTime: string;
    /**
     * 倒计时--剩余的秒数 -1 表示已经超时，正数表示倒计时未结束
     */
    countdown: number;
    /**
     * 下单时间
     */
    createTime: string;
    /**
     * 配送时间类型，1为不限，2为工作日，3为双休或假日
     */
    deliveryTimeType: number;
    /**
     * 交易完成时间
     */
    endTime: string;
    /**
     * 完成评价时间
     */
    evaluationTime: string;
    /**
     * 订单编号
     */
    id: string;
    /**
     * 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消
     */
    orderState: number;
    /**
     * 支付渠道，1支付宝、2微信
     */
    payChannel: number;
    /**
     * 付款截止时间：剩余的秒数，前台转换成分钟：秒数
     */
    payLatestTime: number;
    /**
     * 实付金额
     */
    payMoney: string;
    /**
     * 付款时间
     */
    payTime: string;
    /**
     * 支付方式，1为在线支付，2为货到付款
     */
    payType: number;
    /**
     * 邮费
     */
    postFee: string;
    /**
     * 收货人地址
     */
    receiverAddress: string;
    /**
     * 收货人
     */
    receiverContact: string;
    /**
     * 收货人手机
     */
    receiverMobile: string;
    /**
     * 商品集合
     */
    skus: Skus[];
    /**
     * 金额合计
     */
    totalMoney: string;
    /**
     * 数量合计
     */
    totalNum: string;
}
/**
 * 商品信息
 */
export interface Skus {
    /**
     * 属性说明
     */
    attrsText: string;
    /**
     * 单价
     */
    curPrice: number;
    /**
     * sku id
     */
    id: string;
    /**
     * 图片地址
     */
    image: string;
    /**
     * 商品名称
     */
    name: string;
    /**
     * 属性集合
     */
    properties: Property[];
    /**
     * 数量
     */
    quantity: string;
    /**
     * 实付金额
     */
    realPay: number;
    /**
     * spu id
     */
    spuId: string;
    /**
     * 小计
     */
    totalMoney: number;
}

/**
 * 属性信息
 */
export interface Property {
    /**
     * 属性名称，如 颜色
     */
    propertyMainName: string;
    /**
     * 属性值名称，如 黑色
     */
    propertyValueName: string;
}
export interface GetMemberOrderLogisticsResult {
    /**
     * 快递公司
     */
    company: Company;
    /**
     * 商品件数
     */
    count: number;
    /**
     * 物流日志
     */
    list: List[];
    /**
     * 商品图片
     */
    picture: string;
}
/**
 * 快递公司
 */
export interface Company {
    /**
     * 公司名称
     */
    name: string;
    /**
     * 快递编号
     */
    number: string;
    /**
     * 联系电话
     */
    tel: string;
}

export interface List {
    /**
     * 信息ID
     */
    id: string;
    /**
     * 信息文字
     */
    text: string;
    /**
     * 时间
     */
    time: string;
}



/**
 * 填写订单-获取预付订单
 */
export const getMemberOrderPreAPI = ()=>{
    return http<GetMemberOrderPreResult>({
        method:'GET',
        url:'/member/order/pre',
    })
}
/**
 * 填写订单-获取立即购买订单
 */
export const getMemberOrderNowAPI = (data:GetMemberOrderNowParams)=>{
    return http<GetMemberOrderPreResult>({
        method:'GET',
        url:'/member/order/pre/now',
        data,
    })
}
/**
 * 提交订单
 */
export const submitOrderAPI = (data:SubmitOrderParams)=>{
    return http<{id:string}>({
        method:'POST',
        url:'/member/order',
        data,
    })
}
/**
 * 获取订单详情
 */
export const getMemberOrderDetailAPI = (id:string)=>{
    return http<GetMemberOrderDetailResult>({
        method:'GET',
        url:`/member/order/${id}`
    })
}
/**
 * 删除订单
 */
export const deleteMemberOrderAPI = (ids:string[])=>{
    return http({
        method:'DELETE',
        url:'/member/order',
        data:{ids},
    })
}
/**
 * 取消订单
 */
export const cancelMemberOrderAPI = (id:string,cancelReason:string)=>{
    return http<GetMemberOrderDetailResult>({
        method:'PUT',
        url:`/member/order/${id}/cancel`,
        data:{cancelReason},
    })
}
/**
 * 获取订单物流
 */
export const getMemberOrderLogisticsAPI = (id:string)=>{
    return http<GetMemberOrderLogisticsResult>({
        method:'GET',
        url:`/member/order/${id}/logistics`,
    })
}
/**
 * 确认收货
 */
export const confirmMemberOrderAPI = (id:string)=> {
    return http<GetMemberOrderDetailResult>({
        method:'PUT',
        url:`/member/order/${id}/receipt`,
    })
}
/**
 * 模拟发货
 */
export const mockMemberOrderConsignAPI = (id:string)=>{
    return http({
        method:'GET',
        url:`/member/order/consignment/${id}`,
    })
}