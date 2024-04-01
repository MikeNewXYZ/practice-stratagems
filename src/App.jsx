import { useEffect, useState } from "react";
import { tinykeys } from "tinykeys";
import { useLocalStorage } from "@uidotdev/usehooks";
import stratagemConfig from "./config/stratagems.json";
import { Toaster, toast } from "react-hot-toast";
import Header from "./components/Header";
import GameArea from "./components/GameArea";
import NotificationToast from "./components/NotificationToast";

const randomStratagem = (stratagems) => {
	const randomIndex = Math.floor(Math.random() * stratagems.length);
	const { name, inputCode } = stratagems[randomIndex];

	return {
		name: name,
		inputCode: inputCode.map((id) => ({
			id: id,
			correct: false,
		})),
	};
};

function App() {
	const [settings, saveSettings] = useLocalStorage("settings", {
		general: {
			radio: false,
			audio: false,
		},
		stratagems: {
			helldiversOne: false,
			helldiversTwo: true,
		},
		controls: {
			up: "KeyW",
			down: "KeyS",
			left: "KeyA",
			right: "KeyD",
			radio: "Control",
		},
	});
	const [inputCodeIndex, setInputCodeIndex] = useState(0);
	const [stratagems, setStratagems] = useState(
		[...Array(10)].map(() =>
			randomStratagem([
				...(settings.stratagems.helldiversOne
					? stratagemConfig.helldiversOne
					: []),
				...(settings.stratagems.helldiversTwo
					? stratagemConfig.helldiversTwo
					: []),
			]),
		),
	);

	const cycleStratagems = (inputCode) => {
		let newStratagems = stratagems;

		// Check if user pressed correct key.
		if (stratagems[0].inputCode[inputCodeIndex].id === inputCode) {
			// Cycle to next stratagem.
			if (inputCodeIndex >= stratagems[0].inputCode.length - 1) {
				newStratagems.shift();
				setInputCodeIndex(0);
				setStratagems([
					...newStratagems,
					randomStratagem([
						...stratagemConfig.helldiversOne,
						...stratagemConfig.helldiversTwo,
					]),
				]);
			} else {
				// Cycle to next input code on current stratagem.
				newStratagems[0].inputCode.splice(inputCodeIndex, 1, {
					id: newStratagems[0].inputCode[inputCodeIndex].id,
					correct: true,
				});
				setInputCodeIndex((prev) => prev + 1);
				setStratagems(newStratagems);
			}
		} else {
			// Reset back to start if user pressed wrong key.
			newStratagems[0].inputCode = newStratagems[0].inputCode.map(({ id }) => ({
				id: id,
				correct: false,
			}));
			setInputCodeIndex(0);
			setStratagems(newStratagems);
			toast.custom(() => (
				<NotificationToast heading="Wrong, try again solider!" />
			));
		}
	};

	const refreshStratagems = () => {
		setStratagems(
			[...Array(10)].map(() =>
				randomStratagem([
					...(settings.stratagems.helldiversOne
						? stratagemConfig.helldiversOne
						: []),
					...(settings.stratagems.helldiversTwo
						? stratagemConfig.helldiversTwo
						: []),
				]),
			),
		);
	};

	useEffect(() => {
		// Map controls based on user settings.
		const { general, controls } = settings;
		const controlMap = {
			up: general.radio ? `${controls.radio}+${controls.up}` : controls.up,

			down: general.radio
				? `${controls.radio}+${controls.down}`
				: controls.down,

			left: general.radio
				? `${controls.radio}+${controls.left}`
				: controls.left,

			right: general.radio
				? `${controls.radio}+${controls.right}`
				: controls.right,
		};

		const unsubscribe = tinykeys(window, {
			[controlMap.up]: (event) => {
				event.preventDefault();
				cycleStratagems("UP");
			},
			[controlMap.down]: (event) => {
				event.preventDefault();
				cycleStratagems("DOWN");
			},
			[controlMap.left]: (event) => {
				event.preventDefault();
				cycleStratagems("LEFT");
			},
			[controlMap.right]: (event) => {
				event.preventDefault();
				cycleStratagems("RIGHT");
			},
		});

		return () => {
			unsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [settings, inputCodeIndex, stratagems]);

	return (
		<>
			<Toaster position="bottom-center" />
			<div className="container mx-auto flex h-full w-full flex-col items-center gap-4 overflow-hidden py-6 sm:gap-12">
				<Header
					settings={settings}
					saveSettings={saveSettings}
					refreshStratagems={refreshStratagems}
				/>
				<GameArea stratagems={stratagems} />
			</div>
		</>
	);
}

export default App;
