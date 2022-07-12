<script>
	import handleClose from '../lib/handleClose';

	const handleEscapeKeyPress = (event) => {
		if (event.key === 'Escape' || event.key === 'Esc' || event.charCode === 27) {
			handleClose('Escape Key');
		}
	};
</script>

<svelte:window on:keyup={handleEscapeKeyPress} />

<div class="overlay" on:click={() => handleClose('Modal Overlay')} />

<style type="text/scss">
	@import '../styles/components/_overlay.scss';
</style>
