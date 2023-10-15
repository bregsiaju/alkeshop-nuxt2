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
										<h4 class="panel-title">
											<a
												role="button"
												data-toggle="collapse"
												data-parent="#accordion"
												href="#collapseOne"
												aria-expanded="true"
												aria-controls="collapseOne"
											>
												Shoes
											</a>
										</h4>
									</div>
									<div
										id="collapseOne"
										class="panel-collapse collapse in"
										role="tabpanel"
										aria-labelledby="headingOne"
									>
										<div class="panel-body">
											<ul>
												<li><a href="#!">Brand & Twist</a></li>
												<li><a href="#!">Shoe Color</a></li>
												<li><a href="#!">Shoe Color</a></li>
											</ul>
										</div>
									</div>
								</div>
								<div class="panel panel-default">
									<div id="headingTwo" class="panel-heading" role="tab">
										<h4 class="panel-title">
											<a
												class="collapsed"
												role="button"
												data-toggle="collapse"
												data-parent="#accordion"
												href="#collapseTwo"
												aria-expanded="false"
												aria-controls="collapseTwo"
											>
												Duty Wear
											</a>
										</h4>
									</div>
									<div
										id="collapseTwo"
										class="panel-collapse collapse"
										role="tabpanel"
										aria-labelledby="headingTwo"
									>
										<div class="panel-body">
											<ul>
												<li><a href="#!">Brand & Twist</a></li>
												<li><a href="#!">Shoe Color</a></li>
												<li><a href="#!">Shoe Color</a></li>
											</ul>
										</div>
									</div>
								</div>
								<div class="panel panel-default">
									<div id="headingThree" class="panel-heading" role="tab">
										<h4 class="panel-title">
											<a
												class="collapsed"
												role="button"
												data-toggle="collapse"
												data-parent="#accordion"
												href="#collapseThree"
												aria-expanded="false"
												aria-controls="collapseThree"
											>
												WorkOut Shoes
											</a>
										</h4>
									</div>
									<div
										id="collapseThree"
										class="panel-collapse collapse"
										role="tabpanel"
										aria-labelledby="headingThree"
									>
										<div class="panel-body">
											<ul>
												<li><a href="#!">Brand & Twist</a></li>
												<li><a href="#!">Shoe Color</a></li>
												<li><a href="#!">Gladian Shoes</a></li>
												<li><a href="#!">Swis Shoes</a></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- end kategori -->

					<!-- produk -->
					<div class="col-md-9">
						<div class="row">
							<div
								v-for="product in products"
								:key="product.id"
								class="col-md-4"
							>
								<ProductCard :data="product" />
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
			products: []
		}
	},
	mounted() {
		this.getProduct()
	},
	methods: {
		async getProduct() {
			try {
				const res = await this.$axios.get('/base/products')
				this.products = res.data.data
				console.log(res.data.data)
			} catch (err) {
				this.error = this.$getErrorMessage(err)
			}
		}
	}
}
</script>

<style lang="scss" scoped></style>
