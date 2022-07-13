<script context="module">
	export { load } from '../lib/serverData';
</script>

<script lang="ts">
	import { xprops } from '../stores/xprops';
	import ShortTerm from './offer/pay-later-short-term/index.svelte';
	import NoInterest from './offer/paypal-credit-no-interest/index.svelte';
	import ProductList from './product-list/index.svelte';

	export let zoidInterfaceUrl: string;
	export let scriptUid: string;
	export let offer: string | undefined;
	export let modalData: object;

	offer = $xprops.offer ?? offer;
</script>

{#if !offer}
	<ProductList {zoidInterfaceUrl} {scriptUid} {modalData} />
{:else if offer === 'PAY_LATER_SHORT_TERM'}
	<ShortTerm {zoidInterfaceUrl} {scriptUid} {modalData} />
{:else if offer === 'PAYPAL_CREDIT_NO_INTEREST'}
	<NoInterest {zoidInterfaceUrl} {scriptUid} {modalData} />
{/if}
