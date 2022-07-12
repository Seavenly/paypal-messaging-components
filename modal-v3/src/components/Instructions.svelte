<script lang="js">
	export let instructions = [];
</script>

<div class="content__row instructions">
	<ol>
		{#each instructions as instruction, index}
			<li class="instructions__item-wrapper">
				<div class="instructions__bullet">
					<span>{index + 1}</span>
				</div>
				<div>{@html instruction}</div>
			</li>
		{/each}
	</ol>
</div>

<style type="text/scss">
	@import '../styles/components/_instructions.scss';
</style>
