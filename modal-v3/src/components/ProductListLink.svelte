<script>
	import { goto } from '$app/navigation';
	import { xprops } from '../stores/xprops';

	let classes = ['button'];
	export let type = 'button';
	export let className = 'product-list-link';
	export let secondary = '';

	const { onClick } = $xprops;
	if (className) classes = [...classes, className];

	const getQueryStringFromObject = (object) => {
		return Object.entries(object)
			.filter(([, value]) => !!value && typeof value !== 'function')
			.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
			.join('&');
	};
	const queryString = getQueryStringFromObject({ ...$xprops, payer_id: $xprops.account });

	const openProductList = () => {
		onClick({ linkName: 'PRODUCT_LIST', src: 'link_click' });
		goto(`/credit-presentment/smart/modal/product-list?${queryString}`);
	};
</script>

<button
	id="productListLink"
	class={classes.join(' ')}
	class:secondary
	{type}
	on:click={openProductList}
>
	<slot />
</button>

<style type="text/scss">
	@import '../styles/components/_productListLink.scss';
</style>
