<template>
	<ul class="sans-margin">
		<li>
			<router-link
				:to="{ name: 'dash.games.manage.api.overview' }"
				:class="{ active: $route.name === 'dash.games.manage.api.overview' }"
			>
				<translate>Overview</translate>
			</router-link>
		</li>
		<li>
			<router-link
				:to="{ name: 'dash.games.manage.api.trophies.list' }"
				:class="{ active: $route.name.indexOf('dash.games.manage.api.trophies') === 0 }"
			>
				<translate>Trophies</translate>
			</router-link>
		</li>
		<li>
			<router-link
				:to="{ name: 'dash.games.manage.api.scoreboards.list' }"
				:class="{ active: $route.name.indexOf('dash.games.manage.api.scoreboards') === 0 }"
			>
				<translate>Scores</translate>
			</router-link>
		</li>
		<li>
			<router-link
				:to="{ name: 'dash.games.manage.api.data-storage.items.list' }"
				:class="{ active: $route.name.indexOf('dash.games.manage.api.data-storage') === 0 }"
			>
				<translate>Data Storage</translate>
			</router-link>
		</li>
		<li>
			<router-link :to="{ name: 'dash.games.manage.api.settings' }" active-class="active">
				<translate>API Settings</translate>
			</router-link>
		</li>
	</ul>
</template>

<script lang="ts" src="./nav"></script>
