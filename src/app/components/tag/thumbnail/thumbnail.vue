<template>
	<router-link class="tag-thumbnail" :class="{ active }" :to="location" v-app-track-event="event">
		<div class="-image-spacer">
			<div class="-image">
				<img :src="tagInfo.image" alt="" />
			</div>
		</div>
		<div class="-info">
			<div class="-label">
				{{ tagInfo.label }}
			</div>
		</div>
	</router-link>
</template>

<style lang="stylus" src="./thumbnail.styl" scoped></style>

<script lang="ts" src="./thumbnail"></script>
