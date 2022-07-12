<script>
	import { xprops } from '../stores/xprops';

	export let text = [
		'Please',
		'View the PayPal Credit',
		[
			'Terms and Conditions.',
			'https://www.paypalobjects.com/marketing/web/us/en/ppcterms/ppcterms.html'
		]
	];

	const { onClick } = $xprops;

	const getClickObject = (linkText) =>
		// Remove trailing punctuation if it exists
		onClick({ linkName: linkText.replace(/[^\w]$/, ''), src: 'link_click' });
</script>

{#if !Array.isArray(text)}
	{text}
{:else}
	{#each text as textChunk}
		{#if !Array.isArray(textChunk)}
			<span class="inline-text">{@html textChunk}</span>
		{:else}
			{@const [linkText, linkUrl] = textChunk}
			<span class="inline-link">
				<a href={linkUrl} target="__blank" on:click={() => onClick(getClickObject(linkText))}>
					{linkText}
				</a>
			</span>
		{/if}
	{/each}
{/if}

<style type="text/scss">
	@import '../styles/components/_inline-links.scss';
</style>
