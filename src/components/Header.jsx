import PropTypes from "prop-types";
import logo from "../assets/logo.svg";
import { Icon } from "@iconify/react";

function Header({ settings, saveSettings, refreshStratagems }) {
	// Modify deeply nested values in a object easily.
	const changeSettings = (settings, value, path) => {
		let newSettings = settings;
		path = path.split(".");
		let index = 0;

		for (index; index < path.length - 1; index++) {
			newSettings = newSettings[path[index]];
		}

		newSettings[path[index]] = value;

		// Somehow "settings" is modified after all this, I don't know why but it works.
		saveSettings(settings);
	};

	return (
		<header className="flex w-full flex-col items-center justify-center gap-6">
			<div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
				<div className="flex items-center gap-2 ">
					<img className="aspect-square h-8" src={logo} />
					<h1 className="text-center font-mono text-xl font-black sm:text-3xl">
						PRACTICE STRATAGEMS
					</h1>
				</div>

				<div className="flex h-full gap-2 rounded-md bg-stone-800 px-2 text-2xl">
					<button
						className="p-2 transition-all duration-500 hover:bg-stone-900"
						onClick={() =>
							changeSettings(settings, !settings.general.radio, "general.radio")
						}
					>
						<Icon
							className="transition-all duration-500"
							style={{ opacity: settings.general.radio ? 1 : 0.5 }}
							icon="ic:baseline-radio"
						/>
					</button>
					<button
						className="p-2 transition-all duration-500 hover:bg-stone-900"
						onClick={() =>
							changeSettings(settings, !settings.general.audio, "general.audio")
						}
					>
						<Icon
							className="transition-all duration-500"
							style={{ opacity: settings.general.audio ? 1 : 0.5 }}
							icon="ic:baseline-volume-up"
						/>
					</button>
					<button
						className="p-2 transition-all duration-500 hover:bg-stone-900"
						onClick={() => refreshStratagems()}
					>
						<Icon icon="ic:baseline-refresh" />
					</button>
					<button className="p-2 transition-all duration-500 hover:bg-stone-900">
						<Icon icon="ic:baseline-videogame-asset" />
					</button>
				</div>
			</div>

			<div className="flex w-full flex-wrap justify-center gap-2 px-4 font-mono text-sm font-light sm:gap-6 sm:text-xl">
				<button
					className="flex items-center justify-center gap-2 transition-opacity duration-500 hover:opacity-50"
					onClick={() => {
						if (!settings.stratagems.helldiversTwo) return;
						changeSettings(
							settings,
							!settings.stratagems.helldiversOne,
							"stratagems.helldiversOne",
						);

						refreshStratagems();
					}}
				>
					{settings.stratagems.helldiversOne ? (
						<Icon icon="ic:baseline-check-box" />
					) : (
						<Icon icon="ic:baseline-indeterminate-check-box" />
					)}
					<span>HELLDIVERS ONE</span>
				</button>
				<button
					className="flex items-center justify-center gap-2 transition-opacity duration-500 hover:opacity-50"
					onClick={() => {
						if (!settings.stratagems.helldiversOne) return;
						changeSettings(
							settings,
							!settings.stratagems.helldiversTwo,
							"stratagems.helldiversTwo",
						);

						refreshStratagems();
					}}
				>
					{settings.stratagems.helldiversTwo ? (
						<Icon icon="ic:baseline-check-box" />
					) : (
						<Icon icon="ic:baseline-indeterminate-check-box" />
					)}
					<span>HELLDIVERS TWO</span>
				</button>
			</div>
		</header>
	);
}

Header.propTypes = {
	settings: PropTypes.object.isRequired,
	saveSettings: PropTypes.func.isRequired,
	refreshStratagems: PropTypes.func.isRequired,
};

export default Header;
