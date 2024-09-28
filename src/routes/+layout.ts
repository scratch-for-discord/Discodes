export const ssr = false;

import { redirect } from '@sveltejs/kit';
import getLocalDB from '$lib/utils/localDB/manager';

const loginLock = ['/interface'];
//redirect to login in locked pages
export const load = async ({ url }) => {
	const db = getLocalDB();
	if (loginLock.includes(url?.pathname) && !db.userID) {
		throw redirect(302, '/auth/login');
	}
	return {
		user: db?.userID || null
	};
};