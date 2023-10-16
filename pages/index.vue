<template>
	<div>
		<section class="page-header">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="content">
							<p>Alat Kesehatan Terbaik untuk Kehidupan Lebih Sehat.</p>
							<h1 class="page-name text-bold">Produk</h1>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div class="text-center text-blue fw-medium">{{ cartMsg }}</div>
		<section class="products section">
			<div class="container">
				<div class="row">
					<!-- kategori -->
					<div class="col-md-3">
						<div class="widget product-category">
							<h4 class="widget-title">Kategori Produk</h4>
							<div
								id="accordion"
								class="panel-group commonAccordion"
								role="tablist"
								aria-multiselectable="true"
							>
								<div class="panel panel-default">
									<div id="headingOne" class="panel-heading" role="tab">
										<h4
											class="panel-title"
											:class="{ active: activeCat === 0 }"
											@click="activeCat = 0"
										>
											<a role="button" @click="getProduct">Semua Produk</a>
										</h4>
									</div>
								</div>
								<div
									v-for="item in categories"
									:key="item.id"
									class="panel panel-default"
								>
									<div id="headingOne" class="panel-heading" role="tab">
										<h4
											class="panel-title"
											:class="{ active: activeCat === item.id }"
										>
											<a role="button" @click="filterByCategory(item.id)">
												{{ item.categoryName }}
											</a>
										</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- end kategori -->

					<!-- produk -->
					<div class="col-md-9">
						<div class="row row-cols-3">
							<div
								v-for="product in products"
								:key="product.id"
								class="col-md-4"
							>
								<ProductCard :data="product" @success-cart="getMessageCart" />
							</div>
						</div>
					</div>
					<!-- end produk -->
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import ProductCard from '~/components/ProductCard.vue'

export default {
	components: { ProductCard },
	data() {
		return {
			error: null,
			products: [],
			categories: [],
			cartMsg: '',
			activeCat: 0
		}
	},
	mounted() {
		this.getProduct()
		this.getCategory()
	},
	methods: {
		async getProduct() {
			try {
				const res = await this.$axios.get('/base/products')
				this.products = res.data.data
				// console.log(res.data.data)
			} catch (err) {
				this.error = this.$getErrorMessage(err)
			}
		},
		async getCategory() {
			try {
				const res = await this.$axios.get('/base/categories')
				this.categories = res.data.data
			} catch (err) {
				this.error = this.$getErrorMessage(err)
			}
		},
		async filterByCategory(id) {
			try {
				const res = await this.$axios.get(`/base/filter-category/${id}`)
				this.products = res.data.data
				this.activeCat = id
			} catch (err) {
				this.error = this.$getErrorMessage(err)
			}
		},
		getMessageCart(msg) {
			this.cartMsg = msg
			setTimeout(() => {
				this.cartMsg = ''
			}, 3000)
		}
	}
}
</script>

<style lang="scss" scoped>
.section {
	padding: 50px 0 80px 0;
}

.row {
	display: flex;
	flex-wrap: wrap;
}

.panel-title {
	&.active {
		background-color: #00a6ed;
		a {
			color: white;
			font-weight: bold;
		}
	}
}
</style>
