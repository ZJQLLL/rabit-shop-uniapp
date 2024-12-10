<script setup lang="ts">
import CustomNavbar  from './components/CustomNavbar.vue'
import XtxSwiper from '@/components/XtxSwiper.vue'
import XtxGuessLike from '@/components/XtxGuessLike.vue'
import {onMounted,ref} from 'vue'
import type {GetHomeBannerResult,getCategoryResult,getHotResult} from '@/services/home'
import {getHomeBannerAPI,getCategoryAPI,getHotAPI} from '@/services/home'
import CategoryPanel  from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
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
//热门数据
const hotList = ref<getHotResult[]>([])
const getHomeHotData = async()=>{
 const res = await getHotAPI()
  hotList.value = res.result??[]
}

//获取猜你喜欢子组件实例
const guessRef = ref()
//滚动到底依次获取+1页的数据(父掉子的方法)
const onScrollToLower = ()=>{
  guessRef.value.getMore()
}
onMounted(()=>{
  getHomeBannerData()
  getHomeCategoryData()
  getHomeHotData()
})
</script>

<template>
  <!-- 自定义导航区 -->
  <CustomNavbar/>
  <!-- 滚动区域(标签+指定高度flex) -->
  <scroll-view scroll-y class="scroll" @scrolltolower="onScrollToLower">
    <!-- 轮播图模块 -->
  <XtxSwiper :list ="bannerList"/>
  <!-- 前台分类模块 -->
  <CategoryPanel :list="categoryList"/>
  <!-- 热门推荐模块 -->
   <HotPanel :list="hotList"/>
   <!-- 猜你喜欢模块 -->
  <XtxGuessLike ref="guessRef" />
  </scroll-view>
  
  
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  display: flex;
  height: 100%;
  flex-direction: column;
}
.scroll {
  flex: 1;
}
</style>
