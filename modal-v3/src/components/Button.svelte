<script>
	let classes = ['button'];
	export let secondary;
	export let className;
	export let type = 'button';
	export let onClick = () => {};

	if (className) classes = [...classes, className];
</script>

<button class={classes.join(' ')} class:secondary {type} on:click={onClick}>
	<slot />
</button>

<style type="text/scss">
	@import '../styles/components/_button.scss';
</style>
