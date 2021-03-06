/**
 * A legacy route is a path that Calypso should ignore, allowing the browser
 * to reload the page.
 */

/**
 * Internal dependencies
 */
import config from 'config';

const notEnabled = feature => () => ! config.isEnabled( feature );

const legacyRoutes = [
	{ match: /.php$/ },
	{ match: /^\/?$/, predicate: notEnabled( 'reader' ) },
	{ match: /^\/my-stats/ },
	{ match: /^\/notifications/ },
	{ match: /^\/themes/ },
	{ match: /^\/manage/ },
	{ match: /^\/plans/, predicate: notEnabled( 'manage/plans' ) },
	{
		match: /^\/me/,
		noMatch: /^\/me\/(billing|next)/,
		predicate: notEnabled( 'me/my-profile' ),
	},
];

/**
 * Determines if a path is a legacy route, and should be ignored by Calypso
 *
 * @param {any} path      The path to check
 * @returns {boolean} True if legacy path, false otherwise
 */
export function isLegacyRoute( path ) {
	return legacyRoutes.some( ( {
		match,
		noMatch = { test: () => false },
		predicate = () => true
	} ) => predicate( path ) && match.test( path ) && ! noMatch.test( path ) );
}
