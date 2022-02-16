<template>
	<view class="pics">
		<scroll-view class="left" scroll-y="true">
			<view :class="currentIdx===index?'active':''" v-for="(item,index) in category" :key="item.id" class="item"
				@click="leftClick(item,index)">
				<text>{{item.title}}</text>
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y="true">
			<view v-for="item in secondData" :key="item.id" class="item">
				<image :src="item.img_url" mode="widthFix" @click="previewImg(item.img_url)"></image>
				<text>{{item.title}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		requestGet,
		ImageCategoryURL,
		ImagesURL
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				category: [],
				currentIdx: 0,
				secondData: []
			}
		},
		onLoad() {

			this.getCategory();
		},
		methods: {
			async getCategory() {
				let result = await requestGet(ImageCategoryURL);
				if (result.status === 0) {
					result.message.unshift({
						title: "全部",
						id: 0
					})
					this.category = result.message
					this.getImagesByCategoryId(this.category[0].id)
				}
			},
			async getImagesByCategoryId(id) {
				let result = await requestGet(ImagesURL + id);
				if (result.status === 0) {
					this.secondData = result.message;
				}
			},
			leftClick(item, index) {
				this.currentIdx = index;
				this.getImagesByCategoryId(item.id)
			},
			//图片预览
			previewImg(current) {
				const urls = this.secondData.map(item => {
					return item.img_url
				})
				uni.previewImage({
					current,
					urls
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		height: 100%;
	}
	.pics {
		display: flex;
		height: 100%;

		.left {
			// padding: 8rpx;
			// box-sizing: border-box;
			/*vw 和 vh : 1vw = 屏幕宽度的百分之一
		             1vh = 屏幕高度的百分之一*/
					
			height: 100%;
			width: 200rpx !important;

			.item {
				text-align: center;
				height: 120rpx;
				background: #eee;
				line-height: 120rpx;
			}

			.active {
				background: pink;
			}
		}

		.right {
			// padding: 8rpx;
			// box-sizing: border-box;
			/*vw 和 vh : 1vw = 屏幕宽度的百分之一
			         1vh = 屏幕高度的百分之一*/
			height: 100%;
			flex: 1;

			.item {
				width: 100%;

				image {
					width: 100%;
				}
				margin-top: 20rpx;
			}
		}
	}
</style>
