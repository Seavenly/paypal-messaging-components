<script>
	import Modal from '@/components/Modal.svelte';
	import Header from '@/components/Header.svelte';
	import BodyContent from '@/components/BodyContent.svelte';
	import Tile from '@/components/Tile.svelte';

	// export let content = productListData.content;
	export let zoidInterfaceUrl;
	export let scriptUid;
	export let customData;
	export let content = customData.products[0].content;

	const { instructions, disclosure, productTiles } = content;

	const availableTiles = {
		payLater: productTiles?.payLater?.filter(
			(tile) => true
			// views.find((view) => tile.viewName === view.meta.product)
		),
		credit: productTiles?.credit?.filter(
			(tile) => true
			// views.find((view) => tile.viewName === view.meta.product)
		)
	};

	const showPayLaterInstructions = productTiles && !!availableTiles.payLater?.length;
	const showCreditInstructions = productTiles && !!availableTiles.credit?.length;

	export let setViewName = () => {};
</script>

<svelte:head>
	{#if zoidInterfaceUrl}
		<script src={zoidInterfaceUrl} data-uid={scriptUid}></script>
	{/if}
</svelte:head>

<Modal>
	<Header logo={'logo'} headline={content?.headline} />
	<BodyContent>
		<div class="content__container">
			<main class="main">
				<div class="content__body">
					<div class="content__row dynamic">
						<div class="content__col">
							{#if showPayLaterInstructions}
								<div class="content__row instructions">
									<p>
										{@html instructions?.payLater}
									</p>
								</div>
							{/if}
							{#each availableTiles.payLater as { header, body, icon, viewName }}
								<Tile {header} {body} {icon} {viewName} {setViewName} {customData}/>
							{/each}

							{#if showCreditInstructions}
								<div class="content__row instructions">
									<p>
										{@html instructions?.credit}
									</p>
								</div>
							{/if}
							{#each availableTiles.credit as { header, body, icon, viewName }}
								<Tile {header} {body} {icon} {viewName} {setViewName} {customData}/>
							{/each}
						</div>
						<div class="content__col collapsed">
							<div class="branded-image" />
						</div>
					</div>
					<div class="content__row disclosure collapsed">{disclosure}</div>
				</div>
			</main>
		</div>
	</BodyContent>
</Modal>

<style type="text/scss">
	@import '../../styles/components/_content.scss';
	@import './index.scss';
</style>
