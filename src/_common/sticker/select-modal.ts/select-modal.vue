<template>
	<app-modal>
		<div class="modal-controls">
			<app-button @click="modal.dismiss()">
				<translate>Close</translate>
			</app-button>
		</div>
		<div class="modal-header">
			<h2 class="modal-title">
				<translate>Select a Sticker</translate>
			</h2>
		</div>
		<div class="modal-body">
			<div v-if="loading">
				<app-loading />
			</div>
			<template v-else-if="hasStickers">
				<div v-if="canPlace" class="-sticker-list">
					<div
						class="-sticker"
						v-for="stickerCount of stickerCounts"
						:key="stickerCount.sticker.id"
					>
						<img :src="stickerCount.sticker.img_url" @click="selectSticker(stickerCount.sticker)" />
						<div
							class="-sticker-num"
							:class="{
								'-sticker-rarity-uncommon': stickerCount.sticker.rarity === 1,
								'-sticker-rarity-rare': stickerCount.sticker.rarity === 2,
								'-sticker-rarity-epic': stickerCount.sticker.rarity === 3,
							}"
						>
							x{{ stickerCount.count }}
						</div>
					</div>
				</div>
				<div v-else>
					<p>
						<translate>
							This post is already chock full of awesome stickers. Find a different post to place
							stickers on!
						</translate>
					</p>
				</div>
			</template>
			<div v-else>
				<p>
					<translate>
						Looks like you don't have any stickers right now. Maybe you can unlock more in your
						sticker collection.
					</translate>
				</p>
				<router-link :to="{ name: 'dash.stickers.overview' }">
					<app-button>
						<translate>View Sticker Collection</translate>
					</app-button>
				</router-link>
			</div>
		</div>
	</app-modal>
</template>

<style lang="stylus" scoped>
@require '~styles/variables'
@require '~styles-lib/mixins'

.-sticker-list
	display: flex
	flex-wrap: wrap

.-sticker
	margin-bottom: 12px
	margin-right: 8px

	& > img
		display: block
		width: 64px
		height: 64px
		cursor: pointer

	&-num
		text-align: center
		font-weight: bold

	&-rarity
		&-uncommon
			color: #1bb804
		&-rare
			color: #18a5f2
		&-epic
			color: #ffbc56
</style>

<script lang="ts" src="./select-modal"></script>
