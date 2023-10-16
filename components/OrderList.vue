<template>
	<div class="dashboard-wrapper user-dashboard">
		<div class="table-responsive">
			<table class="table">
				<thead>
					<tr>
						<th>ID Transaksi</th>
						<th>Tanggal Transaksi</th>
						<th>Jumlah Produk</th>
						<th>Total Harga</th>
						<th>Status</th>
						<th></th>
					</tr>
				</thead>
				<tbody v-if="trans.length !== 0">
					<tr v-for="item in trans" :key="item.id">
						<td>{{ item.transNo }}</td>
						<td>{{ $formatDate(item.createdAt) }}</td>
						<td>{{ item.totalItems }}</td>
						<td>Rp{{ $setCurrency(item.totalPrice) }}</td>
						<td>
							<span class="label" :class="getLabel(item.statusOrder)">{{
								item.statusOrder
							}}</span>
						</td>
						<td>
							<a
								data-toggle="modal"
								data-target="#detail-modal"
								class="btn btn-default"
								@click="getDetailTrans(item.id)"
								>Lihat detail</a
							>
							<button
								v-if="
									item.statusOrder !== 'Selesai' &&
									item.statusOrder !== 'Dibatalkan'
								"
								class="btn btn-danger"
								:disabled="item.statusOrder === 'Dikirim'"
								@click="cancelOrder(item.id)"
							>
								Batalkan
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<div v-if="trans.length === 0" class="text-center">
				<p>Belum ada transaksi</p>
			</div>
		</div>

		<!-- MODAL BAYAR DAN LIHAT DETAIL -->
		<div id="detail-modal" class="modal fade" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header fw-bold">
						Detail Transaksi {{ getRecipient.transNo }}
					</div>
					<div class="modal-body">
						<div>
							<div class="mb-3 d-flex">
								<div class="labeling">Penerima</div>
								<span>: {{ getRecipient.recipient }}</span>
							</div>
							<div class="mb-3 d-flex">
								<div class="labeling">Alamat</div>
								<span
									>:
									{{
										`${getRecipient.address}, ${getRecipient.city}, ${getRecipient.country}, ${getRecipient.zipCode}`
									}}</span
								>
							</div>
							<div class="mb-3 d-flex">
								<div class="labeling">Metode Pembayaran</div>
								<span
									>: <strong>{{ getPayment.paymentName }}</strong></span
								>
							</div>
							<table class="table table-bordered mt-4">
								<thead>
									<th class="text-center">Nama Produk</th>
									<th class="text-center">Harga</th>
									<th class="text-center">Jumlah</th>
								</thead>
								<tbody>
									<tr v-for="item in detailTrans" :key="item.id">
										<td>{{ item.Product.productName }}</td>
										<td class="text-center">
											Rp{{ $setCurrency(item.Product.price) }}
										</td>
										<td class="text-center">{{ item.quantity }}x</td>
									</tr>
									<tr>
										<td class="fw-bold">Total Bayar</td>
										<td class="text-center fw-bold">
											Rp{{ $setCurrency(getTotalPrice) }}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<form
							v-if="isDonePayment == 'Menunggu Pembayaran'"
							@submit.prevent="paynow(getRecipient.id)"
						>
							<div class="form-group">
								<label for="bukti-bayar">Bayar</label>
								<input
									id="bukti-bayar"
									class="form-control"
									type="file"
									required
								/>
							</div>
							<div class="text-black mb-4">{{ message }}</div>
							<button type="submit" class="btn btn-main">
								Upload Bukti Pembayaran
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'OrderList',
	data() {
		return {
			trans: [],
			detailTrans: null,
			message: '',
			error: ''
		}
	},
	computed: {
		getRecipient() {
			return this.detailTrans !== null ? this.detailTrans[0].Transaction : {}
		},
		getPayment() {
			return this.detailTrans !== null
				? this.detailTrans[0].Transaction.Payment
				: {}
		},
		getTotalPrice() {
			return this.detailTrans !== null
				? this.detailTrans[0].Transaction.totalPrice
				: ''
		},
		isDonePayment() {
			return this.detailTrans !== null
				? this.detailTrans[0].Transaction.statusOrder
				: ''
		}
	},
	watch: {
		message() {
			this.getTransactions()
		}
	},
	mounted() {
		this.getTransactions()
	},
	methods: {
		async getTransactions() {
			try {
				const res = await this.$axios.get('/base/transactions')
				this.trans = res.data.data
			} catch (err) {
				this.error = this.$getErrorMessage(err)
			}
		},
		async getDetailTrans(id) {
			try {
				const res = await this.$axios.get(`/base/transactions/${id}`)
				this.detailTrans = res.data.data
			} catch (err) {
				this.error = this.$getErrorMessage(err)
			}
		},
		async paynow(transId) {
			try {
				const res = await this.$axios.put(`/base/pay/${transId}`, {
					status: 'Diproses'
				})
				this.message = res.data.message
			} catch (err) {
				this.message = this.$getErrorMessage(err)
			}
		},
		async cancelOrder(transId) {
			try {
				const res = await this.$axios.put(`/base/cancel-order/${transId}`)
				this.message = res.data.message
			} catch (err) {
				this.message = this.$getErrorMessage(err)
			}
		},
		getLabel(status) {
			let label = ''
			if (status === 'Menunggu Pembayaran') {
				label = 'label-warning'
			} else if (status === 'Diproses') {
				label = 'label-primary'
			} else if (status === 'Dikirim') {
				label = 'label-info'
			} else if (status === 'Selesai') {
				label = 'label-success'
			} else {
				label = 'label-danger'
			}
			return label
		}
	}
}
</script>

<style lang="scss" scoped>
p {
	color: black;
}
.labeling {
	min-width: 150px;
}
</style>
