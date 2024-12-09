<script setup lang="ts">
import CustomNavbar  from './components/CustomNavbar.vue'
import XtxSwiper from '@/components/XtxSwiper.vue'
import {onMounted,ref} from 'vue'
import type {GetHomeBannerResult,getCategoryResult} from '@/services/home'
import {getHomeBannerAPI,getCategoryAPI} from '@/services/home'
import CategoryPanel  from './components/CategoryPanel.vue'

//轮播图数据
const bannerList = ref<GetHomeBannerResult[]>([])
const getHomeBannerData =async ()=>{
 const res = await getHomeBannerAPI({distributionSite:1})
 bannerList.value = res.result??[]
}
//前台分类数据
const categoryList = ref<getCategoryResult[]>([])
const getHomeCategoryData =async ()=>{
 const res = await getCategoryAPI()
 categoryList.value = res.result??[]
}
onMounted(()=>{
  getHomeBannerData()
  getHomeCategoryData()
})
</script>

<template>
  <!-- 自定义导航区 -->
  <CustomNavbar/>
  <!-- 轮播图模块 -->
  <XtxSwiper :list ="bannerList"/>
  <!-- 前台分类模块 -->
  <CategoryPanel :list="categoryList"/>
  
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
