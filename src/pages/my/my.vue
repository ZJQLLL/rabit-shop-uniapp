<script setup lang="ts">
import { useMemberStore } from '@/stores'

import {getHomeBannerAPI} from '@/services/home'
const memberStore = useMemberStore()
const getData =async () => {
  
 const res = await getHomeBannerAPI({distributionSite:1})
  console.log(24,res);
  
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋',
          token:'222'
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="getData">测试请求</button>
  </view>
</template>

<style lang="scss">
//
</style>
