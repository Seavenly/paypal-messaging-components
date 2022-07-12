/**
 * Checks if target is lander. If true, lander-specific styles will be used.
 * @returns boolean
 */
// TODO: temp function to mock isLander and isIframe
export const isLander = (target = '') => {
	return target === 'LANDER' ? true : false;
};
export const isIframe = () => {
	if (typeof window !== 'undefined') {
		window.top !== window;
	}
};
