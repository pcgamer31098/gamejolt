<template>
	<div
		id="auth-container"
		:class="{
			'has-cover-img': shouldShowCoverImage && coverMediaItem,
		}"
	>
		<transition>
			<app-cover-img
				class="anim-fade-leave"
				v-if="shouldShowCoverImage && coverMediaItem"
				:img-url="coverMediaItem.img_url"
			/>
		</transition>

		<div class="auth-scroll-container">
			<div class="auth-logo text-center anim-fade-in-enlarge stagger">
				<a :href="!GJ_IS_CLIENT ? Environment.baseUrl + '/' : Environment.authBaseUrl + '/login'">
					<app-theme-svg
						src="~img/game-jolt-logo.svg"
						width="164"
						height="18"
						alt=""
						class="visible-xs"
					/>
					<app-theme-svg
						src="~img/game-jolt-logo.svg"
						width="328"
						height="36"
						alt=""
						class="hidden-xs"
					/>
				</a>
			</div>

			<div class="container-fluid">
				<div class="auth-island">
					<div class="alert alert-notice" v-if="Connection.isClientOffline">
						<p>
							<app-jolticon icon="offline" />
							<translate>
								We're having trouble connecting to Game Jolt. Please check your connection to the
								Internet.
							</translate>
						</p>
					</div>

					<router-view />
				</div>
			</div>

			<div
				v-if="!GJ_IS_CLIENT && shouldShowCoverImage && Screen.isDesktop"
				class="-game-credits anim-fade-in-up"
			>
				<app-game-cover-credits :game="coverGame" />
			</div>

			<div class="auth-shell-bottom-links">
				<a
					class="link-unstyled anim-fade-in stagger"
					:href="Environment.baseUrl + '/terms'"
					target="_blank"
				>
					<translate>auth.legal.terms</translate>
				</a>
				<a
					class="link-unstyled anim-fade-in stagger"
					:href="Environment.baseUrl + '/privacy'"
					target="_blank"
				>
					<translate>auth.legal.privacy</translate>
				</a>
				<a
					class="link-unstyled anim-fade-in stagger"
					:href="Environment.baseUrl + '/cookies'"
					target="_blank"
					v-if="!GJ_IS_CLIENT"
				>
					<translate>Cookie Policy</translate>
				</a>

				<app-translate-lang-selector />
			</div>
		</div>
	</div>
</template>

<style lang="stylus" src="./auth.styl" scoped></style>

<script lang="ts" src="./auth"></script>
