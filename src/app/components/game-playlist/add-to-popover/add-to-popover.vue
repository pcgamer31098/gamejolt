<template>
	<div class="add-to-playlist-popover">
		<app-loading :centered="true" v-if="isLoading" />
		<template v-else>
			<div class="list-group list-group-dark">
				<a class="list-group-item has-icon" @click="addToNewPlaylist">
					<app-jolticon icon="add" />
					<translate>library.playlists.add_to.new_playlist_button</translate>
				</a>
				<div class="list-group-item" v-if="playlists.length">
					<input
						type="search"
						class="form-control"
						:placeholder="$gettext('library.playlists.add_to.filter_placeholder')"
						v-app-focus-when
						v-model="filterQuery"
						keydown.esc.stop="close"
					/>
				</div>
			</div>
			<div
				class="list-group list-group-dark thin add-to-playlist-popover-playlists"
				v-if="playlists.length"
			>
				<a
					class="list-group-item has-icon"
					:class="
						playlistsWithGame.indexOf(playlist.id) === -1 ? 'playlist-no-game' : 'playlist-has-game'
					"
					v-for="playlist of filteredPlaylists"
					:key="playlist.id"
					@click="selectPlaylist(playlist)"
				>
					<app-jolticon icon="playlist" />
					<app-jolticon icon="check" />
					<app-jolticon icon="remove" />
					<app-jolticon icon="add" />
					{{ playlist.name }}
				</a>
			</div>
		</template>
	</div>
</template>

<style lang="stylus" scoped>
@require '~styles/variables'
@require '~styles-lib/mixins'

.add-to-playlist-popover
	.loading
		margin-top: $line-height-computed

	.list-group
		margin-bottom: 0 !important

	&-playlists
		.jolticon
			display: none

		.list-group-item
			&.playlist-no-game
				.jolticon-playlist
					display: inline-block

				&:hover
					.jolticon-playlist
						display: none

					.jolticon-add
						theme-prop('color', 'highlight')
						display: inline-block

			&.playlist-has-game
				.jolticon-check
					theme-prop('color', 'highlight')
					display: inline-block

				&:hover
					.jolticon-check
						display: none

					.jolticon-remove
						theme-prop('color', 'notice')
						display: inline-block
</style>

<script lang="ts" src="./add-to-popover"></script>
