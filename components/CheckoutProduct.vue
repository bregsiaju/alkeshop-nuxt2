<template>
	<div class="media product-card mb-5">
		<nuxt-link class="pull-left" :to="`/produk/${data.productId}`">
			<img class="media-object" :src="data.Product.productImage" alt="Image" />
		</nuxt-link>
		<div class="media-body">
			<h4 class="media-heading">
				<nuxt-link :to="`/produk/${data.productId}`">{{
					data.Product.productName
				}}</nuxt-link>
			</h4>
			<p class="price">
				{{ data.quantity }} x Rp{{ $setCurrency(data.Product.price) }}
			</p>
			<span class="remove text-danger" @click="removeProduct">Hapus</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CheckoutProduct',
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	methods: {
		async removeProduct() {
			try {
				const res = await this.$axios.delete(
					`/base/carts/${this.data.productId}`
				)
				this.$emit('update-msg', res.data.message)
			} catch (err) {
				this.$emit('error-msg', this.$getErrorMessage(err))
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.price {
	margin: 8px 0 !important;
}
</style>
