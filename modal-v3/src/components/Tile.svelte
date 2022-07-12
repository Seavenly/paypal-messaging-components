<script>
	import Icon from './Icon.svelte';

	export let modalData;
	export let content = modalData.views[0].content;
	export let header;
	export let body;
	export let icon;
	export let viewName;

	export let setViewName = console.log;
	// TODO: change to original: const { onClick } = useXProps();
	export let onClick = console.log;
	const tileIcons = content.tileIcons;
</script>

<button
	class="tile"
	aria-label={`${header} ${body}`}
	type="button"
	on:click={() => {
		setViewName(viewName);
		onClick({ linkName: viewName, src: 'link_click' });
	}}
>
	<div class="tile__row">
		<div class="tile__col tile__image">
			<Icon content={tileIcons[icon]} />
		</div>
		<div aria-hidden="true" class="tile__col">
			<div class="tile__header">{header}</div>
			<div class="tile__body">{body}</div>
		</div>
	</div>
</button>

<style type="text/scss">
	@import '../styles/components/_tile.scss';
</style>
