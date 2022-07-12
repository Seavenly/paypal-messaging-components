import { populateTemplate } from './lib/miscellaneous.js';
import getDevAccountDetailsV2 from './getDevAccountDetailsV2.js';

export const getModalData = req => {
	const params = new URLSearchParams(req.url);
	const clientId = params.get('client_id');
	const payerId = params.get('payer_id');
	const merchantId = params.get('merchant_id');
	const amount = params.get('amount');
	const account = merchantId || clientId || payerId;

	const { country, terms, modalViews } = getDevAccountDetailsV2({ account, amount });

	const otherVars = {
		'aprEntry.apr': 25.49,
		'aprEntry.formattedDate': '9/01/2020',
		fullYear: 2020
	};

	const views = modalViews.map(({ template, morsVars, offers }) => {
		const viewData = JSON.parse(
			populateTemplate(template, {
				...morsVars,
				...otherVars
			})
		);

		if (offers) {
			viewData.offers = offers.map(offer =>
				JSON.parse(populateTemplate(offer.template, offer.morsVars))
			);
		}

		return viewData;
	});

	return {
		terms,
		country,
		[terms ? 'products' : 'views']: views,
		payerId: account,
		meta: {
			displayedMessage: 'b0ffd6cc-6887-4855-a5c8-4b17a5efb201',
			messageRequestId: '9ad74722-d142-4c5a-9b0b-59cd7b079235',
			trackingDetails: {
				clickUrl: `/ptrk/?fdata=null`,
				impressionUrl: `/ptrk/?fdata=null`,
				payload: {}
			}
		}
	};
};
