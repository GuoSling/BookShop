<template>
	<view>
		<u-upload 
		ref="upload"
		:action="action" 
		:max-size="5 * 1204 * 1024"
		 max-count="1"
		:multiple="false"
		:before-upload="beforeUpload"
		:custom-btn="true"
		:show-progress="false"
		:form-data="formData"
		:deletable="false"
		height="0"
		width="0"
		@on-success="onSuccess">
		<u-avatar slot="addBtn" :src="vuex_user.avatar_url" size="140"> </u-avatar>
		</u-upload>
	</view>
</template>

<script>
	let _this;
	export default {
		name:"oss-upload",
		data() {
			return {
				action: '',
				formData:{},
				upFileName:''
			}
		},
		created() {
			_this = this
		},
		methods:{
		async beforeUpload(index, list) {
				const {file} = list[0]
				// #ifdef H5 
				const fileName = file.name
				// #endif

				// #ifndef H5
				const FileName = file.path
				// #endif
				 
			// 请求aip获取ossToken
			const ossToken  = 	await _this.$u.api.authOssToken()
			_this.action = ossToken.host
			
			// 处理唯一文件名
			const suffix = fileName ? fileName.slice(fileName.lastIndexOf('.')) : FileName.slice(FileName.lastIndexOf('.'))
			_this.upFileName =  _this.$u.guid(20) + suffix
				_this.formData = {
					'key':_this.upFileName,
					'policy':ossToken.policy,
					'OSSAccessKeyId':ossToken.accessid,
					'success_action_status':'200',
					'signature':ossToken.signature,
				}
				return true;
			},
			// 上传成功处理函数
			async onSuccess(){
				// 移除预览区的图片
				this.$refs.upload.remove(0)
				await this.$u.api.userAvatar({avatar:_this.upFileName})
				// 调用自己封装的更新用户信息api
				this.$u.utails.updateUser()
				// 提示信息
				this.$u.toast('头像更新成功')
			}
		}
	}
</script>

<style>

</style>
