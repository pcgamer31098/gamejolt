<template>
	<div class="message-thread-item" :id="id" :class="{ '-blocked': isBlocked }">
		<app-timeline-list-item
			:is-active="isActive"
			:is-new="isNew"
			:is-thread="isShowingReplies || isReply"
			:is-last="isLast"
		>
			<slot v-if="isBlocked" name="blocked" />
			<template v-else>
				<div slot="bubble" v-if="user">
					<app-user-card-hover :user="user">
						<app-user-avatar :user="user" />
					</app-user-card-hover>
				</div>

				<div class="timeline-list-item-details">
					<div class="-meta clearfix" v-if="user">
						<div class="-byline">
							<span class="-author">
								<router-link
									:to="{
										name: 'profile.overview',
										params: { username: user.username },
									}"
									class="link-unstyled"
								>
									{{ user.display_name }}
									<app-user-verified-tick :user="user" />
								</router-link>

								<small class="text-muted">@{{ user.username }}</small>
							</span>

							<template v-if="repliedTo">
								<app-jolticon icon="arrow-forward" />

								<span class="-author tiny">
									<router-link
										:to="{
											name: 'profile.overview',
											params: { username: repliedTo.username },
										}"
										class="link-unstyled"
									>
										{{ repliedTo.display_name }}
									</router-link>

									<span class="text-muted">@{{ repliedTo.username }}</span>
								</span>
							</template>

							<span class="-meta-slot">
								<slot name="tags" />
								<slot name="meta" />
							</span>

							<slot name="authors" />
						</div>

						<div class="-meta-sub">
							<small class="text-muted" :title="dateFilter(date, 'medium')">
								<app-time-ago :date="date" />
							</small>
						</div>
					</div>

					<slot />

					<div class="timeline-list-item-controls">
						<slot name="controls" />
					</div>
				</div>
			</template>
		</app-timeline-list-item>

		<div class="-replies" v-if="isShowingReplies && !isBlocked">
			<slot name="replies" />
		</div>

		<div class="timeline-list-item-split" v-if="!isReply" />
	</div>
</template>

<style lang="stylus" scoped>
@require '~styles/variables'
@require '~styles-lib/mixins'

.-meta
	margin-bottom: 1em

.-byline
	display: flex
	justify-content: space-between

.-author
	text-overflow()
	margin-right: 2px

	a
		font-weight: bold

.-meta-sub
	a
		margin-right: 2px

	.tag
		margin-right: 5px

.-meta-slot
	display: inline-flex
	margin-left: 5px

	>>> .tag
		vertical-align: middle

.-blocked >>> .timeline-list-item-main
	padding-left: 0
</style>

<script lang="ts" src="./item"></script>
