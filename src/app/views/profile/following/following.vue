<template>
	<section class="section fill-backdrop">
		<div class="container">
			<div class="alert alert-info" v-if="!user.following_count">
				<translate>This person isn't following anyone yet.</translate>
			</div>
			<app-follower-list
				v-else
				:url="loadUrl"
				:initial-users="users"
				:count="user.following_count || 0"
			/>
		</div>
	</section>
</template>

<script lang="ts" src="./following"></script>
