<template>
	<view class="goods">
		<swiper indicator-dots>
			<swiper-item v-for="item in lunboinfo" :key="item.src">
				<image :src="item.src"></image>
			</swiper-item>
		</swiper>
		<view class="good_info">
			<view class="price">
				<text>￥{{info.sell_price}}</text>
				<text>￥{{info.market_price}}</text>
			</view>
			<view class="goods_title">{{info.title}}</view>
			<view class="goods_title">货号：{{info.goods_no}}</view>
			<view class="goods_title">库存：{{info.stock_quantity}}</view>
		</view>
		<view class="good_detail">
			<view class="tit">详情介绍</view>
			<view class="content">
				<!-- #ifdef H5 -->
				<div v-html="content"></div>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<rich-text :nodes="content"></rich-text>
				<!-- #endif -->
			</view>
		</view>
		<uni-goods-nav class="goodnav" :fill="true" :button-group="buttonGroup" @click="onClick"
			@buttonClick="buttonClick">
		</uni-goods-nav>
	</view>
</template>

<script>
	import {
		requestGet,
		ThumimagesURL,
		GoodInfoURL,
		GooddescURL
	} from '@/utils/http.js'
	import {
		formatRichText
	} from '@/utils/format.js'
	export default {
		data() {
			return {
				id: null,
				lunboinfo: [],
				info: {},
				content: {},
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getDetail()
			this.getDetailInfo();
			this.getDetailContent();
		},
		methods: {
			async getDetail() {
				const res = await requestGet(ThumimagesURL + this.id)
				this.lunboinfo = res.message
			},
			async getDetailInfo() {
				const res = await requestGet(GoodInfoURL + this.id)
				this.info = res.message[0]
			},
			async getDetailContent() {
				const res = await requestGet(GooddescURL + this.id)
				this.content = res.message[0].content
				this.content = formatRichText(this.content)
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="less">
	.goods {
		swiper {
			height: 562rpx;

			image {
				width: 100%;
				height: 562rpx;
			}
		}

		.good_info {
			padding: 10px;

			.price {
				font-size: 35rpx;
				color: pink;
				line-height: 80rpx;

				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.goods_title {
				font-size: 32rpx;
				line-height: 60rpx;
			}
		}

		.good_detail {
			padding-bottom: 50px;

			.tit {
				font-size: 32rpx;
				padding-left: 10px;
				border-bottom: 1px solid #eee;
				line-height: 70rpx;
			}

			.content {
				padding: 10px;
				font-size: 28rpx;
				color: #333;
				line-height: 50rpx;
			}
		}
		
		.goodnav{
			position: fixed;
			z-index: 100;
			bottom: 0;
			width: 100%;
		}
	}
</style>
