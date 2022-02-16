<template>
	<uni-list>
		<uni-list-item v-for="item in newsList" :key="item.title" :thumb="item.img_url" thumb-size="lg" :to="`/pages/newsdetail/newsdetail?id=${item.id}`">
			<template #body>
				<view class="item slot-box slot-text">
					<view class="tit">{{item.title}}</view>
					<view class="info">
						<text>发表时间：{{$filters.formatDate(item.add_time) }}</text>
						<text>浏览：{{item.click+123}}次</text>
					</view>
				</view>
			</template>
		</uni-list-item>
	</uni-list>
</template>

<script>
	import {
		requestGet,
		NewsURL
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				newsList: []
			}
		},
		onLoad() {
			this.getNewsList()
		},
		methods: {
			async getNewsList() {
				const res = await requestGet(NewsURL)
				this.newsList = res.message
				console.log(this.newsList)
			}
		}
	}
</script>

<style lang="less">
	.item {
		padding: 5px 10px;
		position: relative;
		display: flex;
		flex-direction: column;

		.tit {
			font-size: 35rpx;
			font-weight: 800;
		}

		.info {
			font-size: 26rpx;
			margin-top: 20rpx;

			text:nth-child(2) {
				margin-left: 20px;
			}
		}
	}
</style>
