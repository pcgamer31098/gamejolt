<template>
	<app-form name="retrieveForm">
		<app-form-group name="email" :label="$gettext('Email Address')">
			<app-form-control type="email" :validate-on="['blur']" />

			<app-form-control-errors>
				<app-form-control-error
					when="server"
					:message="
						$gettext(
							`That email address doesn't seem to be correct. Please check that you entered it correctly.`
						)
					"
				/>
			</app-form-control-errors>
		</app-form-group>

		<app-form-button>
			<translate>Retrieve</translate>
		</app-form-button>
	</app-form>
</template>

<script lang="ts" src="./retrieve"></script>
