<template>
	<app-modal>
		<div class="modal-controls">
			<app-button @click="modal.dismiss()">
				<translate>Close</translate>
			</app-button>
		</div>

		<div class="modal-header">
			<h2 class="modal-title"><translate>Set Password</translate></h2>
		</div>

		<div class="modal-body">
			<p class="help-block">
				<translate>
					You don't have a password set on your account since you had signed up through a linked
					account.
				</translate>
				<br />
				<translate>
					To continue being able to log in after you've unlinked, please set a password.
				</translate>
			</p>

			<form-set-password @submit="onPasswordSet"></form-set-password>
		</div>
	</app-modal>
</template>

<script lang="ts" src="./set-password-modal"></script>
