<template>
	<div class="product-item">
		<div class="product-thumb">
			<!-- <span class="bage">Sale</span> -->
			<img class="img-responsive" :src="data.productImage" alt="product-img" />
			<div class="preview-meta">
				<ul>
					<li>
						<nuxt-link :to="`/produk/${data.id}`">
							<i class="tf-ion-ios-search-strong"></i>
						</nuxt-link>
					</li>
					<li>
						<a href="#!"><i class="tf-ion-android-cart"></i></a>
					</li>
				</ul>
			</div>
		</div>
		<div class="product-content">
			<h4>{{ data.productName }}</h4>
			<p class="price">{{ formatRupiah(data.price) }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProductCard',
	props: {
		data: {
			type: Array,
			required: true
		}
	},
	methods: {
		formatRupiah(nom) {
			return `Rp${this.$setCurrency(nom)}`
		}
	}
}
</script>

<style lang="scss" scoped></style>
