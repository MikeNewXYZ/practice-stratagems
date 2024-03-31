import { Icon } from "@iconify/react";

function Header() {
	return (
		<header className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
			<h1 className="flex gap-2 text-center text-xl sm:text-2xl">
				<span className="font-black">12</span>
				<span>STRATAGEMS PER MINUTE</span>
			</h1>

			<div className="flex gap-2 rounded-md bg-stone-800 px-2">
				<button className="p-2 transition-all duration-500 hover:bg-stone-900">
					<Icon icon="fa:play" />
				</button>
				<button className="p-2 transition-all duration-500 hover:bg-stone-900">
					<Icon icon="fa:pause" />
				</button>
				<button className="p-2 transition-all duration-500 hover:bg-stone-900">
					<Icon icon="fa:refresh" />
				</button>
				<button className="p-2 transition-all duration-500 hover:bg-stone-900">
					<Icon icon="fa:cog" />
				</button>
			</div>
		</header>
	);
}

export default Header;
