<template>
	<main class="site-main">
		<section class="signin-page account">
			<div class="container">
				<div class="row">
					<div class="col-md-6 col-md-offset-3">
						<div class="block text-center">
							<a class="logo" href="index.html">
								<img src="/assets/img/AlkeShop.svg" alt="" />
							</a>
							<h2 class="text-center">Welcome Back</h2>
							<form
								action=""
								class="text-left clearfix"
								@submit.prevent="login"
							>
								<div class="form-group">
									<input
										v-model="formData.username"
										type="text"
										class="form-control"
										placeholder="Username"
									/>
								</div>
								<div class="form-group">
									<input
										v-model="formData.password"
										type="password"
										class="form-control"
										placeholder="Password"
									/>
								</div>
								<div class="text-center">
									<button type="submit" class="btn btn-main text-center">
										Login
									</button>
								</div>
							</form>
							<p class="mt-20">
								Belum punya akun?<nuxt-link to="/daftar"> Daftar</nuxt-link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
export default {
	layout: 'blanklayout',
	data() {
		return {
			redirectPage: this.$route.query.dari || '/',
			newPswEye: true,
			formData: {
				username: 'amatbanyak',
				password: 'bintang123'
			}
		}
	},
	methods: {
		async login() {
			try {
				const response = await this.$auth.loginWith('local', {
					data: this.formData
				})
				const fk = await this.$axios.get('/base/current-user')
				console.log(fk)
				console.log(response)
				this.$router.push('/')
			} catch (err) {
				console.log(err)
			}
		}
	}
}
</script>

<style lang="scss" scoped></style>
