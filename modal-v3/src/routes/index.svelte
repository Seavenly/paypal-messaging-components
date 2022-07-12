<script lang="ts">
	import { xprops } from '../stores/xprops';
	import ProductList from './product-list/index.svelte';
	import ShortTerm from './offer/pay-later-short-term/index.svelte';

	export let zoidInterfaceUrl: string;
	export let scriptUid: string;
	export let offer: string | undefined;
	export let customData: Object;

	offer = $xprops.offer;
</script>

{#if !offer}
	<ProductList {zoidInterfaceUrl} {scriptUid} {customData}/>
{:else if offer === 'PAY_LATER_SHORT_TERM'}
	<ShortTerm {zoidInterfaceUrl} {scriptUid} {customData}/>
{/if}
