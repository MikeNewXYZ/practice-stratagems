import PropTypes from "prop-types";
import logo from "../assets/logo.svg";
import { Icon } from "@iconify/react";

function Header({ settings, saveSettings, refreshStratagems }) {
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
							saveSettings(() => {
								let newSettings = settings;
								newSettings.general.radio = !newSettings.general.radio;
								return newSettings;
							})
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
							saveSettings(() => {
								let newSettings = settings;
								newSettings.general.audio = !newSettings.general.audio;
								return newSettings;
							})
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
						saveSettings(() => {
							let newSettings = settings;
							newSettings.stratagems.helldiversOne =
								!newSettings.stratagems.helldiversOne;
							return newSettings;
						});

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
						saveSettings(() => {
							let newSettings = settings;
							newSettings.stratagems.helldiversTwo =
								!newSettings.stratagems.helldiversTwo;
							return newSettings;
						});

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
