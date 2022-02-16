<template>
	<view class="news_detail">
		<view class="news_title">
			{{newsDetail.title}}
		</view>
		<view class="info">
			<text>发表时间：{{$filters.formatDate(newsDetail.add_time)}}</text>
			<text>浏览：{{newsDetail.click}}</text>
		</view>
		<view class="content">
			<rich-text :nodes="newsDetail.content"></rich-text>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		NewsDetailURL
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				newsDetail: {}
			}
		},
		onLoad(options) {
			this.getNewsDetail(options.id)
		},
		methods: {
			async getNewsDetail(id) {
				const res = await requestGet(NewsDetailURL + id)
				console.log(res)
				this.newsDetail = res.message[0]
			}
		}
	}
</script>

<style lang="less">
	.news_detail {
		padding: 15rpx;

		.news_title {
			text-align: center;
			font-size: 35rpx;
			font-weight: 800;
			padding: 15rpx;
		}

		.info {
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;
			padding: 15rpx;
		}

		.content {
			padding: 15rpx;
			font-size: 28rpx;
			color: gray;
		}
	}
</style>
