<script>
	import Icon from '../components/Icon.svelte';
	import { isLander, isIframe } from '../lib/';

	export let logo = '';
	export let headline = '';
	export let subheadline = '';

	let landerTarget = isLander();
	let iframeTarget = isIframe();
	// export let isQualifying = {isQualifying ?? 'false'};
	// export let qualifyingSubheadline = 'Qualifying Test';

	const handleClose = () => {
		console.log('This button closes the modal.');
		window.xprops?.onClose?.({ linkName: 'Close Button' });
	};
</script>

{#if !landerTarget || iframeTarget}
	<div aria-hidden="true" class="header__fixed-wrapper header__fixed-wrapper--front">
		<div class="header__background-wrapper header__background-wrapper--gradient">
			<Icon name="header-background" />
		</div>
	</div>
	<div aria-hidden="true" class="header__fixed-wrapper">
		<div class="header__background-wrapper">
			<Icon name="header-background" />
		</div>
	</div>
{/if}

<div class="header__icons">
	<div class="logo__wrapper">
		<div class="pp-logo" alt="PayPal Credit Logo">
			<Icon name={logo} />
		</div>
	</div>

	{#if !landerTarget}
		<button class="close" aria-label="Close" type="button" id="close-btn" on:click={handleClose}>
			<Icon name={'close'} />
		</button>
	{/if}

	{#if !landerTarget || iframeTarget}
		<div class="header__fixed-wrapper header__fixed-wrapper--front">
			<div class="header__background-wrapper header__background-wrapper--sticky">
				<Icon name={'header-background'} />
			</div>
		</div>
	{/if}
</div>
<div class="header__content">
	<h1>{@html headline}</h1>
	<!--TODO: Make subheadline content change based on qualifying amount-->
	<h2>{@html subheadline}</h2>
</div>

<style type="text/scss">
	@import '../styles/components/_header.scss';
</style>
