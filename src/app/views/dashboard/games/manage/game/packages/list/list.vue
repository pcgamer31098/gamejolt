<template>
	<div class="row">
		<div class="col-sm-4 col-sm-push-8">
			<div class="page-help">
				<p>
					<translate>
						Packages are how you organize and distribute your game's builds and other files.
					</translate>
				</p>
				<p>
					<translate>
						Your primary package should contain the builds you want people to play. You can create
						new packages to contain additional files, such as level editors, art packs, expansions,
						and other DLC.
					</translate>
				</p>
				<p>
					<app-link-help page="dev-packages" class="link-help">
						<translate>dash.games.packages.page_help_link</translate>
					</app-link-help>
				</p>
			</div>
		</div>

		<div class="col-sm-8 col-sm-pull-4">
			<div class="alert" v-if="game._is_devlog">
				<app-jolticon icon="notice" notice />
				<b><translate>Public packages do not show on devlog-only game pages.</translate></b>
				<translate>
					You are only able to create private packages for testers while your game page is only a
					devlog. Once you publish your game page into early access or as a complete game, your
					public packages will show.
				</translate>
			</div>

			<div class="alert" v-if="!packages.length">
				<p v-if="hasAllPerms"><translate>You haven't added any packages yet.</translate></p>
				<p v-else>
					<translate>
						This game hasn't got any packages yet, and you don't have permissions to create any.
					</translate>
				</p>
			</div>

			<app-game-perms required="all" tag="div">
				<app-button primary block @click="addPackage()">
					<translate>dash.games.packages.add_package_button</translate>
				</app-button>
			</app-game-perms>
			<br />

			<app-card-list v-if="packages.length" :items="packages">
				<app-card-list-draggable :disabled="!hasBuildsPerms" @change="saveSort">
					<app-card-list-item v-for="pkg of packages" :key="pkg.id" :item="pkg">
						<app-game-perms required="all">
							<a class="card-remove" v-if="!pkg.has_sales" @click="removePackage(pkg)">
								<app-jolticon icon="remove" />
							</a>
						</app-game-perms>

						<div class="card-title">
							<h4>
								<template v-if="hasBuildsPerms">
									<router-link
										:to="{
											name: 'dash.games.manage.game.packages.edit',
											params: { packageId: pkg.id },
										}"
									>
										{{ pkg.title || game.title }}
									</router-link>
								</template>
								<template v-else>
									{{ pkg.title || game.title }}
								</template>
							</h4>
						</div>

						<div class="card-meta">
							<span
								class="tag tag-highlight"
								v-if="sellables[pkg.id] && sellables[pkg.id].primary"
								v-app-tooltip="
									$gettext(
										`We use the primary package to determine the price to show on game listings.`
									)
								"
							>
								<translate>Primary Package</translate>
							</span>

							<span
								class="tag tag-notice"
								v-if="pkg.visibility === GamePackage.VISIBILITY_PRIVATE"
								v-app-tooltip="
									$gettext(
										`This package will only be available to you and any keys that have access.`
									)
								"
							>
								<translate>Private</translate>
							</span>

							<template v-if="sellables[pkg.id] && sellables[pkg.id].type === 'pwyw'">
								<span class="tag">
									<translate>Pay What You Want</translate>
								</span>
								<span class="dot-separator"></span>
								<strong>
									<translate>Suggested Price</translate>
								</strong>
								&mdash;
								<template v-if="sellables[pkg.id] && sellables[pkg.id].pricings[0].amount">
									{{ sellables[pkg.id].pricings[0].amount | currency }}
								</template>
								<template v-else>
									<translate>None</translate>
								</template>
							</template>
							<template v-else-if="sellables[pkg.id] && sellables[pkg.id].type === 'paid'">
								<span class="tag">
									<translate>Paid</translate>
								</span>
								<span class="dot-separator"></span>
								<strong>
									<translate>Price</translate>
								</strong>
								&mdash;
								{{ sellables[pkg.id].pricings[0].amount | currency }}
							</template>
							<template v-else>
								<span class="tag">
									<translate>Free</translate>
								</span>
							</template>
						</div>

						<div class="card-content" v-if="pkg.description">
							{{ pkg.description }}
						</div>

						<div class="card-controls">
							<app-game-perms required="builds">
								<app-button
									primary
									:to="{
										name: 'dash.games.manage.game.packages.edit',
										params: { packageId: pkg.id },
									}"
								>
									<translate>Manage</translate>
								</app-button>
							</app-game-perms>
							<app-button
								trans
								:to="{
									name: 'dash.games.manage.game.packages.edit.widget',
									params: { packageId: pkg.id },
								}"
							>
								<translate>Widget</translate>
							</app-button>
							<app-game-perms required="analytics">
								<app-button
									trans
									:to="{
										name: 'dash.analytics',
										params: { resource: 'Game_Package', resourceId: pkg.id },
									}"
								>
									<translate>Analytics</translate>
								</app-button>
							</app-game-perms>
						</div>
					</app-card-list-item>
				</app-card-list-draggable>
			</app-card-list>

			<app-dash-game-wizard-controls :disabled="!game._is_devlog && !game.has_active_builds" />
		</div>
	</div>
</template>

<script lang="ts" src="./list"></script>
