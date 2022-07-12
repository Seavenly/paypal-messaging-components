const handleClose = linkName => {
	document.body.classList.add('modal-closed');
	window.xprops?.onClose?.({ linkName });
};

export default handleClose;
