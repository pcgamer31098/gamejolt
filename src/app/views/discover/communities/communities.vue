<template>
	<div>
		<div class="container">
			<div class="row">
				<div class="col-sm-10 col-md-8 col-lg-6 col-centered">
					<h1 class="text-center"><translate>Find Communities on Game Jolt</translate></h1>

					<div class="-search">
						<input
							type="text"
							class="form-control"
							:placeholder="$gettext(`Search...`)"
							v-model="searchText"
						/>
						<app-jolticon
							v-if="searchText"
							icon="remove"
							class="text-muted"
							@click.native="clearSearch"
						/>
					</div>
				</div>
			</div>

			<app-loading v-if="isLoadingFirst" centered />
			<template v-else-if="communities.length">
				<div class="row">
					<div
						class="-item col-sm-6 col-md-4 col-lg-3 anim-fade-in"
						v-for="community of communities"
						:key="community.id"
					>
						<app-community-card :community="community" />
					</div>
				</div>

				<app-scroll-inview ref="inview" :margin="loadMoreMargin" @inview="onScrollLoadMore">
					<app-loading v-if="isLoadingMore" class="-loading-more" centered />
				</app-scroll-inview>
			</template>
			<template v-else>
				<div class="row">
					<div class="col-sm-10 col-md-8 col-lg-6 col-centered">
						<div class="alert alert-notice anim-fade-in">
							No communities match your search.
						</div>
					</div>
				</div>
			</template>

			<div v-if="showCreateCommunity" class="row -create">
				<div class="page-cut" />

				<h2 class="-lead text-center">
					<translate>Can't find your dream community?</translate>
				</h2>

				<div class="col-sm-6 col-md-4 col-lg-3 col-centered">
					<div class="sheet sheet-full sheet-no-full-bleed">
						<div class="-text"><translate>Create one</translate></div>
						<div class="-widget">
							<app-community-add-widget />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="stylus" scoped>
@require '~styles/variables'

.-search
	margin: ($line-height-computed * 2) 0
	position: relative

	input
		width: 100%

	.jolticon
		position: absolute
		top: 9px
		right: 5px

		&:hover
			cursor: pointer

.-item
	margin-bottom: $line-height-computed * 1.5

	@media $media-sm
		&:nth-child(2n+1)
			clear: both

	@media $media-md
		&:nth-child(3n+1)
			clear: both

	@media $media-lg
		&:nth-child(4n+1)
			clear: both

.-loading-more
	clear: both

.-create
	.-lead
		margin: $line-height-computed 0

	.-text
		text-align: center
		font-family: $font-family-heading
		font-size: $font-size-large
		font-weight: bold
		color: var(--theme-fg-muted)
		margin: $line-height-computed 0

	.-widget
		position: relative
		left: 50%
		width: 100px
		height: 100px
		margin-bottom: $line-height-computed

		> *
			position: relative
			left: -50px

</style>

<script lang="ts" src="./communities"></script>
