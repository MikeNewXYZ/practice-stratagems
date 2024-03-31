import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

const iconID = {
	UP: "fa:arrow-up",
	DOWN: "fa:arrow-down",
	LEFT: "fa:arrow-left",
	RIGHT: "fa:arrow-right",
};

function GameArea({ stratagems }) {
	return (
		<main className="relative flex w-full flex-grow flex-col items-center gap-8 overflow-hidden p-2 lg:w-9/12">
			<div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-t from-stone-950 from-0% via-transparent"></div>

			{stratagems.map(({ name, inputCode }, index) => (
				<div key={index} className="flex w-full flex-col gap-2">
					<h1 className="text-sm font-bold uppercase sm:text-xl">{name}</h1>
					<div className="flex flex-wrap gap-4 rounded-md bg-stone-800 p-4 text-xl sm:text-4xl md:text-3xl">
						{inputCode.map(({ id, correct }, index) => (
							<Icon
								key={index}
								className={correct && "opacity-50"}
								icon={iconID[id]}
							/>
						))}
					</div>
				</div>
			))}
		</main>
	);
}

GameArea.propTypes = {
	stratagems: PropTypes.array.isRequired,
};

export default GameArea;
