<template>
	<app-form v-if="model" name="postForm" ref="form">
		<!-- Attachments -->
		<div class="-attachment-controls" v-if="!enabledAttachments">
			<app-button
				trans
				:primary="enabledImages"
				:solid="enabledImages"
				icon="screenshot"
				@click="enableImages()"
			>
				<translate>Images/GIFs</translate>
			</app-button>

			<app-button
				trans
				:primary="enabledVideo"
				:solid="enabledVideo"
				icon="video"
				@click="enableVideo()"
			>
				<translate>Video</translate>
			</app-button>

			<app-button
				trans
				:primary="enabledSketchfab"
				:solid="enabledSketchfab"
				icon="sketchfab"
				@click="enableSketchfab()"
			>
				Sketchfab
			</app-button>
		</div>
		<div class="well fill-offset full-bleed" v-else>
			<!-- Images -->
			<fieldset v-if="enabledImages">
				<app-form-legend compact deletable @delete="disableAttachments()">
					<translate>Select images</translate>
				</app-form-legend>

				<app-form-post-media
					:media-items="formModel.media"
					:post="formModel"
					:max-filesize="maxFilesize"
					:max-width="maxWidth"
					:max-height="maxHeight"
					:loading="isUploadingPastedImage"
					@upload="onMediaUploaded($event)"
					@remove="removeMediaItem($event)"
					@sort="onMediaSort($event)"
				/>
			</fieldset>

			<!-- Video -->
			<fieldset v-else-if="enabledVideo">
				<app-form-legend compact deletable @delete="disableAttachments()">
					<translate>YouTube video URL</translate>
				</app-form-legend>

				<app-form-group
					name="video_url"
					hide-label
					:label="$gettext(`YouTube Video URL`)"
					v-app-focus-when="!wasPublished"
				>
					<p class="help-block">
						<translate>Enter the URL of your YouTube video. For example:</translate>
						<code>https://www.youtube.com/watch?v=dQw4w9WgXcQ</code>
					</p>

					<app-form-control
						type="text"
						:rules="{
							pattern: YOUTUBE_URL_REGEX,
						}"
					/>

					<app-form-control-errors />

					<template v-if="hasValidYouTubeUrl">
						<br />
						<app-video-embed video-provider="youtube" :video-id="youtubeVideoId" />
					</template>
				</app-form-group>
			</fieldset>

			<!-- Sketchfab -->
			<fieldset v-else-if="enabledSketchfab">
				<app-form-legend compact deletable @delete="disableAttachments()">
					<translate>Embed Sketchfab model</translate>
				</app-form-legend>

				<app-form-group
					name="sketchfab_id"
					hide-label
					:label="$gettext(`Sketchfab Model URL`)"
					v-app-focus-when="!wasPublished"
				>
					<p class="help-block">
						<translate>Enter your Sketchfab model's URL or ID. For example:</translate>
						<br />
						<code>
							https://sketchfab.com/3d-models/your-model-name-ID
						</code>
					</p>

					<app-form-control
						type="text"
						:rules="{
							pattern: SKETCHFAB_FIELD_REGEX,
						}"
					/>
					<app-form-control-errors />
					<div v-if="hasValidSketchfabModelId">
						<br />
						<app-sketchfab-embed :sketchfab-id="sketchfabId" />
					</div>
				</app-form-group>
			</fieldset>
		</div>

		<!-- Post title (short) -->
		<app-form-group
			name="lead_content"
			class="-lead-form-group"
			:label="!longEnabled ? $gettext(`Post`) : $gettext(`Summary`)"
			hide-label
		>
			<app-form-control-content
				content-context="fireside-post-lead"
				autofocus
				:placeholder="
					!longEnabled ? $gettext(`What's new?`) : $gettext(`Write a summary for your article...`)
				"
				:model-id="model.id"
				:min-height="72"
				:rules="{
					content_required: true,
					max_content_length: [leadLengthLimit],
				}"
				:validate-on="['blur']"
				@paste.native="onPaste"
			/>

			<div class="-hp">
				<div class="-hp-label">HP</div>
				<div class="-hp-bar">
					<app-progress-bar thin :percent="leadLengthPercent" :animate="false"></app-progress-bar>
				</div>
				<div class="-hp-count" v-if="leadLengthPercent <= 10">
					{{ leadLengthLimit - formModel.leadLength }}
				</div>
			</div>

			<app-form-control-errors />
		</app-form-group>

		<!-- Post body (long) -->
		<div class="well fill-offset full-bleed" v-if="longEnabled">
			<fieldset>
				<app-form-legend compact deletable @delete="toggleLong()">
					<translate>Article content</translate>
				</app-form-legend>

				<app-form-group
					name="article_content"
					:label="$gettext(`Article Content`)"
					hide-label
					optional
				>
					<app-form-control-content
						:placeholder="$gettext(`Write your article here...`)"
						content-context="fireside-post-article"
						:model-id="model.id"
						:rules="{
							content_no_media_uploads: true,
						}"
					/>

					<app-form-control-errors />
				</app-form-group>
			</fieldset>
		</div>

		<!-- Poll -->
		<div class="well fill-offset full-bleed" v-if="hasPoll">
			<fieldset>
				<app-form-legend compact :deletable="isPollEditable" @delete="removePoll()">
					<translate>Set up poll</translate>
				</app-form-legend>

				<!-- i starts from 1 -->
				<div class="-poll-option" v-for="i of formModel.poll_item_count" :key="i">
					<app-form-group :name="'poll_item' + i" :label="$gettext(`choice`)" hide-label>
						<app-form-control
							type="text"
							:rules="{
								max: 64,
							}"
							:placeholder="$gettextInterpolate('Choice %{ num }', { num: i })"
							:disabled="!isPollEditable"
						/>

						<app-form-control-errors />
					</app-form-group>

					<!-- Can't have less than 2 poll items -->
					<a
						class="-poll-option-remove link-muted"
						v-if="formModel.poll_item_count > 2 && isPollEditable"
						@click="removePollItem(i)"
					>
						<app-jolticon icon="remove" />
					</a>
				</div>

				<div>
					<a
						v-if="isPollEditable && formModel.poll_item_count < MAX_POLL_ITEMS"
						@click="addPollItem()"
					>
						+
						<translate>Add choice</translate>
					</a>
				</div>
			</fieldset>

			<br />

			<fieldset class="-poll-duration">
				<app-form-legend compact>
					<translate>Duration</translate>
				</app-form-legend>

				<div class="row">
					<div class="col-xs-4">
						<app-form-group name="poll_days" :label="$gettext('Days')">
							<app-form-control
								type="number"
								step="1"
								min="0"
								max="14"
								:disabled="!isPollEditable"
								:rules="{
									min_value: 0,
									max_value: 14,
								}"
							/>
						</app-form-group>
					</div>

					<div class="col-xs-4">
						<app-form-group name="poll_hours" :label="$gettext('Hours')">
							<app-form-control
								type="number"
								step="1"
								min="0"
								max="23"
								:disabled="!isPollEditable"
								:rules="{
									min_value: 0,
									max_value: 23,
								}"
							/>
						</app-form-group>
					</div>

					<div class="col-xs-4">
						<app-form-group name="poll_minutes" :label="$gettext('Minutes')">
							<app-form-control
								type="number"
								step="1"
								min="0"
								max="59"
								:disabled="!isPollEditable"
								:rules="{
									min_value: 0,
									max_value: 59,
								}"
							/>
						</app-form-group>
					</div>
				</div>

				<p v-if="pollDuration < MIN_POLL_DURATION" class="help-block error">
					<translate>Too short! Polls must be between 5 minutes and 14 days long.</translate>
				</p>
				<p v-else-if="pollDuration > MAX_POLL_DURATION" class="help-block error">
					<translate>Too long! Polls must be between 5 minutes and 14 days long.</translate>
				</p>
				<br v-else />
			</fieldset>

			<fieldset>
				<app-form-legend
					compact
					expandable
					:expanded="isShowingMorePollOptions"
					@click.native="isShowingMorePollOptions = !isShowingMorePollOptions"
				>
					<translate>More options</translate>
				</app-form-legend>

				<div v-show="isShowingMorePollOptions">
					<app-form-group name="poll_is_private" :label="$gettext(`Private results?`)">
						<app-form-control-toggle class="pull-right" />
						<p class="help-block sans-margin-top">
							<translate>The poll's results will be kept hidden if this is turned on.</translate>
						</p>
					</app-form-group>
				</div>
			</fieldset>
		</div>

		<!-- Scheduling -->
		<div class="well fill-offset full-bleed" v-if="!wasPublished && isScheduling && timezones">
			<fieldset>
				<app-form-legend compact deletable @delete="removeSchedule()">
					<translate>Schedule publishing of post</translate>
				</app-form-legend>

				<app-form-group name="scheduled_for_timezone" :label="$gettext(`Timezone`)">
					<p class="help-block">
						<translate>All time selection below will use this timezone.</translate>
					</p>

					<p class="help-block">
						<strong>
							<translate>
								Should auto-detect, but if it doesn't, choose your closest city.
							</translate>
						</strong>
					</p>

					<app-form-control-select>
						<optgroup v-for="(timezones, region) of timezones" :label="region" :key="region">
							<option v-for="timezone of timezones" :value="timezone.i" :key="timezone.i">
								{{ timezone.label }}
							</option>
						</optgroup>
					</app-form-control-select>

					<app-form-control-errors />
				</app-form-group>

				<app-form-group name="scheduled_for" :label="$gettext(`Date and time`)">
					<app-form-control-date
						:timezone-offset="scheduledTimezoneOffset"
						:rules="{
							min_date: now,
						}"
					/>
					<app-form-control-errors :label="$gettext(`scheduled for`)" />
				</app-form-group>
			</fieldset>
		</div>

		<!-- Access permissions -->
		<template v-if="accessPermissionsEnabled">
			<div class="well fill-offset full-bleed" v-if="!wasPublished">
				<fieldset>
					<app-form-legend compact deletable @delete="disableAccessPermissions()">
						<translate>Access permissions</translate>
					</app-form-legend>

					<app-form-group name="key_group_ids" :label="$gettext(`Access Permissions`)" hide-label>
						<div class="alert" v-if="!keyGroups.length">
							<translate>
								You can make this post available to only the users within a key group. For example,
								this is useful for sending news updates to testers. You can create a user key group
								through the "Keys/Access" page.
							</translate>
						</div>
						<div v-else>
							<p class="help-block">
								<translate>
									You can make this post available to only the users within a key group. For
									example, this is useful for sending news updates to testers. Only User-type key
									groups can be selected.
								</translate>
							</p>

							<div class="checkbox" v-for="keyGroup of keyGroups" :key="keyGroup.id">
								<label>
									<app-form-control-checkbox :value="keyGroup.id" />
									{{ keyGroup.name }}
								</label>
							</div>
						</div>
					</app-form-group>
				</fieldset>
			</div>
			<div class="form-group well fill-offset full-bleed" v-else>
				<label class="control-label">
					<translate>Access Permissions</translate>
				</label>
				<div class="alert">
					<translate>
						The below key groups have access to this post. You can't edit who has access after
						posting since notifications have already gone out.
					</translate>
				</div>
				<div>
					<span class="tag" v-for="keyGroup of model.key_groups" :key="keyGroup.id">
						{{ keyGroup.name }}
					</span>
				</div>
			</div>
		</template>

		<div class="well fill-offset full-bleed" v-if="isPublishingToPlatforms">
			<fieldset>
				<app-form-legend compact deletable @delete="removePublishingToPlatforms()">
					<translate>Publish your post to other platforms</translate>
				</app-form-legend>

				<div class="alert" v-if="!linkedAccounts.length">
					<translate>You can publish this post to other platforms!</translate>
					<translate v-if="!model.game">
						Set up your linked accounts in your user account.
					</translate>
					<translate v-else>
						Set up your linked accounts either in your game dashboard, or your user account.
					</translate>
				</div>
				<div class="-linked-accounts" v-else>
					<app-form-group
						v-for="account of linkedAccounts"
						:key="account.id"
						:name="`linked_account_${account.id}`"
						:label="$gettext(`Linked Account`)"
						hide-label
					>
						<div class="-linked-account">
							<div class="-linked-account-icon">
								<app-jolticon
									v-app-tooltip="account.providerDisplayName"
									:icon="account.icon"
									big
								/>
							</div>

							<div class="-linked-account-label">
								{{ getLinkedAccountDisplayName(account) }}
							</div>

							<div class="-linked-account-toggle">
								<app-form-control-toggle @changed="changeLinkedAccount(account.id)" />
							</div>
						</div>
					</app-form-group>
				</div>
			</fieldset>
		</div>

		<div class="alert" v-if="hasPublishedToPlatforms">
			<strong>
				<translate>This post has been published to other platforms.</translate>
			</strong>
			<translate>
				Any edits made to this post will not be reflected on those other platforms.
			</translate>
		</div>

		<!-- Game options -->
		<template v-if="authorOptionsEnabled">
			<div class="well fill-offset full-bleed">
				<fieldset>
					<app-form-legend compact deletable @delete="disableAuthorOptions()">
						<translate>Author Options</translate>
					</app-form-legend>

					<!-- Post as game owner -->
					<app-form-group
						name="as_game_owner"
						v-if="model.user.id != model.game.developer.id"
						:label="$gettext(`Post as Game Owner`)"
					>
						<p class="help-block">
							<translate
								:translate-params="{
									owner: `@${model.user.username}`,
									author: `@${model.game.developer.username}`,
								}"
							>
								This will show %{ owner } as the user that posted instead of %{ author }.
							</translate>
						</p>
						<div class="-as-owner">
							<div class="-as-owner-item">
								<app-form-control-toggle />
							</div>
							<div
								class="-as-owner-item -as-owner-avatar"
								v-if="formModel.as_game_owner"
								v-app-tooltip="
									model.game.developer.display_name + ` (@${model.game.developer.username})`
								"
							>
								<app-user-avatar-img :user="model.game.developer" />
							</div>
						</div>
					</app-form-group>

					<!-- Post to profile -->
					<app-form-group
						name="post_to_user_profile"
						v-if="user && user.id == model.user.id"
						:label="$gettext(`Post to Profile`)"
					>
						<p class="help-block">
							This will make the post show up on your profile too and not just the game page.
						</p>

						<app-form-control-toggle />
					</app-form-group>
				</fieldset>
			</div>
		</template>

		<template v-if="platformRestrictions.length">
			<div
				v-for="restriction of platformRestrictions"
				:key="restriction"
				class="alert alert-notice full-bleed anim-fade-in"
			>
				<strong>
					{{ restriction }}
				</strong>
			</div>
		</template>

		<!-- Communities -->
		<template v-if="isLoaded">
			<app-scroll-scroller v-if="shouldShowCommunities" class="-communities" horizontal thin>
				<transition-group class="-communities-list" name="-communities-list" tag="div">
					<app-form-post-community-pill-incomplete
						v-if="incompleteDefaultCommunity"
						class="-community-pill"
						key="incomplete"
						:communities="possibleCommunities"
						:community="incompleteDefaultCommunity"
						@add="attachIncompleteCommunity"
					/>

					<app-form-post-community-pill
						class="-community-pill"
						v-for="{ community, channel } of attachedCommunities"
						:key="community.id"
						:community="community"
						:channel="channel"
						:removable="!wasPublished"
						@remove="removeCommunity(community)"
					/>

					<template v-if="!wasPublished && canAddCommunity">
						<app-form-post-community-pill-add
							class="-community-pill"
							key="add"
							:communities="possibleCommunities"
							@add="attachCommunity"
						/>
					</template>
				</transition-group>
			</app-scroll-scroller>
			<p v-else-if="!wasPublished" class="help-block">
				<translate>Join some communities to post to them.</translate>
				<span v-app-tooltip="$gettext(`Go to the explore page and find some!`)">
					<app-jolticon class="text-muted" icon="help-circle" />
				</span>
			</p>
		</template>

		<app-expand v-if="!wasPublished" :when="hasChannelError">
			<div class="-error alert alert-notice">
				<translate>
					Choose a channel to post to.
				</translate>
			</div>
		</app-expand>

		<app-expand :when="hasAuthorOptionsError">
			<div class="-error alert alert-notice">
				<translate>
					Choose either posting as the game owner or sharing to your profile. Can't do both.
				</translate>
			</div>
		</app-expand>

		<!-- Controls -->
		<div class="-controls">
			<div class="-controls-attachments">
				<app-button
					v-if="!longEnabled"
					sparse
					trans
					circle
					icon="blog-article"
					v-app-tooltip="$gettext(`Add Article`)"
					@click="toggleLong()"
				/>

				<app-button
					v-if="!hasPoll"
					sparse
					trans
					circle
					icon="pedestals-numbers"
					v-app-tooltip="$gettext(`Add Poll`)"
					@click="createPoll()"
				/>

				<app-button
					v-if="!wasPublished && !isScheduling"
					sparse
					trans
					circle
					icon="calendar-grid"
					v-app-tooltip="$gettext(`Schedule Post`)"
					@click="addSchedule()"
				/>

				<app-button
					v-if="!accessPermissionsEnabled && !wasPublished && model.game"
					sparse
					trans
					circle
					icon="key-diagonal"
					v-app-tooltip="$gettext(`Access Permissions`)"
					@click="enableAccessPermissions()"
				/>

				<app-button
					v-if="!wasPublished && !isPublishingToPlatforms"
					sparse
					trans
					circle
					icon="share-airplane"
					v-app-tooltip="$gettext(`Publish to Other Platforms`)"
					@click="addPublishingToPlatforms()"
				/>

				<app-button
					v-if="!authorOptionsEnabled && shouldShowAuthorOptions"
					sparse
					trans
					circle
					icon="user"
					v-app-tooltip="$gettext(`Author Options`)"
					@click="enableAuthorOptions()"
				/>
			</div>

			<div class="-controls-submit">
				<div class="-controls-submit-button">
					<app-form-button
						v-if="!wasPublished && !isScheduling"
						:disabled="!valid"
						:solid="false"
						:primary="false"
						trans
						:block="Screen.isXs"
						@before-submit="onDraftSubmit()"
					>
						<translate>Save Draft</translate>
					</app-form-button>
				</div>

				<div class="-controls-submit-button">
					<app-form-button :disabled="!valid" primary solid :block="Screen.isXs">
						{{ mainActionText }}
					</app-form-button>
				</div>
			</div>
		</div>
	</app-form>
</template>

<style lang="stylus" src="./post.styl" scoped></style>

<script lang="ts" src="./post"></script>
