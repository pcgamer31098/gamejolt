<template>
	<app-form name="onboardingForm">
		<div class="-form">
			<section class="-message">
				<h3 class="section-header">
					<translate>
						Let's get you set up!
					</translate>
				</h3>
			</section>

			<section class="-avatar">
				<app-editable-overlay @click="chooseAvatar()">
					<translate slot="overlay">Change</translate>
					<app-user-avatar :user="user" />
				</app-editable-overlay>
			</section>

			<app-form-group v-if="showUsername" name="username" hide-label>
				<section class="-username">
					<div class="-field-row">
						<div class="-hello text-muted"><translate>Hello! It'sa me,</translate></div>
						<div class="-field">
							<div class="-at text-muted">@</div>
							<app-form-control
								type="text"
								:rules="{
									min: 3,
									max: 30,
									pattern: 'username',
									availability: {
										url: '/web/dash/profile/check-field-availability/username',
										initVal: user.username,
									},
								}"
								:validate-on="['blur']"
							/>
						</div>
					</div>
					<app-form-control-errors hide-caret />
				</section>
			</app-form-group>

			<section class="-bio">
				<app-form-group name="bio" optional hide-label>
					<app-form-control-content
						style="text-align: left;"
						content-context="user-bio"
						:disabled="!allowBioChange"
						:model-id="user.id"
						:placeholder="$gettext(`Tell people about yourself`)"
					/>
				</app-form-group>
			</section>

			<slot name="controls" :canContinue="canContinue" :shouldShowSkip="shouldShowSkip" />
		</div>
	</app-form>
</template>

<style lang="stylus" src="./profile.styl" scoped></style>

<script lang="ts" src="./profile"></script>
