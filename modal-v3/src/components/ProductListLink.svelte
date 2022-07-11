<script>
	let classes = ['button'];
	export let type = 'button';
	export let className = 'product-list-link';
	export let secondary = '';
	export let openProductList = () => {};

	if (className) classes = [...classes, className];
</script>

<button
	id="productListLink"
	class={classes.join(' ')}
	class:secondary
	{type}
	on:click={openProductList()}
>
	<slot />
</button>

<style type="text/scss">
	@import '../styles/components/_productListLink.scss';
</style>
