<template>
	<div>
		<ul class="sans-margin game-dash-nav">
			<li v-if="!isWizard">
				<router-link
					:to="{
						name: 'dash.games.manage.game.overview',
						query: $route.query,
					}"
					active-class="active"
					exact
				>
					<translate>Overview</translate>
				</router-link>
			</li>
			<app-game-perms tag="li" required="builds,sales" :either="true">
				<router-link
					:to="{
						name: 'dash.games.manage.game.details',
						query: $route.query,
					}"
					active-class="active"
				>
					<app-manage-game-nav-required :is-complete="true" />
					<translate>Details</translate>
				</router-link>
			</app-game-perms>
			<app-game-perms tag="li" required="details,media" :either="true">
				<router-link
					:to="{
						name: 'dash.games.manage.game.description',
						query: $route.query,
					}"
					active-class="active"
				>
					<app-manage-game-nav-required :is-complete="game.hasDescription" />
					<translate>Description</translate>
				</router-link>
			</app-game-perms>
			<app-game-perms tag="li" required="media">
				<router-link
					:to="{
						name: 'dash.games.manage.game.design',
						query: $route.query,
					}"
					active-class="active"
				>
					<app-manage-game-nav-required :is-complete="!!game.thumbnail_media_item" />
					<translate>Design</translate>
				</router-link>
			</app-game-perms>
			<app-game-perms
				tag="li"
				required="builds,sales"
				:either="true"
				v-if="!isWizard || !game._is_devlog"
			>
				<router-link
					:to="{
						name: 'dash.games.manage.game.packages.list',
						query: $route.query,
					}"
					:class="{
						active: $route.name.indexOf('dash.games.manage.game.packages') === 0,
					}"
				>
					<app-manage-game-nav-required
						v-if="!game._is_devlog"
						:is-complete="game.has_active_builds"
					/>
					<translate>Packages</translate>
				</router-link>
			</app-game-perms>
			<app-game-perms tag="li" required="details">
				<router-link
					:to="{
						name: 'dash.games.manage.game.maturity',
						query: $route.query,
					}"
					active-class="active"
				>
					<app-manage-game-nav-required :is-complete="!!game.tigrs_age" />
					<translate>Maturity</translate>
				</router-link>
			</app-game-perms>
			<app-game-perms tag="li" required="music" v-if="!isWizard || !game._is_devlog">
				<router-link
					:to="{
						name: 'dash.games.manage.game.music',
						query: $route.query,
					}"
					active-class="active"
				>
					<translate>Music</translate>
				</router-link>
			</app-game-perms>
			<app-game-perms tag="li" required="all" v-if="!isWizard && app.user.id === game.developer.id">
				<router-link
					:to="{
						name: 'dash.games.manage.game.linked-accounts',
						query: $route.query,
					}"
					active-class="active"
				>
					<translate>Linked Accounts</translate>
				</router-link>
			</app-game-perms>
			<app-game-perms tag="li">
				<router-link
					:to="{
						name: 'dash.games.manage.game.settings',
						query: $route.query,
					}"
					active-class="active"
				>
					<translate>Settings</translate>
				</router-link>
			</app-game-perms>
		</ul>

		<app-game-perms
			required="all"
			tag="div"
			class="hidden-xs"
			v-if="$route.name !== 'dash.games.manage.game.wizard-finish'"
		>
			<app-button
				v-if="game.status === Game.STATUS_HIDDEN"
				primary
				block
				:disabled="!canPublish"
				@click="publish"
			>
				<translate>Publish</translate>
			</app-button>

			<app-button v-if="isWizard" primary block @click="saveDraft">
				<translate class="visible-lg">Save Draft</translate>
				<translate class="visible-md">Save</translate>
			</app-button>
		</app-game-perms>
	</div>
</template>

<style lang="stylus" scoped>
@require '~styles/variables'

// Needed for the icons to show correctly.
.game-dash-nav
	li > a
		position: relative
</style>

<script lang="ts" src="./nav"></script>
