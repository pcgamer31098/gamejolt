<template>
	<div>
		<div class="row">
			<!--
		<div class="col-md-8 col-lg-6">
			<app-linked-account
				provider="facebook"
				:account="facebookAccount"
				@sync="onLink"
				@link="onLink"
				@unlink="onUnlink">
				<div v-if="facebookAccount" class="-facebook-page">
					<h5>
						<translate>Linked Page</translate>
					</h5>
					<template v-if="facebookAccount.facebookSelectedPage">
						<p>
							<strong>
								<a :href="facebookAccount.facebookPageUrl" target="_blank">
									{{ facebookAccount.facebookSelectedPage.name }}
								</a>
							</strong>
						</p>
						<app-button
							@click="onSelectFacebookPage">
							<translate>Change</translate>
						</app-button>
						<app-button
							v-if="facebookAccount.facebookSelectedPage"
							@click="onUnlinkFacebookPage"
							trans>
							<translate>Unlink</translate>
						</app-button>
					</template>
					<template v-else>
						<p>
							<small class="text-muted"><translate>Not linked.</translate></small>
						</p>
						<app-button
							@click="onSelectFacebookPage"
							icon="link">
							<translate>Link Now</translate>
						</app-button>
					</template>
				</div>
			</app-linked-account>
		</div>
		-->
			<div class="col-md-8 col-lg-6">
				<app-linked-account
					provider="twitter"
					:account="twitterAccount"
					:disabled="loading"
					@sync="onLink"
					@link="onLink"
					@unlink="onUnlink"
				/>
			</div>

			<!--
		<div class="col-md-8 col-lg-6">
			<app-linked-account
				provider="discord"
				:account="discordAccount"
				@sync="onLink"
				@link="onLink"
				@unlink="onUnlink" />
		</div>
		-->
			<div class="col-md-8 col-lg-6">
				<app-linked-account
					provider="tumblr"
					:account="tumblrAccount"
					:disabled="loading"
					@sync="onLink"
					@link="onLink"
					@unlink="onUnlink"
					@link-tumblr-blog="onLinkTumblrBlog"
					@unlink-tumblr-blog="onUnlinkTumblrBlog"
					show-tumblr-blog
				></app-linked-account>
			</div>
		</div>
	</div>
</template>

<style lang="stylus" scoped>

.-facebook-page
	> h5
		margin-top: 20px
		margin-bottom: 0
		font-weight: bold
</style>

<script lang="ts" src="./linked-accounts"></script>
