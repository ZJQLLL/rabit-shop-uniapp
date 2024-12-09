<script setup lang="ts">
import CustomNavbar  from './components/CustomNavbar.vue'
import XtxSwiper from '@/components/XtxSwiper.vue'
import {onMounted,ref} from 'vue'
import type {GetHomeBannerResult} from '@/services/home'
import {getHomeBannerAPI} from '@/services/home'
const bannerList = ref<GetHomeBannerResult[]>([])
const getHomeBannerData =async ()=>{
 const res = await getHomeBannerAPI({distributionSite:1})
 bannerList.value = res.result??[]
}
onMounted(()=>{
  getHomeBannerData()
})
</script>

<template>
  <CustomNavbar/>
  <XtxSwiper :list ="bannerList"/>
  
</template>

<style lang="scss">
//
</style>
