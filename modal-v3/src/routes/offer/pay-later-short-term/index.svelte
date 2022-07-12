<script lang="js">
	import Modal from '../../../components/Modal.svelte';
	import Header from '../../../components/Header.svelte';
	import BodyContent from '../../../components/BodyContent.svelte';
	import Instructions from '../../../components/Instructions.svelte';
	import ProductListLink from '../../../components/ProductListLink.svelte';
	import Donut from '../../../components/Donut.svelte';
	import InlineLinks from '../../../components/InlineLinks.svelte';
	import shortTermData from '../../../data/shortTerm.js';
	import { currencyFormat } from '../../../lib/currencyFormat';

	export let productMeta = shortTermData.productMeta;
	export let content = shortTermData.content;
	export let zoidInterfaceUrl;
	export let scriptUid;

	const {
		instructions,
		linkToProductList,
		estimatedInstallments,
		disclosure,
		donutTimestamps,
		learnMoreLink
	} = content;

	const { qualifying, periodicPayment } = productMeta;

	let isQualifying = qualifying === 'true';
	let hasInstallments = Object.keys(estimatedInstallments?.items ?? {}).length;

	// TODO: build out functionality
	const renderProductListLink = () => {
		console.log('This takes you back to the product list modal.');
	};

	const donutScreenReaderString = hasInstallments
		? estimatedInstallments.items
				.map((timestamp) => `${timestamp.total_payment} for ${timestamp.payment_date}`)
				.join(', ')
		: donutTimestamps.map((timestamp) => `${currencyFormat(periodicPayment)} for ${timestamp}`);

	const donutItems = (hasInstallments ? estimatedInstallments?.items : donutTimestamps).map(
		(item, index) => ({
			currentNumber: index + 1,
			periodicPayment: (item?.total_payment ?? periodicPayment).replace(/(\s?EUR)/g, ' €'),
			paymentDate: item?.payment_date ?? donutTimestamps[index]
		})
	);
</script>

<svelte:head>
	{#if zoidInterfaceUrl}
		<script src={zoidInterfaceUrl} data-uid={scriptUid}></script>
	{/if}
</svelte:head>

<Modal>
	<Header logo={'logo'} headline={content?.headline} subheadline={content?.subheadline} />
	<BodyContent>
		<div class="content__container">
			<main class="main">
				<div class="content__body">
					<div class="dynamic__container">
						<div class="content__row dynamic">
							<div class="content__col">
								<div class="content__row donuts">
									<div class="donuts__container">
										<span aria-hidden={!isQualifying} class="sr-only">
											{donutScreenReaderString}
										</span>
										<!-- regex replaces EUR with the euro symbol € -->
										{#each donutItems as { periodicPayment, currentNumber, paymentDate }}
											<Donut
												{qualifying}
												{periodicPayment}
												{currentNumber}
												{paymentDate}
												numberOfPayments={donutItems.length}
											/>
										{/each}
									</div>
								</div>
								<Instructions {instructions} />
							</div>
							<div class="content__col">
								<div class="branded-image">
									<!-- TODO: include Icon component when desktop images are final -->
								</div>
							</div>
						</div>
					</div>
					<div class="content__row disclosure">
						<p>
							<InlineLinks text={currencyFormat(disclosure)} />
						</p>
					</div>
					<div class="content__row productLink">
						<div class="productLink__container">
							<ProductListLink>
								{linkToProductList}
							</ProductListLink>
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
