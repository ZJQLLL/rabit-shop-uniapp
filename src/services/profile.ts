import { http } from "@/utils/http";

export interface GetMemberProfileResult {
    /**
     * 账号名称
     */
    account: string;
    /**
     * 头像
     */
    avatar: string;
    /**
     * 生日
     */
    birthday: null | string;
    /**
     * 省市区的名称：如山东省济南市里历下区
     */
    fullLocation: string;
    /**
     * 性别，男、女、未知
     */
    gender: Gender;
    /**
     * 用户Id
     */
    id: string;
    /**
     * 昵称
     */
    nickname: null | string;
    /**
     * 职业
     */
    profession: null | string;
}
/**
 * 性别，男、女、未知
 */
export enum Gender {
    女 = "女",
    未知 = "未知",
    男 = "男",
}
export const getMemberProfileAPI = ()=>{
    return http<GetMemberProfileResult>({
        method:'GET',
        url:'/member/profile',
    })
}