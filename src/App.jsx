import { useEffect, useState } from "react";
import { tinykeys } from "tinykeys";
import Header from "./components/Header";
import GameArea from "./components/GameArea";

const controlMap = {
	up: "Control+ArrowUp",
	down: "Control+ArrowDown",
	left: "Control+ArrowLeft",
	right: "Control+ArrowRight",
};

function App() {
	const [inputCode, setInputCode] = useState("");

	useEffect(() => {
		const unsubscribe = tinykeys(window, {
			[controlMap.up]: () => setInputCode("UP"),
			[controlMap.down]: () => setInputCode("DOWN"),
			[controlMap.left]: () => setInputCode("LEFT"),
			[controlMap.right]: () => setInputCode("RIGHT"),
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<div className="container mx-auto flex h-full w-full flex-col items-center gap-4 overflow-hidden py-6 sm:gap-12">
			<Header />
			<GameArea inputCode={inputCode} />
		</div>
	);
}

export default App;
