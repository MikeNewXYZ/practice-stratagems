import PropTypes from "prop-types";

function NotificationToast({ heading, subheading }) {
	return (
		<div className="text-center">
			<div className="text-xl font-normal">{heading}</div>
			<div className="text-sm font-light">{subheading}</div>
		</div>
	);
}

NotificationToast.propTypes = {
	heading: PropTypes.node,
	subheading: PropTypes.node,
};

export default NotificationToast;
