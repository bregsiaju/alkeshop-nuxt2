<template>
	<div>
		<section class="page-header">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="content">
							<h1 class="page-name">Keranjang Belanja</h1>
							<ol class="breadcrumb">
								<li><nuxt-link to="/">Beranda</nuxt-link></li>
								<li class="active">Keranjang</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section v-if="products.length === 0" class="empty-cart page-wrapper">
			<div class="container">
				<div class="row">
					<div class="col-md-6 col-md-offset-3">
						<div class="block text-center">
							<i class="tf-ion-ios-cart-outline"></i>
							<h2 class="text-center">Keranjangnya masih kosong</h2>
							<nuxt-link to="/" class="btn btn-main mt-20"
								>Kembali ke halaman produk</nuxt-link
							>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div v-else class="page-wrapper">
			<p class="text-blue text-center">{{ message }}</p>
			<p class="text-danger text-center">{{ errorMsg }}</p>
			<div class="cart shopping">
				<div class="container">
					<div class="row d-flex justify-content-center">
						<div class="col-md-10">
							<div class="block">
								<div class="product-list">
									<form method="post">
										<table class="table">
											<thead>
												<tr>
													<th class="text-center">Nama Produk</th>
													<th class="text-center">Jumlah</th>
													<th class="text-center">Aksi</th>
												</tr>
											</thead>
											<tbody>
												<CartRow
													v-for="product in products"
													:key="product.id"
													:item="product"
													@update-msg="getMessage"
													@error-msg="getErrorMsg"
												/>
											</tbody>
										</table>
										<div class="pull-right">
											<nuxt-link to="/checkout" class="btn btn-main"
												>Checkout</nuxt-link
											>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CartRow from '~/components/CartRow.vue'

export default {
	components: { CartRow },
	data() {
		return {
			cartQty: 1,
			products: [],
			message: '',
			errorMsg: ''
		}
	},
	watch: {
		message() {
			this.getProduct()
		}
	},
	mounted() {
		this.getProduct()
	},
	methods: {
		async getProduct() {
			try {
				const detail = await this.$axios.get(`/base/carts`)
				this.products = detail.data.data
			} catch (err) {
				this.errorMsg = this.$getErrorMessage(err)
			}
		},
		getMessage(msg) {
			this.message = msg
			setTimeout(() => {
				this.message = ''
			}, 3000)
		},
		getErrorMsg(msg) {
			this.errorMsg = msg
			setTimeout(() => {
				this.errorMsg = ''
			}, 3000)
		}
	}
}
</script>

<style lang="scss" scoped>
.page-wrapper {
	padding: 20px 0 70px 0;
}

table * {
	font-size: 16px;
}

.btn-main {
	font-weight: 600;
}
</style>
