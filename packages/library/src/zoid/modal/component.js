import stringIncludes from 'core-js-pure/stable/string/includes';
import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { create } from 'zoid/src';

import {
    getMeta,
    getEnv,
    getGlobalUrl,
    getGlobalVariable,
    getCurrentTime,
    getLibraryVersion,
    viewportHijack,
    logger
} from '@library/common';
import validate from '../message/validation';
import containerTemplate from './containerTemplate';

export default getGlobalVariable('__paypal_credit_modal__', () =>
    create({
        tag: 'paypal-credit-modal',
        url: getGlobalUrl('MODAL'),
        // eslint-disable-next-line security/detect-unsafe-regex
        domain: /\.paypal\.com(:\d+)?$/,
        containerTemplate,
        attributes: {
            iframe: {
                scrolling: 'no'
            }
        },
        props: {
            account: {
                type: 'string',
                queryParam: false,
                required: true,
                value: validate.account
            },
            merchantId: {
                type: 'string',
                queryParam: 'merchant_id',
                required: false,
                value: validate.merchantId
            },
            currency: {
                type: 'string',
                queryParam: true,
                required: false,
                value: validate.currency
            },
            amount: {
                type: 'number',
                queryParam: true,
                required: false,
                value: validate.amount
            },
            refId: {
                type: 'string',
                queryParam: false,
                required: false
            },
            buyerCountry: {
                type: 'string',
                queryParam: 'buyer_country',
                required: false,
                value: validate.buyerCountry
            },
            offer: {
                type: 'string',
                queryParam: false,
                required: false
            },

            // Callbacks
            onClick: {
                type: 'function',
                queryParam: false,
                value: ({ props }) => {
                    const { onClick, onApply, index } = props;

                    return ({ linkName }) => {
                        logger.track({
                            index,
                            et: 'CLICK',
                            event_type: 'click',
                            link: linkName
                        });

                        if (typeof onClick === 'function') {
                            onClick({ linkName });
                        }

                        if (typeof onApply === 'function' && stringIncludes(linkName, 'Apply Now')) {
                            onApply();
                        }
                    };
                }
            },
            onCalculate: {
                type: 'function',
                queryParam: false,
                value: ({ props }) => {
                    const { onCalculate, index } = props;

                    return ({ value }) => {
                        logger.track({
                            index,
                            et: 'CLICK',
                            event_type: 'click',
                            link: 'Calculator',
                            amount: value
                        });

                        if (typeof onCalculate === 'function') {
                            onCalculate({ value });
                        }
                    };
                }
            },
            onClose: {
                type: 'function',
                queryParam: false,
                value: ({ props }) => {
                    const { onClose, index } = props;
                    const [, replaceViewport] = viewportHijack();

                    return ({ linkName }) => {
                        replaceViewport();

                        logger.track({
                            index,
                            et: 'CLICK',
                            event_type: 'modal-close',
                            link: linkName
                        });

                        if (typeof onClose === 'function') {
                            onClose({ linkName });
                        }
                    };
                }
            },
            onReady: {
                type: 'function',
                queryParam: false,
                value: ({ props, state }) => {
                    const { onReady } = props;

                    return ({ products, trackingPayload }) => {
                        const { index, offer } = props;

                        logger.addMetaBuilder(existingMeta => {
                            const key = `modal-${index}`;

                            // Remove potential existing meta info
                            // Necessary because beaver-logger will not override an existing meta key if these values change
                            // eslint-disable-next-line no-param-reassign
                            delete existingMeta[key];
                            return {
                                [key]: {
                                    trackingPayload
                                }
                            };
                        });

                        logger.info('modal_render', {
                            index,
                            duration: getCurrentTime() - state.renderStart
                        });
                        logger.track({
                            index,
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'modal-render',
                            modal: `${products.join('_').toLowerCase()}:${offer.toLowerCase()}`
                        });

                        if (typeof onReady === 'function') {
                            onReady({ products });
                        }
                    };
                }
            },

            // Computed Props
            payerId: {
                type: 'string',
                queryParam: 'payer_id',
                decorate: ({ props }) => (!stringStartsWith(props.account, 'client-id:') ? props.account : ''),
                default: () => '',
                required: false
            },
            clientId: {
                type: 'string',
                queryParam: 'client_id',
                decorate: ({ props }) => (stringStartsWith(props.account, 'client-id:') ? props.account.slice(10) : ''),
                default: () => '',
                required: false
            },
            sdkMeta: {
                type: 'string',
                queryParam: true,
                sendToChild: false,
                required: false,
                value: getMeta
            },
            env: {
                type: 'string',
                queryParam: true,
                value: getEnv
            },
            version: {
                type: 'string',
                queryParam: true,
                value: getLibraryVersion
            }
        }
    })
);
