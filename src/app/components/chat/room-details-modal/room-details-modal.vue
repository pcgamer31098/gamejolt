<template>
	<app-modal>
		<div class="modal-controls">
			<app-button @click="modal.dismiss()">
				<translate>Close</translate>
			</app-button>
		</div>

		<div class="modal-header">
			<h2 class="modal-title">
				<translate>Room Details</translate>
			</h2>
		</div>

		<div class="modal-body">
			<div class="chat-compiled-room-description" v-html="room.description"></div>
		</div>
	</app-modal>
</template>

<script lang="ts" src="./room-details-modal"></script>
