<template>
	<section v-if="!loading" class="single-product">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<ol class="breadcrumb">
						<li><nuxt-link to="/">Beranda</nuxt-link></li>
						<li>
							<nuxt-link to="/">{{ product.Category.categoryName }}</nuxt-link>
						</li>
						<li class="active">{{ product.productName }}</li>
					</ol>
				</div>
			</div>
			<div class="row">
				<div class="col-md-5">
					<div class="single-product-slider">
						<div
							id="carousel-custom"
							class="carousel slide"
							data-ride="carousel"
						>
							<div class="carousel-outer">
								<!-- me art lab slider -->
								<div class="carousel-inner">
									<div class="item active">
										<img
											:src="product.productImage"
											alt=""
											:data-zoom-image="product.productImage"
										/>
									</div>
								</div>
							</div>

							<!-- thumb -->
							<ol class="carousel-indicators mCustomScrollbar meartlab">
								<li
									data-target="#carousel-custom"
									data-slide-to="0"
									class="active"
								>
									<img :src="product.productImage" :alt="product.productName" />
								</li>
							</ol>
						</div>
					</div>
				</div>
				<div class="col-md-7">
					<div class="single-product-details">
						<h2>{{ product.productName }}</h2>
						<h4 class="product-price">Rp{{ $setCurrency(product.price) }}</h4>
						<div
							class="product-description desc mt-20"
							v-html="product.description"
						></div>
						<div class="product-category">
							<span>Kategori Produk</span>
							<ul>
								<li>: {{ product.Category.categoryName }}</li>
							</ul>
						</div>
						<div class="product-category">
							<span>Stok Produk</span>
							<ul>
								<li>: {{ product.stock }} pcs</li>
							</ul>
						</div>
						<div class="add-cart mt-20 d-flex align-items-center">
							<div class="d-flex align-items-center me-4">
								<i
									class="tf-ion-minus-circled text-black"
									@click="decreaseQty"
								></i>
								<p class="quantity">{{ cartQty }}</p>
								<i
									class="tf-ion-plus-circled text-black"
									@click="cartQty++"
								></i>
							</div>
							<div class="btn btn-main" @click="addToCart">Add To Cart</div>
						</div>
						<p class="mt-3 text-black">
							{{ successMsg ? successMsg : '' }}
						</p>
						<p class="mt-3 text-danger">
							{{ error ? error : '' }}
						</p>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<div class="tabCommon mt-20">
						<ul class="nav nav-tabs">
							<li class="active">
								<a data-toggle="tab" href="#details" aria-expanded="true"
									>Details</a
								>
							</li>
							<li class="">
								<a data-toggle="tab" href="#reviews" aria-expanded="false"
									>Reviews</a
								>
							</li>
						</ul>
						<div class="tab-content patternbg">
							<div id="details" class="tab-pane fade active in">
								<h4>Deskripsi Produk</h4>
								<div class="desc" v-html="product.description"></div>
							</div>
							<div id="reviews" class="tab-pane fade">
								<div class="post-comments">
									<ul class="media-list comments-list m-bot-50 clearlist">
										<li>
											<h3>Belum ada ulasan</h3>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	asyncData({ params }) {
		const slug = params.slug
		return { slug }
	},
	data() {
		return {
			product: {},
			loading: true,
			cartQty: 1,
			successMsg: null,
			error: null
		}
	},
	mounted() {
		this.getDetailProduk()
	},
	methods: {
		async getDetailProduk() {
			try {
				const detail = await this.$axios.get(`/base/products/${this.slug}`)
				this.product = detail.data.data
				this.loading = false
			} catch (err) {
				this.error = this.$getErrorMessage(err)
			}
		},
		decreaseQty() {
			if (this.cartQty > 1) {
				this.cartQty--
			}
		},
		async addToCart() {
			try {
				const res = await this.$axios.post('/base/carts', {
					productId: this.slug,
					quantity: this.cartQty
				})
				this.successMsg = res.data.message
				this.cartQty = 1
			} catch (err) {
				this.error = this.$getErrorMessage(err)
			} finally {
				setTimeout(() => {
					this.successMsg = null
				}, 3000)
				setTimeout(() => {
					this.error = null
				}, 3000)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
$blue: #00a6ed;

.product-price {
	font-weight: 700 !important;
	color: $blue;
	font-size: 21px;
}

.add-cart {
	i {
		font-size: 20px;

		&:hover {
			cursor: pointer;
		}
	}

	.quantity {
		min-width: 30px;
		text-align: center;
		margin-bottom: 0;
		font-size: 18px;
	}
}

.btn-main {
	background-color: $blue;
	font-weight: 600;
}

.desc {
	/deep/ li {
		margin-left: 28px;
		list-style-type: '\1F4CC';
	}
}
</style>

<style lang="scss">
$blue: #00a6ed;

.text-black {
	color: black;
}

.text-blue {
	color: $blue;
}
</style>
