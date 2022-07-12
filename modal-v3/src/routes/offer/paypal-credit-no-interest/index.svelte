<script>
	import Modal from '../../../components/Modal.svelte';
	import Header from '../../../components/Header.svelte';
	import Instructions from '../../../components/Instructions.svelte';
	import ProductListLink from '../../../components/ProductListLink.svelte';
	import BodyContent from '../../../components/BodyContent.svelte';
	import Button from '../../../components/Button.svelte';
	import InlineLinks from '../../../components/InlineLinks.svelte';
	import noInterestData from '../../../data/noInterest.js';

	export let content = noInterestData?.content;
	export let zoidInterfaceUrl;
	export let scriptUid;

	const handleApplyNowClick = () => {
		console.log('Apply for PayPal Credit.');
	};

	const renderProductListLink = () => {
		console.log('This takes you back to the product list modal.');
	};

	const {
		headline,
		subheadline,
		instructions,
		terms,
		buttonText,
		disclaimer,
		footer,
		linkToProductList
	} = content;
</script>

<svelte:head>
	{#if zoidInterfaceUrl}
		<script src={zoidInterfaceUrl} data-uid={scriptUid}></script>
	{/if}
</svelte:head>

<Modal>
	<Header logo={'logo'} {headline} {subheadline} />
	<BodyContent>
		<div class="content__container">
			<main class="main">
				<div class="content__body">
					<div class="content__row dynamic">
						<div class="content__col">
							<Instructions {instructions} />
						</div>
						<div class="content__col">
							<div class="branded-image">
								<!-- TODO: include Icon component when desktop images are final -->
							</div>
						</div>
					</div>
				</div>
				<div class="content__footer">
					<ul class="content__row terms">
						{#each terms as term, index}
							<li class="terms-item">
								<span class="terms-bullet" />
								<span class="terms-content">{term}</span>
							</li>
						{/each}
					</ul>
					<ul>
						{#each footer as footerItem}
							<li class="content__footer-item">
								<InlineLinks text={footerItem} />
							</li>
						{/each}
					</ul>
					<ul>
						<!--TODO: conditionally render productListLink component-->
						<!-- {#if views?.length > 2} -->
						<li class="content__footer-item">
							<ProductListLink openProductList={renderProductListLink}
								>{linkToProductList}</ProductListLink
							>
						</li>
						<!-- {/if} -->
					</ul>
				</div>
				<div class="content__body">
					<div class="content__row dynamic">
						<div class="button__fixed-wrapper">
							<div class="button__container">
								<Button className="content__row" onClick={handleApplyNowClick}>
									{buttonText}
								</Button>
								<div class="content__row content__disclaimer">{disclaimer}</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	</BodyContent>
</Modal>

<style type="text/scss">
	@import '../../../styles/components/_content.scss';
	@import './index.scss';
</style>
