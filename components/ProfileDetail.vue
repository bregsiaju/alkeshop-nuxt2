<template>
	<div class="dashboard-wrapper dashboard-user-profile">
		<div class="media">
			<div class="pull-left text-center" href="#!">
				<img
					class="media-object user-img"
					src="~assets/images/self.jpg"
					alt="Image"
				/>
			</div>
			<div class="media-body">
				<ul class="user-profile-list">
					<li><span>Nama Lengkap</span>: {{ profil.fullName }}</li>
					<li><span>Username</span>: {{ profil.username }}</li>
					<li><span>Email</span>: {{ profil.email }}</li>
					<li><span>No. HP</span>: {{ profil.phone }}</li>
					<li><span>Alamat</span>: {{ profil.address }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProfileDetail',
	computed: {
		profil({ $auth }) {
			return this.$auth.user.data
		}
	}
}
</script>

<style lang="scss" scoped>
.user-profile-list span {
	width: auto;
	min-width: 120px;
}
</style>
