<template>
	<div class="cookie-banner fill-darker" v-if="shouldShow">
		<p>
			<translate>
				We use cookies to ensure you get the best personalized experience on our website as well as
				keeping you signed into your account.
			</translate>
			<a class="link-help" :href="Environment.baseUrl + '/cookies'" @click="close()">
				<translate>Learn more</translate>
			</a>
		</p>
		<div class="text-right">
			<app-button @click="close()">
				<translate>Okay!</translate>
			</app-button>
		</div>
	</div>
</template>

<style lang="stylus" scoped>
@require '~styles/variables'
@require '~styles-lib/mixins'

$-width = 450px

.cookie-banner
	rounded-corners-lg()
	position: fixed
	border:  $border-width-base solid var(--theme-bg-subtle)
	box-shadow: 0 5px 15px rgba($black, 0.5)
	z-index: 10000
	bottom: ($grid-gutter-width-xs / 2)
	right: ($grid-gutter-width-xs / 2)
	left: ($grid-gutter-width-xs / 2)
	padding: ($grid-gutter-width-xs / 2)

	@media $media-sm-up
		bottom: ($grid-gutter-width / 2)
		padding: ($grid-gutter-width / 2)
		left: 50%
		margin-left: -($-width / 2)
		width: $-width
</style>

<script lang="ts" src="./banner"></script>
