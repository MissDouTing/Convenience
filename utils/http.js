const baseUrl = "http://mazg.xyz:8082"

export function requestGet(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method: "GET",
			data: data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}

export function requestPost(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: "POST",
			data: data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}

export const LunboURL = "/api/getlunbo"   //GET
export const GoodURL  ="/api/getgoods"   //GET pageindex
export const ImageCategoryURL = "/api/getimgcategory"  //GET
export const ImagesURL = "/api/getimages/"     //GET  :id
export const NewsURL = "/api/getnewslist"      //GET
export const NewsDetailURL = "/api/getnew/"    //GET  :id
export const ThumimagesURL = "/api/getthumimages/"   //GET  :id
export const GoodInfoURL = "/api/goods/getinfo/"    //GET  :id
export const GooddescURL = "/api/goods/getdesc/"   //GET :id