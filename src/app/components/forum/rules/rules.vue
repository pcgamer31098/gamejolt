<template>
	<div class="alert full-bleed-xs">
		<p>
			<translate>
				Our forums have been coded up and delivered as a precious gem into your hands. Don't abuse
				the privilege.
			</translate>
		</p>
		<p>
			<a @click="isShowingRules = !isShowingRules">
				<translate>Read through the rules before posting on the forums.</translate>
			</a>
		</p>

		<app-expand :when="isShowingRules">
			<hr />

			<h5 class="sans-margin-top">
				<translate>Forum Rules</translate>
			</h5>

			<ol>
				<li>
					<b><translate>Keep it Nice</translate></b>
					-
					<translate>
						We're here to help each other as gamers and developers, not to pick fights.
					</translate>
				</li>
				<li>
					<b><translate>No Advertising</translate></b>
					-
					<translate>
						This is not the place to post news about your games. Game Jolt has devlogs for everyone
						to use. You can post about game ideas you may have, but only post in the respective
						channel.
					</translate>
				</li>
				<li>
					<b><translate>No Spamming</translate></b>
					-
					<translate>
						Most people these days have busy lives, so I think the last thing we need is to open up
						a thread just to find a bunch of poop in word form.
					</translate>
				</li>
				<li>
					<b><translate>Keep it Safe for Work</translate></b>
					-
					<translate>
						We'd like to keep the forums safe for younger folks to read through. Plus, how would
						people be able to slack off at work if we don't keep it safe?
					</translate>
				</li>
				<li>
					<b><translate>Be Awesome</translate></b>
					-
					<translate>We have no time for boring people.</translate>
				</li>
				<li>
					<b><translate>Additional Rules</translate></b>
					-
					<translate>
						Each channel has some additional rules. Be sure to read them and follow them while
						posting.
					</translate>
				</li>
			</ol>
		</app-expand>
	</div>
</template>

<script lang="ts" src="./rules"></script>
