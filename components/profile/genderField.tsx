export default function GenderField() {
	return (
		<div className="items-center w-11/12 flex flex-col pl-8">
			<label
				for="gender"
				className="block mb-2 text-xl font-quicksand font-bold text-purple text-left pb-4"
			>
				What's your Gender?
			</label>
			<form className="w-52">
				<fieldset className="font-quicksand">
					<div className="grid gap-6">
						<label
							for="gender-noanswer"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left">
								no answer
							</span>

							<input
								type="radio"
								name="gender"
								id="gender-noanswer"
								value="noanswer"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 border-2 bg-purple rounded-lg text-white"
							>
								<span className="absolute top-3.5 left-4">no answer</span>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-lightpurple">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="h-5 w-5 text-white"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
								</span>
							</span>
						</label>
						<label
							for="gender-diverse"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left">
								diverse
							</span>

							<input
								type="radio"
								name="gender"
								id="gender-diverse"
								value="diverse"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 border-2 bg-purple rounded-lg text-white"
							>
								<span className="absolute top-3.5 left-4">diverse</span>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-lightpurple">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="h-5 w-5 text-white"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
								</span>
							</span>
						</label>
						<label
							for="gender-woman"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left">woman</span>

							<input
								type="radio"
								name="gender"
								id="gender-woman"
								value="woman"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 bg-purple rounded-lg text-white"
							>
								<span className="absolute top-3.5 left-4">woman</span>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-lightpurple">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="h-5 w-5 text-white"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
								</span>
							</span>
						</label>
						<label
							for="gender-man"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left">man</span>
							<input
								type="radio"
								name="gender"
								id="gender-man"
								value="man"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 border-2 bg-purple rounded-lg text-white"
							>
								<span className="absolute top-3.5 left-4">man</span>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-lightpurple">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="h-5 w-5 text-white"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
								</span>
							</span>
						</label>
					</div>
				</fieldset>
			</form>
		</div>
	);
}
