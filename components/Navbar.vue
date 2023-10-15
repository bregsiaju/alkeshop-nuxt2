<template>
	<!-- Start Top Header Bar -->
	<section class="top-header">
		<div class="container">
			<div class="row d-flex align-items-center">
				<div class="col-md-4 col-xs-12 col-sm-4">
					<!-- Site Logo -->
					<div class="logo">
						<span class="suntik">🩺</span>
						<nuxt-link to="/">
							<!-- replace logo here -->
							<img src="/assets/img/AlkeShop.png" width="158px" class="logo" />
						</nuxt-link>
					</div>
				</div>
				<div class="col-md-8 col-xs-12 col-sm-4">
					<!-- Cart -->
					<ul v-if="isLoggedIn" class="top-menu text-right list-inline">
						<li class="cart-nav dropdown-slide">
							<nuxt-link to="/keranjang" class="dropdown-toggle"
								><i class="tf-ion-android-cart"></i>Keranjang</nuxt-link
							>
						</li>
						<!-- / Cart -->

						<!-- Search -->
						<li class="dropdown search dropdown-slide">
							<a
								class="dropdown-toggle"
								data-toggle="dropdown"
								data-hover="dropdown"
							>
								<i class="tf-ion-ios-search-strong"></i> Cari
							</a>
							<ul class="dropdown-menu search-dropdown">
								<li>
									<form action="post">
										<input
											type="search"
											class="form-control"
											placeholder="Cari nama produk..."
										/>
									</form>
								</li>
							</ul>
						</li>
						<!-- / Search -->

						<!-- Profile -->
						<li>
							<nuxt-link to="/profil">
								<i class="fa-regular fa-user"></i>
								<span class="ms-2">Profil</span>
							</nuxt-link>
						</li>
						<!-- / Profile -->

						<!-- Logout -->
						<li>
							<div class="dropdown-toggle logout" @click="logout">
								<i class="tf-ion-log-out"></i>
								<span class="ms-1">Logout</span>
							</div>
						</li>
						<!-- / Logout -->
					</ul>
					<ul v-else class="top-menu text-right list-inline">
						<li>
							<nuxt-link to="/masuk" class="dropdown-toggle"
								><i class="tf-ion-log-in"></i>Masuk</nuxt-link
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
	<!-- End Top Header Bar -->
</template>

<script>
export default {
	name: 'Navbar',
	data() {
		return {}
	},
	computed: {
		isLoggedIn() {
			return this.$auth.loggedIn
		}
	},
	methods: {
		async logout() {
			await this.$auth.logout(this.$router.push('/masuk'))
		}
	}
}
</script>

<style lang="scss" scoped>
.logout {
	color: rgb(214, 70, 70);
	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
}

.dropdown-menu {
	top: 28px;
	right: 100px;
}

.suntik {
	font-size: 30px;
}
</style>
