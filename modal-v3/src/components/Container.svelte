<script>
	import Icon from '../components/Icon.svelte';
	import Overlay from './Overlay.svelte';
	import { isLander } from '../lib/';

	let landerTarget = isLander();
</script>

<div class="modal-wrapper">
	{#if landerTarget}
		<Icon name={'header-background'} />
	{/if}
	<!-- <div class="spinner" style={{ opacity: loading ? '1' : '0' }} /> -->
	<Overlay />
	<!-- Presentational div to clip scrollbars with a rounded border-->
	<div class="content__wrapper-overflow">
		<!-- Scrollable content -->
		<!--TODO: content wrapper ref-->
		<div class="content__wrapper">
			<slot />
		</div>
	</div>
</div>
