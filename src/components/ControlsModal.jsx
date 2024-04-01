import { Icon } from "@iconify/react";
import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import NotificationToast from "./NotificationToast";

function ControlsModal({ settings, changeSettings, modalActive, closeModal }) {
	const [waitForInput, setWaitForInput] = useState(false);

	const handleNewControl = (id) => {
		setWaitForInput(true);
		toast.custom(() => <NotificationToast heading="Press key to rebind" />);

		// Change setting when new key is pressed.
		window.addEventListener("keydown", function cb(event) {
			event.preventDefault();
			changeSettings(settings, event.key, `controls.${id}`);
			this.removeEventListener("keydown", cb);
		});

		window.addEventListener("keyup", function cb(event) {
			event.preventDefault();
			setWaitForInput(false);
			this.removeEventListener("keyup", cb);
		});
	};

	const handleClose = () => {
		if (waitForInput) {
			toast.custom(() => (
				<NotificationToast
					heading="A key is not bound"
					subheading="Press key to rebind"
				/>
			));
		} else {
			closeModal();
		}
	};

	return modalActive ? (
		<div className="fixed z-50 flex h-screen w-full items-center justify-center bg-neutral-900 bg-opacity-75 px-2 pb-12 pt-2">
			<div className="relative w-full rounded-md bg-neutral-950 p-4 sm:w-auto">
				<button
					className={`${waitForInput && "opacity-50"} absolute right-2 top-2 text-3xl`}
					onClick={handleClose}
				>
					<Icon icon="ic:baseline-cancel" />
				</button>

				<h1 className="text-4xl font-bold uppercase">Controls</h1>
				<p>{waitForInput ? "Press key to rebind" : "Click to edit controls"}</p>

				<div className="mt-6 flex flex-col gap-4 text-lg">
					{/* RADIO ARROW */}
					<button
						className="flex items-center gap-1 rounded-md bg-neutral-800 p-1 transition-all duration-500 hover:bg-stone-900 sm:w-fit"
						onClick={() => handleNewControl("radio")}
					>
						<Icon className="mb-0.5" icon="ic:baseline-radio" />
						<span>Radio</span>
						<span>-</span>
						<span>({settings.controls.radio})</span>
					</button>

					<div className="grid gap-4 sm:grid-cols-2">
						{/* UP ARROW */}
						<button
							className="flex items-center gap-1 rounded-md bg-neutral-800 p-1 transition-all duration-500 hover:bg-stone-900"
							onClick={() => handleNewControl("up")}
						>
							<Icon icon="fa:arrow-up" />
							<span>UP</span>
							<span>-</span>
							<span>({settings.controls.up})</span>
						</button>

						{/* DOWN ARROW */}
						<button
							className="flex items-center gap-1 rounded-md bg-neutral-800 p-1 transition-all duration-500 hover:bg-stone-900"
							onClick={() => handleNewControl("down")}
						>
							<Icon icon="fa:arrow-down" />
							<span>DOWN</span>
							<span>-</span>
							<span>({settings.controls.down})</span>
						</button>

						{/* LEFT ARROW */}
						<button
							className="flex items-center gap-1 rounded-md bg-neutral-800 p-1 transition-all duration-500 hover:bg-stone-900"
							onClick={() => handleNewControl("left")}
						>
							<Icon icon="fa:arrow-left" />
							<span>LEFT</span>
							<span>-</span>
							<span>({settings.controls.left})</span>
						</button>

						{/* RIGHT ARROW */}
						<button
							className="flex items-center gap-1 rounded-md bg-neutral-800 p-1 transition-all duration-500 hover:bg-stone-900"
							onClick={() => handleNewControl("right")}
						>
							<Icon icon="fa:arrow-right" />
							<span>RIGHT</span>
							<span>-</span>
							<span>({settings.controls.right})</span>
						</button>
					</div>
				</div>

				<p className="pt-5 text-sm italic">
					Radio button has to be a modifier key
				</p>
			</div>
		</div>
	) : null;
}

ControlsModal.propTypes = {
	settings: PropTypes.object.isRequired,
	changeSettings: PropTypes.func.isRequired,
	modalActive: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired,
};

export default ControlsModal;
