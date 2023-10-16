<template>
	<div>
		<section class="page-header">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="content">
							<h1 class="page-name">Dashboard</h1>
							<ol class="breadcrumb">
								<li><nuxt-link to="/">Beranda</nuxt-link></li>
								<li class="active">Akun dan Riwayat Pesan</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="user-dashboard page-wrapper">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<ul class="list-inline dashboard-menu text-center">
							<li
								v-for="item in menu"
								:key="item.id"
								@click="activeMenu = item.id"
							>
								<a :class="{ active: item.id === activeMenu }">{{
									item.title
								}}</a>
							</li>
						</ul>
						<component :is="getComponent"></component>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import ProfileDetail from '~/components/ProfileDetail.vue'
import OrderList from '~/components/OrderList.vue'

export default {
	components: {
		ProfileDetail,
		OrderList
	},
	data() {
		return {
			activeMenu: 1,
			menu: [
				{
					id: 1,
					title: 'Detail Profil'
				},
				{
					id: 2,
					title: 'Riwayat Pesanan'
				}
			]
		}
	},
	computed: {
		getComponent() {
			if (this.activeMenu === 1) {
				return ProfileDetail
			} else {
				return OrderList
			}
		}
	}
}
</script>

<style lang="scss" scoped>
a {
	&:hover {
		cursor: pointer;
	}
}
</style>
