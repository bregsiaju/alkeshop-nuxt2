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
			<input v-model="qty" type="number" min="1" />
		</td>
		<td class="text-center">
			<div class="action">
				<p class="text-blue" @click="updateCart">Update</p>
				<p class="product-remove" @click="removeProduct">Hapus</p>
			</div>
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
			qty: this.item.quantity
		}
	},
	methods: {
		async updateCart() {
			try {
				const res = await this.$axios.put('/base/carts', {
					productId: this.item.Product.id,
					quantity: parseInt(this.qty)
				})
				this.$emit('update-msg', res.data.message)
			} catch (err) {
				this.$emit('error-msg', this.$getErrorMessage(err))
			}
		},
		async removeProduct() {
			try {
				const res = await this.$axios.delete(
					`/base/carts/${this.item.Product.id}`
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
.set-qty {
	text-align: center;
	input {
		height: 40px;
		width: 80px;
	}
}

.action {
	height: 100%;
	display: flex;
	align-items: center;
	gap: 16px;
	justify-content: center;

	p {
		margin: 0;

		&:hover {
			cursor: pointer;
		}
	}
}
</style>
