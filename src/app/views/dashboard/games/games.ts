import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({})
export default class RouteDashGames extends Vue {
	render(h: Vue.CreateElement) {
		return h('router-view');
	}
}
