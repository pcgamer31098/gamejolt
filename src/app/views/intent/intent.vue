<template>
	<section class="section">
		<div class="container">
			<div class="row">
				<div class="col-sm-8 col-md-6 col-lg-5 col-centered text-center">
					<div>
						<app-jolticon icon="thumbs-up" big />
					</div>

					<br />
					<br />

					<template v-if="unsubscribedNotification">
						<p class="lead">
							<translate>
								You have opted out of getting emails like this, and they will no longer be sent to
								you.
							</translate>
						</p>
						<hr />
						<p class="small text-muted">
							<translate>
								You can choose to stop receiving all emails from Game Jolt, or adjust which emails
								get sent to you, in your email preferences.
							</translate>
							<br />
							<router-link :to="{ name: 'dash.account.email-preferences' }">
								<translate>Go to email preferences</translate>
							</router-link>
						</p>
					</template>
					<template v-else-if="unsubscribedGJ">
						<p class="lead">
							<translate>
								You will no longer get emails from Game Jolt about product updates, new features, or
								recommendations about stuff you might like.
							</translate>
						</p>
						<hr />
						<p class="small text-muted">
							<translate>
								You can adjust which emails get sent to you in your email preferences.
							</translate>
							<br />
							<router-link :to="{ name: 'dash.account.email-preferences' }">
								<translate>Go to email preferences</translate>
							</router-link>
						</p>
					</template>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts" src="./intent"></script>
