<script>
	export let currentNumber = 1;
	export let numberOfPayments = 4;
	export let periodicPayment;
	export let paymentDate;
	// TODO: make isQualifying a store/data/thing, this gets used everywhere
	export let qualifying;
	let isQualifying = qualifying === 'true';
	let showPeriodicPayment = isQualifying && periodicPayment !== '-';

	let divClassName = `donut__single_payment ${
		isQualifying ? 'donut__qualifying_payment' : 'donut__non_qualifying_payment'
	}`;

	let CENTER = 21;
	let RADIUS = 15.91549430918954;
	let cx = CENTER;
	let cy = CENTER;

	let DONUT_BACKGROUND_WIDTH = 3;
	let DONUT_SEGMENT_WIDTH = 4;

	let percentage = (currentNumber / numberOfPayments) * 100;
</script>

<div aria-hidden class={divClassName}>
	<svg aria-hidden viewBox="0 0 {2 * cx} {2 * cy}">
		<circle
			class="donut__background"
			{cx}
			{cy}
			r={RADIUS}
			fill="transparent"
			stroke-width={DONUT_BACKGROUND_WIDTH}
		/>

		<circle
			class="donut__percent"
			{cx}
			{cy}
			r={RADIUS}
			fill="transparent"
			stroke-linecap="round"
			stroke-width={DONUT_SEGMENT_WIDTH}
			stroke-dasharray="{percentage} {100 - percentage}"
			stroke-dashoffset={25}
		/>
	</svg>
	{#if showPeriodicPayment}
		<span class="donut__payment">{periodicPayment}</span>
	{/if}
	<span class="donut__timestamp">{paymentDate}</span>
</div>

<style type="text/scss">
	@import '../styles/components/_donut.scss';
</style>
