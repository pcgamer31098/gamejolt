<template>
	<div class="chat-user-list">
		<div class="nav-controls">
			<input text="search" class="form-control" placeholder="Filter..." v-model="filterQuery" />
		</div>

		<ul class="shell-nav" v-show="users.length">
			<app-chat-user-list-item
				v-for="user of filteredUsers"
				:key="user.id"
				:user="user"
				:room="room"
				:show-pm="showPm"
			/>
		</ul>
	</div>
</template>

<script lang="ts" src="./user-list"></script>
