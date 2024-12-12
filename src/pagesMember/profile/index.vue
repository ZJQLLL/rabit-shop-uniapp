<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import {ref} from 'vue'
import {useMemberStore} from '@/stores'
import {Gender, getMemberProfileAPI, setMemberProfileAPI, type GetMemberProfileResult} from '@/services/profile'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const memberStore = useMemberStore() //这里为了更新仓库数据

//个人信息
const profile = ref<GetMemberProfileResult>({} as GetMemberProfileResult)
const getProfileData = async()=>{
  const res = await getMemberProfileAPI()
  if(res.result){
    profile.value = res.result
  }
}

const changeAvatar = ()=>{
  //读取用户相册的照片或者拍照
  uni.chooseMedia({
    count:1,
    mediaType:['image'],
    success:(res)=>{
      const {tempFilePath} = res.tempFiles[0]
      //文件上传
      uni.uploadFile({
        url:'/member/profile/avatar',//后端接口地址
        name:'file',// 后端数据字段名
        filePath:tempFilePath,
        success:(res)=>{
          //判断上传服务器是否成功
          if(res.statusCode===200) {
            // 提取头像
            const {avatar} = JSON.parse(res.data).result
            // 当前页面更新头像
            profile.value!.avatar = avatar
            //更新仓库头像(我的页面直接用的store数据渲染)
            memberStore.profile!.avatar = avatar
            uni.showToast({icon:'success',title:'更新成功'})
          } else {
            uni.showToast({icon:'error',title:'出错啦'})
          }
        },
      })
    },
  })
}

//单选框改变时回调
const onGenderChange:UniHelper.RadioGroupOnChange = (e)=>{
  profile.value.gender = e.detail.value as Gender
}

//生日(日期选择框)改变回调
const onDateChange:UniHelper.DatePickerOnChange = (e)=>{
  profile.value.birthday = e.detail.value
}

let cityCode:[string,string,string] = ['','','']
//城市改变
const onFullLocationChange:UniHelper.RegionPickerOnChange = (e)=>{
  //更新前端界面
  profile.value.fullLocation = e.detail.value.join(' ') //["北京市", "北京市", "东城区"]拼成湖南省 长沙市 芙蓉区
  //更新后端
  cityCode = e.detail.code!
}

const onSubmit = async()=>{
  const {nickname,gender,birthday} = profile.value
 const res = await setMemberProfileAPI({
    nickname,
    gender,
    birthday,
    provinceCode:cityCode[0],
    cityCode:cityCode[1],
    countyCode:cityCode[2],
  })
  if(res.result){
    memberStore.profile!.nickname = res.result?.nickname
    uni.showToast({icon:'success',title:'修改成功'})
    setTimeout(() => {
      uni.navigateBack()
    }, 500);
  }
  
}
onLoad(()=>{
  getProfileData()
})
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view class="avatar-content" @tap="changeAvatar">
        <image class="image" :src="profile?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profile?.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="text" placeholder="请填写昵称" v-model="profile!.nickname" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onGenderChange">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="profile?.gender==='男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="profile?.gender==='女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="profile?.birthday"
            @change="onDateChange"
          >
            <view v-if="profile?.birthday">{{ profile?.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker class="picker" mode="region" :value="profile.fullLocation.split(' ')" @change="onFullLocationChange">
            <view v-if="profile?.fullLocation">{{ profile.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input class="input" type="text" placeholder="请填写职业" :value="profile?.profession" />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="onSubmit">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

/*  导航栏 */
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

/* 头像 */
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

/* 表单 */
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>