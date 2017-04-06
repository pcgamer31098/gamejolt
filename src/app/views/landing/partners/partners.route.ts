import VueRouter from 'vue-router';
import { asyncComponentLoader } from '../../../../lib/gj-lib-client/utils/utils';

export const routeLandingPartners: VueRouter.RouteConfig = {
	name: 'landing.partners',
	path: '/partners',
	component: () => asyncComponentLoader( $import( './partners' ) ),
};