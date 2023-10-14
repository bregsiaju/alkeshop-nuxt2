<template>
	<div id="app" class="sticky-footer-container">
		<div class="sticky-footer-container-item">
			<Navbar />
		</div>
		<div class="sticky-footer-container-item --pushed">
			<nuxt />
		</div>
		<div class="sticky-footer-container-item">
			<Footer />
		</div>
	</div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

export default {
	name: 'DefaultLayout',
	components: { Navbar, Footer }
}
</script>
