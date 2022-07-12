<script>
	import { goto } from '$app/navigation';

	let classes = ['button'];
	export let type = 'button';
	export let className = 'product-list-link';
	export let secondary = '';

	if (className) classes = [...classes, className];

	const openProductList = () => {
		goto('/credit-presentment/smart/modal');
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
