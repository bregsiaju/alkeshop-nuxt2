<template>
	<div>
		<section class="page-header">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="content">
							<h1 class="page-name">Checkout</h1>
							<ol class="breadcrumb">
								<li><nuxt-link to="/">Beranda</nuxt-link></li>
								<li class="active">Checkout</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div class="page-wrapper">
			<div class="checkout shopping">
				<div class="container">
					<div class="row">
						<div class="col-md-8">
							<div class="block billing-details">
								<h4 class="widget-title">Detail Penerima</h4>
								<form id="data-diri" class="checkout-form">
									<div class="form-group">
										<label for="full_name">Nama Penerima</label>
										<input
											id="full_name"
											v-model.trim="$v.formData.recipient.$model"
											type="text"
											class="form-control"
											required
										/>
									</div>
									<div class="form-group">
										<label for="user_address">Alamat Lengkap</label>
										<input
											id="user_address"
											v-model.trim="$v.formData.address.$model"
											type="text"
											class="form-control"
											required
										/>
									</div>
									<div class="checkout-country-code clearfix">
										<div class="form-group">
											<label for="user_post_code">Kode Pos</label>
											<input
												id="user_post_code"
												v-model.trim="$v.formData.zipCode.$model"
												type="text"
												class="form-control"
												required
												name="zipcode"
											/>
										</div>
										<div class="form-group">
											<label for="user_city">Provinsi</label>
											<input
												id="user_city"
												v-model.trim="$v.formData.city.$model"
												type="text"
												class="form-control"
												required
												name="city"
											/>
										</div>
									</div>
									<div class="form-group">
										<label for="user_country">Negara</label>
										<input
											id="user_country"
											v-model.trim="$v.formData.country.$model"
											type="text"
											class="form-control"
											required
										/>
									</div>
								</form>
							</div>
							<div class="block">
								<h4 class="widget-title">Metode Pembayaran</h4>
								<div class="checkout-product-details">
									<div class="payment">
										<div class="card-details">
											<button
												v-for="item in methods"
												:key="item.id"
												class="btn btn-main pay me-4"
												:class="{ active: item.id === formData.paymentMethod }"
												@click="formData.paymentMethod = item.id"
											>
												{{ item.name }}
											</button>
											<div v-if="formData.paymentMethod === 1" class="mt-5">
												<p>Bayar saat barang sampai</p>
											</div>
											<div v-if="formData.paymentMethod === 2" class="mt-5">
												<img
													src="~/assets/images/qr-code.png"
													width="300"
													alt=""
												/>
											</div>
											<form
												v-if="formData.paymentMethod === 3"
												class="checkout-form mt-4"
											>
												<div class="form-group">
													<label for="card-number"
														>Card Number <span class="required">*</span></label
													>
													<input
														id="card-number"
														class="form-control"
														type="tel"
														placeholder="•••• •••• •••• ••••"
													/>
												</div>
												<div class="form-group half-width padding-right">
													<label for="card-expiry"
														>Expiry (MM/YY)
														<span class="required">*</span></label
													>
													<input
														id="card-expiry"
														class="form-control"
														type="tel"
														placeholder="MM / YY"
													/>
												</div>
												<div class="form-group half-width padding-left">
													<label for="card-cvc"
														>Card Code <span class="required">*</span></label
													>
													<input
														id="card-cvc"
														class="form-control"
														type="tel"
														maxlength="4"
														placeholder="CVC"
													/>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="product-checkout-details">
								<div class="block">
									<h4 class="widget-title">Ringkasan Pesanan</h4>
									<div class="text-blue">{{ message }}</div>
									<div class="text-danger">{{ error }}</div>
									<CheckoutProduct
										v-for="item in products"
										:key="item.id"
										:data="item"
										@update-msg="getSuccessMsg"
										@error-msg="getErrorMsg"
									/>
									<ul class="summary-prices">
										<li>
											<span>Subtotal:</span>
											<span class="price"
												>Rp{{ $setCurrency(getSubtotal) }}</span
											>
										</li>
										<li>
											<span>Ongkos Kirim:</span>
											<span>Gratis</span>
										</li>
									</ul>
									<div class="summary-total">
										<span>Total</span>
										<span>Rp{{ $setCurrency(getSubtotal) }}</span>
									</div>
									<div class="verified-icon">
										<img src="~/assets/images/shop/verified.png" />
									</div>
								</div>
							</div>
							<button
								class="btn btn-main mt-20"
								:disabled="$v.$invalid"
								@click="checkoutHandler"
							>
								Buat Pesanan
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import CheckoutProduct from '~/components/CheckoutProduct.vue'

export default {
	components: { CheckoutProduct },
	data() {
		return {
			products: [],
			message: '',
			error: '',
			formData: {
				recipient: '',
				address: '',
				zipCode: '',
				city: '',
				country: 'Indonesia',
				paymentMethod: 1
			},
			methods: [
				{
					id: 1,
					name: 'COD'
				},
				{
					id: 2,
					name: 'QRIS'
				},
				{
					id: 3,
					name: 'Debit/Credit Card'
				}
			]
		}
	},
	validations: {
		formData: {
			recipient: {
				required
			},
			address: {
				required
			},
			zipCode: {
				required
			},
			city: {
				required
			},
			country: {
				required
			}
		}
	},
	computed: {
		getSubtotal() {
			const subtotals = this.products.map(item => {
				return item.quantity * item.Product.price
			})

			return subtotals.reduce((total, subtotal) => total + subtotal, 0)
		},
		getTotalItem() {
			const num = this.products.map(item => {
				return item.quantity
			})

			return num.reduce((total, subtotal) => total + subtotal, 0)
		}
	},
	watch: {
		message() {
			this.getProductsOnCart()
		}
	},
	mounted() {
		this.getProductsOnCart()
	},
	methods: {
		async getProductsOnCart() {
			try {
				const detail = await this.$axios.get(`/base/carts`)
				this.products = detail.data.data
			} catch (err) {
				this.error = this.$getErrorMessage(err)
			}
		},
		async checkoutHandler() {
			try {
				const res = await this.$axios.post(`/base/checkout`, {
					...this.formData,
					totalItems: this.getTotalItem,
					totalPrice: this.getSubtotal,
					products: this.products
				})
				// console.log(res.data.data)
				this.$axios.get(`/base/send-invoice/${res.data.data.id}`)
				this.$router.push('/confirmation')
			} catch (err) {
				this.error = this.$getErrorMessage(err)
				setTimeout(() => {
					this.error = ''
				}, 3000)
			}
		},
		getSuccessMsg(msg) {
			this.message = msg
			setTimeout(() => {
				this.message = ''
			}, 3000)
		},
		getErrorMsg(msg) {
			this.error = msg
			setTimeout(() => {
				this.error = ''
			}, 3000)
		}
	}
}
</script>

<style lang="scss" scoped>
.page-wrapper {
	padding: 40px 0 70px 0;
}

.btn-main.pay {
	color: black;
	background-color: white;
	border-color: black;

	&.active {
		color: white;
		background-color: black;
	}
}
</style>
