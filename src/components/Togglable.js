import React, { useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = (props, refs) => {
	const { buttonText, children } = props;
	const [visible, setVisible] = React.useState(false);

	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => setVisible(!visible);

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility,
		};
	});

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={() => setVisible(true)}>{buttonText}</button>
			</div>
			<div style={showWhenVisible}>
				{children}
				<button onClick={() => setVisible(false)}>Cancel</button>
			</div>
		</div>
	);
};

Togglable.propTypes = {
	props: PropTypes.object.isRequired,
	refs: PropTypes.object.isRequired,
};

export default React.forwardRef(Togglable);
