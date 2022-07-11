<script>
	export let handleClose = () => {
		console.log('Close modal overlay.');
	};
</script>

<div class="overlay" on:click={handleClose()} />

<style type="text/scss">
	@import '../styles/components/_overlay.scss';
</style>
