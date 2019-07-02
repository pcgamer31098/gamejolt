import { Ads } from 'game-jolt-frontend-lib/components/ad/ads.service';
import { AppAdPlaywireVideo } from 'game-jolt-frontend-lib/components/ad/playwire/video';
import AppAdWidget from 'game-jolt-frontend-lib/components/ad/widget/widget.vue';
import { AppTrackEvent } from 'game-jolt-frontend-lib/components/analytics/track-event.directive';
import { AppCondenseWhitespace } from 'game-jolt-frontend-lib/components/condense-whitespace';
import { Game } from 'game-jolt-frontend-lib/components/game/game.model';
import { Screen } from 'game-jolt-frontend-lib/components/screen/screen-service';
import { number } from 'game-jolt-frontend-lib/vue/filters/number';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import AppGameThumbnail from '../../../../_common/game/thumbnail/thumbnail.vue';

export const GameGridRowSizeSm = 2;
export const GameGridRowSizeMd = 3;
export const GameGridRowSizeLg = 3;

let idCounter = 0;

@Component({
	components: {
		AppGameThumbnail,
		AppAdWidget,
		AppAdPlaywireVideo,
		AppCondenseWhitespace,
	},
	directives: {
		AppTrackEvent,
	},
})
export default class AppGameGrid extends Vue {
	@Prop({ type: Array, default: () => [] })
	games!: Game[];

	@Prop(Number)
	gamesCount?: number;

	@Prop(Number)
	currentPage?: number;

	@Prop(Boolean)
	truncateToFit?: boolean;

	@Prop(Boolean)
	scrollable?: boolean;

	@Prop(Boolean)
	forceScrollable?: boolean;

	@Prop(Boolean)
	showAds?: boolean;

	@Prop(String)
	eventLabel?: string;

	@Prop({ type: String, default: 'top' })
	adPos?: string;

	id = ++idCounter;

	readonly number = number;
	readonly Screen = Screen;

	get shouldShowAds() {
		return this.showAds && Ads.shouldShow;
	}

	get isScrollable() {
		return (Screen.isXs && this.scrollable) || this.forceScrollable;
	}

	/**
	 * Depending on the screen size, we want to only show a certain number of
	 * games. This will trim the last few games off if it can't fit within the
	 * rows completely.
	 */
	get processedGames() {
		const games = this.games;

		if (!this.truncateToFit || this.isScrollable) {
			return games;
		}

		let rowSize = this.rowSize;
		let chunkSize = Math.max(1, Math.floor(games.length / rowSize)) * rowSize;

		// Subtract one for the ad slot.
		if (Screen.isDesktop && this.shouldShowAds) {
			chunkSize -= 1;
		}

		return games.slice(0, chunkSize);
	}

	get rowSize() {
		if (Screen.isSm) {
			return GameGridRowSizeSm;
		} else if (Screen.isMd) {
			return GameGridRowSizeMd;
		} else if (Screen.isLg) {
			return GameGridRowSizeLg;
		}

		return this.games.length;
	}

	shouldShowAd(index: number) {
		if (!this.shouldShowAds || this.isScrollable) {
			return false;
		}

		const numGames = this.processedGames.length;
		const rowSize = this.rowSize;
		const remainder = numGames % rowSize;

		index = index + 1;
		if (Screen.isDesktop) {
			// Only show a trailing ad if there's more than 20 games shown in
			// the grid.
			if (numGames <= 20) {
				return false;
			}

			// Show an add if we're in the last row of games. Since it's desktop
			// display, this will pull it to the right of the row.
			if (numGames - index === remainder) {
				return true;
			}
		} else if (Screen.isSm) {
			// Show after the first 4 games, but only if 6 or more will show
			// after the ad.
			if (index === 5 && numGames - index >= 6) {
				return true;
			} else if (index > 5 && (index - 5) % 10 === 0 && numGames - index >= 6) {
				// Show every 10 games after the first 4, but only if 6 or more will
				// show after the ad.
				return true;
			}
		} else if (Screen.isXs) {
			// Show after the first 2 games, but only if 6 or more will show
			// after the ad.
			if (index === 3 && numGames - index >= 6) {
				return true;
			} else if (index > 3 && (index - 3) % 8 === 0 && numGames - index >= 6) {
				// Show every 8 games after the first 2, but only if 6 or more will
				// show after the ad.
				return true;
			}
		}

		return false;
	}
}
