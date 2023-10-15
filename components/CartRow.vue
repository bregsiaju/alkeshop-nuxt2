<template>
	<tr>
		<td>
			<nuxt-link
				:to="`/produk/${item.Product.id}`"
				class="product-info d-flex align-items-center"
			>
				<img width="80" :src="item.Product.productImage" alt="" />
				<div class="ms-4">
					<h5 class="fw-bold mt-0">
						{{ item.Product.productName }}
					</h5>
					<span>Rp{{ $setCurrency(item.Product.price) }}</span>
				</div>
			</nuxt-link>
		</td>
		<td class="set-qty">
			<input v-model="getQty" type="number" min="1" />
		</td>
		<td class="text-center px-5">
			<nuxt-link :to="`/kej${item.Product.id}`" class="text-blue me-4"
				>Update</nuxt-link
			>
			<a class="product-remove" href="#!">Remove</a>
		</td>
	</tr>
</template>

<script>
export default {
	name: 'CartRow',
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			qty: 1
		}
	},
	computed: {
		getQty() {
			return this.item.quantity
		}
	}
}
</script>

<style lang="scss" scoped>
.set-qty {
	text-align: center;
	input {
		height: 40px;
		width: 80px;
	}
}
</style>
