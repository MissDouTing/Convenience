<template>
	<view class="hot_goods">
		<view class="tit">热门商品</view>
		<goodlist :goods="goods"></goodlist>
		
		<view class="more">
			<uni-load-more v-if="!flag" :status="'loading'"></uni-load-more>
			<uni-load-more v-else :status="'nomore'"></uni-load-more>
		</view>
		
	</view>
</template>

<script>
	import {
		requestGet,
		GoodURL
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				goods: [],
				pageindex: 1,
				//数据是否完全加载完毕
				flag:false
			}
		},
		onLoad() {
			this.getGoods();
		},
		methods: {
			async getGoods() {
				let result = await requestGet(GoodURL, {
					pageindex: this.pageindex
				});
				if (result.status === 0) {
					if(result.message.length<10){
						this.flag = true;
					}
					this.goods = [...this.goods,...result.message];
				}
			},
		},
		onReachBottom(){
			if(this.flag === false){
				this.pageindex ++;
				this.getGoods()
			}
		},
		onPullDownRefresh(){
			this.flag = false;
			this.goods = [];
			this.pageindex = 1;
			this.getGoods().then(()=>{
				uni.stopPullDownRefresh();
			})
		}
	}
</script>

<style lang="less">
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
