<template>
	<div slot="popover" class="search-autocomplete-popover">
		<div v-if="isHidden" class="well sans-margin-bottom">
			<app-jolticon icon="chevron-up" />
			<translate>Enter your search query for maximum finding...</translate>
		</div>
		<template v-else>
			<!-- View All -->
			<div class="list-group list-group-dark">
				<a class="list-group-item" :class="{ active: selected === 0 }" @mousedown="viewAll()">
					<translate>search.autocomplete.show_all</translate>
				</a>
			</div>

			<!-- Installed Games -->
			<template v-if="libraryGames.length">
				<div class="popper-heading">
					<translate>search.autocomplete.installed_heading</translate>
				</div>
				<div class="list-group list-group-dark thin">
					<router-link
						class="list-group-item"
						v-for="libraryGame of libraryGames"
						:key="libraryGame.id"
						:to="{
							name: 'discover.games.view.overview',
							params: { slug: libraryGame.slug, id: libraryGame.id },
						}"
						:class="{ active: items[selected - 1] === libraryGame }"
						v-app-track-event="`search:autocomplete:go-library-game`"
					>
						<span class="search-game-thumbnail">
							<app-game-thumbnail-img :game="libraryGame" />
						</span>

						{{ libraryGame.title }}
					</router-link>
				</div>
			</template>

			<!-- Games -->
			<template v-if="games.length">
				<div class="popper-heading">
					<translate>search.autocomplete.games_heading</translate>
				</div>
				<div class="list-group list-group-dark thin">
					<router-link
						class="list-group-item"
						v-for="game of games"
						:key="game.id"
						:to="{
							name: 'discover.games.view.overview',
							params: { slug: game.slug, id: game.id },
						}"
						:class="{ active: items[selected - 1] === game }"
						v-app-track-event="`search:autocomplete:go-game`"
					>
						<div class="pull-right">
							<app-game-compat-icons :game="game" />
						</div>

						<span class="search-game-thumbnail">
							<app-game-thumbnail-img :game="game" />
						</span>

						{{ game.title }}
					</router-link>
				</div>
			</template>

			<!-- Users -->
			<template v-if="users.length">
				<div class="popper-heading">
					<translate>search.autocomplete.users_heading</translate>
				</div>
				<div class="list-group list-group-dark thin">
					<router-link
						class="list-group-item"
						v-for="user of users"
						:key="user.id"
						:to="{
							name: 'profile.overview',
							params: { username: user.username },
						}"
						:class="{ active: items[selected - 1] === user }"
						v-app-track-event="`search:autocomplete:go-user`"
					>
						<img :src="user.img_avatar" class="search-user-avatar" alt="" />
						{{ user.display_name }}
						<app-user-verified-tick :user="user" small />
						<span class="tiny text-muted">@{{ user.username }}</span>
					</router-link>
				</div>
			</template>
		</template>
	</div>
</template>

<style lang="stylus" src="./autocomplete.styl" scoped></style>

<script lang="ts" src="./autocomplete"></script>
