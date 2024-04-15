import PropTypes from "prop-types";
import logo from "../assets/logo.svg";
import { Icon } from "@iconify/react";
import { toast } from "react-hot-toast";
import NotificationToast from "./NotificationToast";
import radioEnabledAudio from "../audio/radio-enabled.wav";
import radioDisabledAudio from "../audio/radio-disabled.wav";

function Header({
	settings,
	changeSettings,
	refreshStratagems,
	playAudio,
	setModalActive,
}) {
	const handleToggleStratagems = (version, otherVersion) => {
		if (settings.stratagems[otherVersion]) {
			changeSettings(
				settings,
				!settings.stratagems[version],
				`stratagems.${version}`,
			);
			refreshStratagems();

			toast.custom(() => (
				<NotificationToast
					heading={`Stratagem ${settings.stratagems[version] ? "enabled" : "disabled"}`}
				/>
			));
		} else {
			toast.custom(() => (
				<NotificationToast
					heading={"COWARD!!!"}
					subheading={"You can't disable all stratagems"}
				/>
			));
		}
	};

	return (
		<header className="flex w-full flex-col items-center justify-center gap-2 sm:gap-6">
			<div className="flex w-full flex-col items-center justify-center gap-4 p-2 md:flex-row md:gap-6">
				<div className="flex items-center gap-4">
					<img className="aspect-square h-10" src={logo} />
					<div>
						<h1 className="text-center font-mono text-xl font-black sm:text-2xl">
							PRACTICE STRATAGEMS
						</h1>
						<a
							className="text-sm font-extralight"
							href="https://github.com/MikeNewXYZ"
							target="_blank"
						>
							by MikeNewXYZ
						</a>
					</div>
				</div>

				<div className="flex h-12 w-full justify-evenly gap-2 rounded-md bg-stone-800 px-2 text-2xl sm:w-auto">
					<button
						className="flex aspect-square max-h-full items-center justify-center transition-all duration-500 hover:bg-stone-900"
						onClick={() => {
							changeSettings(
								settings,
								!settings.general.radio,
								"general.radio",
							);

							toast.custom(() => (
								<NotificationToast
									heading={`Radio button ${settings.general.radio ? "enabled" : "disabled"}`}
									subheading={
										settings.general.radio &&
										`Hold "${settings.controls.radio}" to use`
									}
								/>
							));

							settings.general.radio
								? playAudio(radioEnabledAudio)
								: playAudio(radioDisabledAudio);
						}}
					>
						<Icon
							className="transition-all duration-500"
							style={{ opacity: settings.general.radio ? 1 : 0.5 }}
							icon="ic:baseline-radio"
						/>
					</button>
					<button
						className="flex aspect-square max-h-full items-center justify-center transition-all duration-500 hover:bg-stone-900"
						onClick={() => {
							changeSettings(
								settings,
								!settings.general.audio,
								"general.audio",
							);
							toast.custom(() => (
								<NotificationToast
									heading={`Audio ${settings.general.audio ? "enabled" : "disabled"}`}
								/>
							));
						}}
					>
						<Icon
							className="transition-all duration-500"
							style={{ opacity: settings.general.audio ? 1 : 0.5 }}
							icon="ic:baseline-volume-up"
						/>
					</button>
					<button
						className="flex aspect-square max-h-full items-center justify-center transition-all duration-500 hover:bg-stone-900"
						onClick={() => {
							refreshStratagems();
							toast.custom(() => (
								<NotificationToast heading="Stratagems refreshed" />
							));
						}}
					>
						<Icon icon="ic:baseline-refresh" />
					</button>
					<button
						className="flex aspect-square max-h-full items-center justify-center transition-all duration-500 hover:bg-stone-900"
						onClick={() => setModalActive(true)}
					>
						<Icon icon="ic:baseline-videogame-asset" />
					</button>
				</div>
			</div>

			<div className="flex w-full flex-wrap justify-center gap-2 px-4 font-mono text-sm font-light sm:gap-6 sm:text-xl">
				<button
					className="flex items-center justify-center gap-2 transition-opacity duration-500 hover:opacity-50"
					onClick={() =>
						handleToggleStratagems("helldiversOne", "helldiversTwo")
					}
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
					onClick={() =>
						handleToggleStratagems("helldiversTwo", "helldiversOne")
					}
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
	changeSettings: PropTypes.func.isRequired,
	refreshStratagems: PropTypes.func.isRequired,
	playAudio: PropTypes.func.isRequired,
	setModalActive: PropTypes.func.isRequired,
};

export default Header;
