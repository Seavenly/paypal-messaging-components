const data = {
	productMeta: { qualifying: 'true', periodicPayment: '23.99' },
	content: {
		estimatedInstallments: {
			items: [
				{ total_payment: '$25.01', payment_date: 'Today' },
				{ total_payment: '$25.01', payment_date: '2 weeks' },
				{ total_payment: '$25.01', payment_date: '4 weeks' },
				{ total_payment: '$25.01', payment_date: '6 weeks' }
			]
		},

		headline: 'Pay in 4 interest-free payments',
		subheadline:
			'No impact on credit score and no late fees. Available for purchases of {formattedMinAmount} to {formattedMaxAmount}.',
		qualifyingSubheadline:
			'Split your purchase of {formattedTotalCost} into {total_payments} with no impact on credit score and no late fees.',
		donutTimestamps: ['Today', '2 weeks', '4 weeks', '6 weeks'],
		instructions: [
			'Choose PayPal at checkout to pay later with <strong>Pay in 4</strong>. ',
			'Complete your purchase with a 25% down payment.',
			"Use autopay for the rest of your payments. It's easy!"
		],
		disclosure:
			'Pay in 4 is available to consumers upon approval for purchases of $30-$1,500. Pay in 4 is not currently available to residents of Missouri, Nevada, New Mexico, North Dakota, Wisconsin, or any U.S. Territories. Offer availability depends on the merchant and also may not be available for certain recurring, subscription services. When applying, a soft credit check may be needed, but will not affect your credit score. You must be of legal age in your U.S. state of residence to use Pay in 4. Loans to California residents are made or arranged pursuant to a California Financing Law License. PayPal, Inc. is a Georgia Installment Lender Licensee, NMLS #910457. Rhode Island Small Loan Lender Licensee.',
		linkToProductList: 'See other ways to pay over time'
	}
};

export default data;
