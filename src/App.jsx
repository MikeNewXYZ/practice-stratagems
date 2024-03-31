import { useEffect, useState } from "react";
import { tinykeys } from "tinykeys";
import stratagemConfig from "./config/stratagems.json";
import Header from "./components/Header";
import GameArea from "./components/GameArea";

const controlMap = {
	up: "Control+ArrowUp",
	down: "Control+ArrowDown",
	left: "Control+ArrowLeft",
	right: "Control+ArrowRight",
};

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
	const [inputCodeIndex, setInputCodeIndex] = useState(0);
	const [stratagems, setStratagems] = useState(
		[...Array(10)].map(() =>
			randomStratagem([
				...stratagemConfig.helldiversOne,
				...stratagemConfig.helldiversTwo,
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
		}
	};

	useEffect(() => {
		const unsubscribe = tinykeys(window, {
			[controlMap.up]: () => cycleStratagems("UP"),
			[controlMap.down]: () => cycleStratagems("DOWN"),
			[controlMap.left]: () => cycleStratagems("LEFT"),
			[controlMap.right]: () => cycleStratagems("RIGHT"),
		});

		return () => {
			unsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputCodeIndex, stratagems]);

	return (
		<div className="container mx-auto flex h-full w-full flex-col items-center gap-4 overflow-hidden py-6 sm:gap-12">
			<Header />
			<GameArea stratagems={stratagems} />
		</div>
	);
}

export default App;
