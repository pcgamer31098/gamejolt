<template>
	<div class="devlog-post-media">
		<v-touch
			class="-lightbox"
			@panstart="panStart"
			@panmove="pan"
			@panend="panEnd"
			:pan-options="{ direction: 'horizontal' }"
		>
			<div class="-container">
				<div class="-slider" ref="slider">
					<app-media-item-post
						v-for="mediaItem of post.media"
						:key="mediaItem.id"
						:media-item="mediaItem"
						:is-post-hydrated="isHydrated"
						:is-active="getIsActiveMediaItem(mediaItem)"
						@bootstrap="onItemBootstrapped()"
						@fullscreen="onClickFullscreen"
						restrict-device-max-height
						inline
					/>
				</div>
			</div>

			<a class="-prev" v-if="page > 1" @click.stop="goPrev">
				<app-jolticon icon="chevron-left" />
			</a>

			<a class="-next" v-if="page < post.media.length" @click.stop="goNext">
				<app-jolticon icon="chevron-right" />
			</a>
		</v-touch>

		<app-event-item-media-indicator
			v-if="post.media.length > 1"
			class="-indicator"
			:count="post.media.length"
			:current="page"
		/>
	</div>
</template>

<style lang="stylus" src="./media.styl" scoped></style>

<script lang="ts" src="./media"></script>
