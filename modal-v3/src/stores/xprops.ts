import { browser } from '$app/env';
import { readable } from 'svelte/store';

interface XProps {
	offer?: string;
	onProps: (onProps: (newProps: XProps) => void) => void;
}

declare global {
	interface Window {
		xprops: XProps;
	}
}

export const xprops = readable<XProps>({ onProps: () => undefined }, (set) => {
	if (browser && window.xprops) {
		set(window.xprops);

		window.xprops.onProps((newProps) => {
			set({ ...newProps });
		});
	}
});
