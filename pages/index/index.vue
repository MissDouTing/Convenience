<template>
  <view class="content">
    <swiper
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
    >
      <swiper-item v-for="item in lunboList" :key="item.id">
        <view class="swiper-item">
          <image :src="item.url" mode="widthFix"></image>
        </view>
      </swiper-item>
    </swiper>
    <uni-grid :column="4" @change="girdItemChange">
      <uni-grid-item
        v-for="(item, index) in navs"
        :index="index"
        :key="item.title"
      >
        <uni-icons :type="item.icons" size="30"></uni-icons>
        <text>{{ item.title }}</text>
      </uni-grid-item>
    </uni-grid>
    <view class="hot_goods">
      <view class="tit">推荐商品</view>
      <goodlist :goods="goods"></goodlist>
    </view>
  </view>
</template>

<script>
import { requestGet, LunboURL, GoodURL } from '@/utils/http.js'
export default {
  data() {
    return {
      lunboList: [],
      goods: [],
      pageindex: 1,
      navs: [
        {
          icons: 'shop',
          title: '易利超市',
          path: '/pages/goods/goods',
        },
        {
          icons: 'image-filled',
          title: '社区图片',
          path: '/pages/pics/pics',
        },
        {
          icons: 'phone-filled',
          title: '联系我们',
          path: '/pages/contact/contact',
        },
        {
          icons: 'videocam-filled',
          title: '学习视频',
          path: '/pages/videos/videos',
        },
      ],
    }
  },
  onLoad() {
    this.getLunbo()
    this.getGoods()
  },
  methods: {
    async getLunbo() {
      let result = await requestGet(LunboURL)
      if (result.status === 0) {
        this.lunboList = result.message
      }
    },
    async getGoods() {
      let result = await requestGet(GoodURL, {
        pageindex: this.pageindex,
      })
      console.log(result)
      if (result.status === 0) {
        this.goods = result.message
      }
    },
    girdItemChange(e) {
      var current = this.navs.find((item, idx) => {
        if (idx === e.detail.index) {
          return true
        }
      })
      uni.navigateTo({
        url: current.path,
      })
    },
  },
}
</script>

<!--
App.vue中的样式是全局样式
页面中的样式是局部样式 ： 只能作用域当前组件，当前组件的父组件和子组件无效
-->
<style lang="less">
swiper {
  width: 100%;
  height: 422rpx;

  image {
    width: 100%;
  }
}

.uni-grid-item {
  text-align: center;

  /* /deep/叫样式穿透：允许样式作用到当前组件的子孙组件中  */
  /deep/ .uni-grid-item__box {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.hot_goods {
  background: #eee;

  .tit {
    border-top: 2px solid #eee;
    border-bottom: 2px solid #eee;
    margin-top: 20px;
    margin-bottom: 3px;
    color: blue;
    height: 50px;
    line-height: 50px;
    text-align: center;
    letter-spacing: 20px;
    background: #fff;
  }
}
</style>
