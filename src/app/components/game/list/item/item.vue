<template>
	<div class="game-list-item">
		<router-link
			class="-thumb"
			:to="url"
			v-app-track-event="eventLabel ? 'game-list:click:' + eventLabel : undefined"
		>
			<app-game-thumbnail-img :game="game" />
		</router-link>

		<div class="-meta">
			<router-link
				class="-title -spacing link-unstyled"
				:to="url"
				:title="game.title"
				v-app-track-event="eventLabel ? 'game-list:click:' + eventLabel : undefined"
			>
				{{ game.title }}
			</router-link>

			<app-user-card-hover class="-dev -spacing" :user="game.developer">
				<router-link
					class="link-muted"
					:to="{
						name: 'profile.overview',
						params: { username: game.developer.username },
					}"
					:title="`${game.developer.display_name} (@${game.developer.username})`"
					v-app-track-event="eventLabel ? 'game-list:dev:' + eventLabel : undefined"
				>
					<translate>by</translate>
					<strong>
						{{ game.developer.display_name }}
					</strong>
					<app-user-verified-tick :user="game.developer" />
				</router-link>
			</app-user-card-hover>

			<div class="-followers -spacing text-muted">
				<translate
					:translate-n="game.follower_count || 0"
					:translate-params="{ count: number(game.follower_count || 0) }"
					translate-plural="%{ count } followers"
				>
					%{ count } follower
				</translate>
			</div>
		</div>
	</div>
</template>

<style lang="stylus" src="../list-common.styl" scoped></style>

<script lang="ts" src="./item"></script>
