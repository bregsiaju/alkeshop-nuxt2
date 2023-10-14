<template>
	<main class="site-main"></main>
</template>

<script>
export default {
	jsonld() {
		return this.$jsonLD({
			jsonLDObjects: {
				name: 'Static',
				description: 'Static list page'
			}
		})
	}
}
</script>

<style lang="scss" scoped></style>
