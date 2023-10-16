<template>
	<section class="page-wrapper success-msg">
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-md-offset-3">
					<div class="block text-center">
						<i class="tf-ion-android-checkmark-circle"></i>
						<h2 class="text-center">Terima kasih!</h2>
						<p>
							Pesanan Anda sudah kami terima. Pantau status pesanan
							<nuxt-link to="/profil">di sini</nuxt-link>
						</p>
						<nuxt-link to="/" class="btn btn-main mt-20"
							>Lanjut belanja</nuxt-link
						>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
