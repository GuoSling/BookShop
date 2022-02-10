<template>
	<view class="u-p-l-30 u-p-r-20">
		<u-form :model="form" :error-type="errorType" ref="uForm">
			<u-form-item label="昵称" prop="name" :required="true">
				<u-input placeholder="请输入昵称" v-model="form.name" />
			</u-form-item>
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				form:{
					name:"",
				},
				errorType: ['message'],//校验不通过提示信息类型
				rules: {//验证规则
					name: [
						{ 
							required: true, //必填
							message: '请输入昵称',//相当于placeholder 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					]
				}
			}
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						console.log('验证通过');
						// 更新用户信息
						await this.$u.api.userInfoUpdata(this.form)
						this.$u.utails.updateUser()
						// 提示信息
						this.$u.toast('更新成功')
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		// / 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			this.form.name = this.vuex_user.name
		}
	}
</script>

<style>

</style>
