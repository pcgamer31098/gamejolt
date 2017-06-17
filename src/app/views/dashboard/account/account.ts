import Vue from 'vue';
import { State } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import * as View from '!view!./account.html';

import { makeObservableService } from '../../../../lib/gj-lib-client/utils/vue';
import { Screen } from '../../../../lib/gj-lib-client/components/screen/screen-service';
import { AppJolticon } from '../../../../lib/gj-lib-client/vue/components/jolticon/jolticon';
import { AppPageHeader } from '../../../components/page-header/page-header';
import { AppUserAvatar } from '../../../../lib/gj-lib-client/components/user/user-avatar/user-avatar';
import { Store } from '../../../store/index';
import { BeforeRouteEnter } from '../../../../lib/gj-lib-client/utils/router';
import { User } from '../../../../lib/gj-lib-client/components/user/user.model';
import { RouteState, RouteStore } from './account.state';

@View
@Component({
	components: {
		AppJolticon,
		AppPageHeader,
		AppUserAvatar,
	},
})
export default class RouteDashAccount extends Vue {
	@State app: Store['app'];
	@RouteState heading: RouteStore['heading'];

	Screen = makeObservableService(Screen);

	@BeforeRouteEnter({})
	routeEnter() {
		User.touch();
	}

	created() {
		this.$store.registerModule('route', new RouteStore());
	}

	destroyed() {
		this.$store.unregisterModule('route');
	}
}
