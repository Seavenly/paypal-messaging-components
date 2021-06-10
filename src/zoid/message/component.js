import stringStartsWith from 'core-js-pure/stable/string/starts-with';
import { create } from 'zoid/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { getCurrentScriptUID } from 'belter/src';

import {
    getMeta,
    getEnv,
    getGlobalUrl,
    createGlobalVariableGetter,
    getLibraryVersion,
    runStats,
    logger,
    getStorageID,
    getSessionID,
    getGlobalState,
    getCurrentTime,
    getStageTag
} from '../../utils';
import validate from './validation';
import containerTemplate from './containerTemplate';

export default createGlobalVariableGetter('__paypal_credit_message__', () =>
    create({
        tag: 'paypal-message',
        url: getGlobalUrl('MESSAGE'),
        // eslint-disable-next-line security/detect-unsafe-regex
        domain: /\.paypal\.com(:\d+)?$/,
        containerTemplate,
        autoResize: {
            width: true,
            height: true,
            element: 'button'
        },
        attributes: {
            iframe: {
                title: 'PayPal Message',
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
            amount: {
                type: 'number',
                queryParam: true,
                required: false,
                value: validate.amount
            },
            currency: {
                type: 'string',
                queryParam: true,
                required: false,
                value: validate.currency
            },
            placement: {
                type: 'string',
                queryParam: true,
                required: false,
                value: validate.placement
            },
            style: {
                type: 'object',
                serialization: 'json',
                queryParam: true,
                required: false,
                value: validate.style
            },
            offer: {
                type: 'string',
                queryParam: 'credit_type',
                required: false,
                value: validate.offer
            },
            buyerCountry: {
                type: 'string',
                queryParam: 'buyer_country',
                required: false,
                value: validate.buyerCountry
            },
            ignoreCache: {
                type: 'boolean',
                queryParam: 'ignore_cache',
                required: false,
                value: validate.ignoreCache
            },

            // Callbacks
            onClick: {
                type: 'function',
                queryParam: false,
                value: ({ props, focus }) => {
                    const { onClick } = props;

                    return ({ meta }) => {
                        const { modal, index, account, merchantId, currency, amount, buyerCountry, onApply } = props;
                        const { offerType, messageRequestId } = meta;
                        // Avoid spreading message props because both message and modal
                        // zoid components have an onClick prop that functions differently

                        // this checks to see if display none is on the parent iframe div id.
                        // if the modal content never loads (eg. api request error), we need to have click functionality to show the prerender window
                        // if there is an error and the modal never shows we have control here to show the spinner or not
                        // possibly even render some type of message in the modal to show an error occured?
                        if (document.querySelector(`#${modal.prerenderDetails.uid}`)) {
                            document.querySelector(`#${modal.prerenderDetails.uid}`).style.display = 'block';
                            modal.prerenderDetails.prerenderElement.classList.remove(
                                `${modal.prerenderDetails.uid}-invisible`
                            );
                            modal.prerenderDetails.prerenderElement.classList.add(
                                `${modal.prerenderDetails.uid}-visible`
                            );
                            // no way to check if prerenderer is fully loaded so wait 100ms before attempting to see if the elements exist.
                            if (modal.prerenderDetails.prerenderElement.contentDocument) {
                                setTimeout(() => {
                                    modal.prerenderDetails.prerenderElement.contentDocument
                                        .getElementsByClassName('modal-content')[0]
                                        .classList.add('show');
                                    modal.prerenderDetails.prerenderElement.contentDocument.getElementsByClassName(
                                        'overlay'
                                    )[0].style.opacity = 1;
                                }, 100);
                            }
                        }

                        modal.show({
                            account,
                            merchantId,
                            currency,
                            amount,
                            buyerCountry,
                            onApply,
                            offer: offerType,
                            refId: messageRequestId,
                            refIndex: index,
                            onClose: () => focus()
                        });

                        logger.track({
                            index,
                            et: 'CLICK',
                            event_type: 'MORS'
                        });
                        logger.track({
                            index,
                            et: 'CLICK',
                            event_type: 'click',
                            link: 'Banner Wrapper'
                        });

                        if (typeof onClick === 'function') {
                            onClick({ meta });
                        }
                    };
                }
            },
            onHover: {
                type: 'function',
                queryParam: false,
                value: ({ props }) => {
                    const { onHover } = props;
                    let hasHovered = false;

                    return ({ meta }) => {
                        const { index } = props;

                        if (!hasHovered) {
                            hasHovered = true;
                            logger.track({
                                index,
                                et: 'CLIENT_IMPRESSION',
                                event_type: 'hover'
                            });
                        }

                        if (typeof onHover === 'function') {
                            onHover({ meta });
                        }
                    };
                }
            },
            onReady: {
                type: 'function',
                queryParam: false,
                value: ({ props }) => {
                    const { onReady } = props;

                    return ({ meta, activeTags }) => {
                        const { account, merchantId, index, modal, getContainer } = props;
                        const { messageRequestId, displayedMessage, trackingDetails, offerType } = meta;
                        logger.addMetaBuilder(existingMeta => {
                            // Remove potential existing meta info
                            // Necessary because beaver-logger will not override an existing meta key if these values change
                            // eslint-disable-next-line no-param-reassign
                            delete existingMeta[index];

                            return {
                                [index]: {
                                    type: 'message',
                                    messageRequestId,
                                    account: merchantId || account,
                                    displayedMessage,
                                    trackingDetails
                                }
                            };
                        });

                        runStats({
                            container: getContainer(),
                            activeTags,
                            index
                        });
                        // Set visible to false to prevent this update from popping open the modal
                        // when the user has previously opened the modal
                        modal.updateProps({ refIndex: index, offer: offerType, visible: false });

                        logger.track({
                            index,
                            et: 'CLIENT_IMPRESSION',
                            event_type: 'MORS'
                        });

                        if (typeof onReady === 'function') {
                            onReady({ meta });
                        }
                    };
                }
            },
            onMarkup: {
                type: 'function',
                queryParam: false,
                value: ({ props, event }) => {
                    const { onMarkup } = props;

                    return ({ styles, warnings, ...rest }) => {
                        const { getContainer } = props;

                        if (typeof styles !== 'undefined') {
                            event.trigger('styles', { styles });
                        }

                        if (warnings) {
                            warnings.forEach(warning => {
                                logger.warn('render_warning', {
                                    description: warning,
                                    container: getContainer()
                                });
                            });
                        }

                        return onMarkup && onMarkup({ styles, warnings, ...rest });
                    };
                }
            },
            onDestroy: {
                type: 'function',
                queryParam: false,
                value: ({ props }) => {
                    const { onDestroy } = props;

                    // Handle moving the iframe around the DOM
                    return () => {
                        const { getContainer } = props;
                        const { messagesMap } = getGlobalState();
                        const container = getContainer();
                        // Let the cleanup finish before re-rendering
                        ZalgoPromise.delay(0).then(() => {
                            if (container && container.ownerDocument.body.contains(container)) {
                                // Will re-render with the full config options stored in the zoid props
                                const { render, state, updateProps, clone } = messagesMap.get(container).clone();

                                state.renderStart = getCurrentTime();

                                messagesMap.set(container, { render, updateProps, state, clone });

                                render(container);
                            }
                        });

                        if (typeof onDestroy === 'function') {
                            onDestroy();
                        }
                    };
                }
            },

            // Computed Props
            payerId: {
                type: 'string',
                queryParam: 'payer_id',
                decorate: ({ props }) => (!stringStartsWith(props.account, 'client-id:') ? props.account : null),
                default: () => '',
                required: false
            },
            clientId: {
                type: 'string',
                queryParam: 'client_id',
                decorate: ({ props }) =>
                    stringStartsWith(props.account, 'client-id:') ? props.account.slice(10) : null,
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
            },
            deviceID: {
                type: 'string',
                queryParam: true,
                value: getStorageID
            },
            sessionID: {
                type: 'string',
                queryParam: true,
                value: getSessionID
            },
            scriptUID: {
                type: 'string',
                queryParam: true,
                value: getCurrentScriptUID
            },
            stageTag: {
                type: 'string',
                queryParam: true,
                required: false,
                value: getStageTag
            }
        }
    })
);
