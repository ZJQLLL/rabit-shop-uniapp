// /src/pages/hot/hot.vue
<script setup lang="ts">
import {ref,onMounted} from 'vue'
import { onReady } from '@dcloudio/uni-app';
import {hotCommendAPI, type SubType} from '@/services/hot'
// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]

//获取当前推荐信息
const currentUrlMap = hotMap.find(item=>item.type===query.type)
//活动图片
const bannerPicture = ref<string>()
//tab子类信息
const subTypes = ref<(SubType & {finish?:boolean})[]>([])
//高亮下标
const activeIndex = ref(0)

const onScrolltolower = async()=>{
  //获取当前对应的tab(根据高亮下标获得对应数组项),带着id和分页信息发请求
  const currentSubType = subTypes.value[activeIndex.value]
  if(currentSubType.goodsItems.page< currentSubType.goodsItems.pages) {
    currentSubType.goodsItems.page++
  } else {
    uni.showToast({icon:'none',title:'没有更多数据啦~~~'})
    //不可以单独设置,会有交叉,通过为当前tab设置
    currentSubType.finish = true
    return
  }
  
  const res = await hotCommendAPI(currentUrlMap!.url,{
    subType:currentSubType.id,
    page:currentSubType.goodsItems.page,
    pageSize:currentSubType.goodsItems.pageSize,
  })
  //新的列表选项
  const newGoodsItems = res.result?.subTypes[activeIndex.value].goodsItems.items ??[]
  currentSubType.goodsItems.items.push(...newGoodsItems)
}

onMounted(async()=>{
 const res = await hotCommendAPI(currentUrlMap!.url,{
  page:32,
  pageSize:10
 })
 bannerPicture.value = res.result?.bannerPicture
 subTypes.value = res.result?.subTypes??[]
})

//uniAPI设置标题
onReady(()=>{
uni.setNavigationBarTitle({title:currentUrlMap!.title})
})


const query = defineProps<{
  type:string,
}>()
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image
        :src="bannerPicture"
      ></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text 
      class="text" 
      :class="{active:activeIndex===index}" 
      v-for="(tab,index) in subTypes" 
      :key="tab.id"
      @tap="activeIndex=index"
      >
      {{ tab.title }}
    </text>
    </view>
    <!-- 推荐列表,有几个TAB就对应几个列表 -->
    <scroll-view 
    scroll-y 
    class="scroll-view" 
    v-for="(item,index) in subTypes" 
    :key="item.id"
    v-show="activeIndex===index"
    @scrolltolower="onScrolltolower"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in item.goodsItems.items"
          :key="goods.id"
          :url="`/pages/goods/goods?id=${goods.id}`"
        >
          <image
            class="thumb"
            :src="goods.picture"
          ></image>
          <view class="name ellipsis">{{ goods.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">{{ item.finish?'没有更多数据啦~~~':'正在加载...' }}</view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.scroll-view {
  flex: 1;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>