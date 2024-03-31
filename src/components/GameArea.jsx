import { useEffect } from "react";
import PropTypes from "prop-types";

function GameArea({ inputCode }) {
	useEffect(() => {
		if (!inputCode) return;

		console.log(inputCode);
	}, [inputCode]);

	return <div>hello world</div>;
}

GameArea.propTypes = {
	inputCode: PropTypes.string.isRequired,
};

export default GameArea;
