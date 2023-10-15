<template>
	<main class="site-main">
		<section class="signin-page account">
			<div class="container">
				<div class="row">
					<div class="col-md-6 col-md-offset-3">
						<div class="block text-center">
							<nuxt-link to="/" class="logo">
								<img src="/assets/img/AlkeShop.png" width="198px" alt="" />
							</nuxt-link>
							<h2 class="text-center">Daftar Akun 🩺</h2>
							<div v-if="error" class="text-danger">{{ error }}</div>
							<form class="text-left clearfix" @submit.prevent="handleRegister">
								<div class="form-group">
									<input
										v-model.trim="$v.formData.fullName.$model"
										type="text"
										class="form-control"
										placeholder="Nama Lengkap"
										@keypress="error = null"
									/>
									<div
										v-if="$v.formData.fullName.$error"
										class="form-error-msg"
									>
										<div v-if="!$v.formData.fullName.required">Mohon diisi</div>
									</div>
								</div>
								<div class="form-group">
									<input
										v-model.trim="$v.formData.username.$model"
										type="text"
										class="form-control"
										placeholder="Buat username"
										@keypress="error = null"
									/>
									<div
										v-if="$v.formData.username.$error"
										class="form-error-msg"
									>
										<div v-if="!$v.formData.username.required">Mohon diisi</div>
									</div>
								</div>
								<div class="form-group">
									<input
										v-model.trim="$v.formData.email.$model"
										type="email"
										class="form-control"
										placeholder="Email"
										@keypress="error = null"
									/>
									<div v-if="$v.formData.email.$error" class="form-error-msg">
										<div v-if="!$v.formData.email.required">Mohon diisi</div>
										<div v-if="!$v.formData.email.email">
											Email anda tidak valid.
										</div>
									</div>
								</div>
								<div class="form-group">
									<input
										v-model.trim="$v.formData.phone.$model"
										type="text"
										class="form-control"
										placeholder="Nomor Telepon (6281 xxxx xxxx)"
										@keypress="error = null"
									/>
									<div v-if="$v.formData.phone.$error" class="form-error-msg">
										<div
											v-if="
												!$v.formData.phone.required ||
												!$v.formData.phone.numeric
											"
										>
											Mohon diisi dengan angka
										</div>
										<div v-if="!$v.formData.phone.minLength">
											Minimal masukkan
											{{ $v.formData.phone.$params.minLength.min }} karakter
										</div>
									</div>
								</div>
								<div class="form-group">
									<input
										v-model.trim="$v.formData.password.$model"
										type="password"
										class="form-control"
										placeholder="Password"
										@keypress="error = null"
									/>
									<div
										v-if="$v.formData.password.$error"
										class="form-error-msg mb-8"
									>
										<div v-if="!$v.formData.password.required">Mohon diisi</div>
										<div v-if="!$v.formData.password.maxLength">
											Maksimal karakter yang diperbolehkan
											{{ $v.formData.password.$params.maxLength.max }}
										</div>
									</div>
								</div>
								<div class="form-group">
									<input
										v-model.trim="$v.formData.address.$model"
										type="text"
										class="form-control"
										placeholder="Alamat Lengkap"
										@keypress="error = null"
									/>
									<div v-if="$v.formData.address.$error" class="form-error-msg">
										<div v-if="!$v.formData.address.required">Mohon diisi</div>
									</div>
								</div>
								<div class="text-center">
									<button
										type="submit"
										class="btn btn-main text-center"
										:disabled="$v.$invalid"
									>
										Daftar
									</button>
								</div>
							</form>
							<p class="mt-20">
								Sudah punya akun?<nuxt-link to="/masuk"> Masuk</nuxt-link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import {
	required,
	email,
	minLength,
	maxLength,
	numeric
} from 'vuelidate/lib/validators'

export default {
	layout: 'blanklayout',
	data() {
		return {
			error: null,
			formDjata: {
				fullName: null,
				username: null,
				email: null,
				phone: null,
				password: null,
				birthDate: null,
				gender: null,
				address: null
			},
			formData: {
				fullName: 'Bregsi',
				username: 'bregsiaju',
				email: 'bregsiaju@gmail.com',
				phone: '086892783927',
				password: 'bam17bu',
				birthDate: null,
				gender: null,
				address: 'Jl. Surabaya No. 4'
			}
		}
	},
	validations: {
		formData: {
			fullName: {
				required,
				minLength: minLength(4),
				maxLength: maxLength(256)
			},
			username: {
				required,
				minLength: minLength(4),
				maxLength: maxLength(256)
			},
			email: {
				required,
				email,
				minLength: minLength(4),
				maxLength: maxLength(256)
			},
			phone: {
				required,
				numeric,
				minLength: minLength(11),
				maxLength: maxLength(256)
			},
			password: {
				required,
				maxLength: maxLength(20)
			},
			address: {
				required,
				minLength: minLength(4),
				maxLength: maxLength(500)
			}
		}
	},
	methods: {
		async handleRegister() {
			try {
				await this.$axios.post('/base/register', this.formData)
				// console.log(response)
				await this.$auth.loginWith('local', {
					data: {
						username: this.formData.username,
						password: this.formData.password
					}
				})
				this.$router.push('/')
			} catch (err) {
				this.error = this.$getErrorMessage(err)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.form-error-msg {
	color: #a94442;
	font-size: 12px;
}

input {
	font-size: 14px;
}
</style>
