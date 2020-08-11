import { ZalgoPromise } from 'zalgo-promise';

import { logger, memoizeOnProps } from '../../utils';
import { Modal } from '../../zoid/modal';
import useViewportHijack from './viewportHijack';

export default memoizeOnProps(
    ({ account, merchantId, currency, amount, onReady, onCalculate, onApply, onClose, index }) => {
        const [hijackViewport, replaceViewport] = useViewportHijack();

        const createOnReadyHandler = (props = {}) => ({ type }) => {
            logger.info('modal_render', { index: props.index });
            logger.track({
                index: props.index,
                et: 'CLIENT_IMPRESSION',
                event_type: 'modal-render',
                modal: type
            });

            if (typeof props.onReady === 'function') {
                props.onReady({ type });
            }
        };

        const createOnCalculateHandler = (props = {}) => ({ value }) => {
            logger.track({
                index: props.index,
                et: 'CLICK',
                event_type: 'click',
                link: 'Calculator',
                amount: value
            });

            if (typeof props.onCalculate === 'function') {
                props.onCalculate({ value });
            }
        };

        const createOnClickHandler = (props = {}) => ({ linkName }) => {
            logger.track({
                index: props.index,
                et: 'CLICK',
                event_type: 'click',
                link: linkName
            });

            if (typeof props.onApply === 'function' && linkName.includes('Apply Now')) {
                props.onApply();
            }
        };

        const createOnCloseHandler = (props = {}) => ({ linkName }) => {
            replaceViewport();
            logger.track({
                index: props.index,
                et: 'CLICK',
                event_type: 'modal-close',
                link: linkName
            });

            if (typeof props.onClose === 'function') {
                props.onClose({ linkName });
            }
        };

        const { render, hide, updateProps } = Modal({
            index,
            account,
            merchantId,
            currency,
            amount,
            onReady: createOnReadyHandler({ index, onReady }),
            onCalculate: createOnCalculateHandler({ index, onCalculate }),
            onClick: createOnClickHandler({ index, onApply }),
            onClose: createOnCloseHandler({ index, onClose })
        });

        let renderProm;
        const renderModal = (selector = 'body') => {
            // The render promise will resolve before Preact renders and picks up changes
            // via updateProps so a small delay is added after the initial "render" promise
            if (!renderProm) {
                renderProm = render(selector).then(() => ZalgoPromise.delay(100));
                hide();
            }

            return renderProm;
        };

        const showModal = (newOptions = {}) => {
            if (!renderProm) {
                renderProm = renderModal('body');
            }
            return renderProm.then(() => {
                hijackViewport();

                logger.track({
                    index: newOptions.index,
                    et: 'CLIENT_IMPRESSION',
                    event_type: 'modal-open'
                });

                return updateProps({
                    visible: true,
                    ...newOptions,
                    onReady: createOnReadyHandler(newOptions),
                    onCalculate: createOnCalculateHandler(newOptions),
                    onClick: createOnClickHandler(newOptions),
                    onClose: createOnCloseHandler(newOptions)
                });
            });
        };

        const hideModal = () => {
            if (!renderProm) {
                renderProm = renderModal('body');
            }
            return renderProm.then(() => updateProps({ visible: false }));
        };

        const updateModal = newOptions =>
            updateProps({
                ...newOptions,
                onReady: createOnReadyHandler(newOptions),
                onCalculate: createOnCalculateHandler(newOptions),
                onClick: createOnClickHandler(newOptions),
                onClose: createOnCloseHandler(newOptions)
            });

        // Follow existing zoid interface
        return {
            render: renderModal,
            show: showModal,
            hide: hideModal,
            updateProps: updateModal
        };
    },
    ['account', 'merchantId']
);
