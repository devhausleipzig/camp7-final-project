export default function LanguagesField() {
	return (
		<div className="items-center w-11/12 flex flex-col pl-8">
			<label
				for="languages"
				className="block mb-2 text-xl font-quicksand font-bold text-purple text-left pb-4"
			>
				Languages I know
			</label>
			<form className="w-80">
				<fieldset className="font-quicksand">
					<div className="grid gap-6 grid-cols-2">
						<label
							for="language-english"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left outline-purple">
								English
							</span>

							<input
								type="checkbox"
								name="languages"
								id="language-english"
								value="english"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 border border-purple rounded-lg text-white"
							>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-purple">
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
							for="language-spanish"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left">
								Spanish
							</span>

							<input
								type="checkbox"
								name="languages"
								id="language-spanish"
								value="spanish"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 border-purple border rounded-lg"
							>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-purple">
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
							for="language-german"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left">
								German
							</span>

							<input
								type="checkbox"
								name="languages"
								id="language-german"
								value="german"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 border-purple border rounded-lg"
							>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-purple">
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
							for="language-italian"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left">
								Italian
							</span>

							<input
								type="checkbox"
								name="languages"
								id="language-italian"
								value="italian"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 border-purple border rounded-lg"
							>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-purple">
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
							for="language-french"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left">
								French
							</span>

							<input
								type="checkbox"
								name="languages"
								id="language-french"
								value="french"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 border-purple border rounded-lg"
							>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-purple">
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
							for="language-dutch"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left">Dutch</span>

							<input
								type="checkbox"
								name="languages"
								id="language-dutch"
								value="dutch"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 border-purple border rounded-lg"
							>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-purple">
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
							for="language-russian"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left">
								Russian
							</span>

							<input
								type="checkbox"
								name="languages"
								id="language-russian"
								value="russian"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 border-purple border rounded-lg"
							>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-purple">
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
							for="language-danish"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left">
								Danish
							</span>

							<input
								type="checkbox"
								name="languages"
								id="language-danish"
								value="danish"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 border-purple border rounded-lg"
							>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-purple">
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
							for="language-turkish"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left">
								Turkish
							</span>

							<input
								type="checkbox"
								name="languages"
								id="language-turkish"
								value="turkish"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 border-purple border rounded-lg"
							>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-purple">
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
							for="language-hindi"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left">Hindi</span>

							<input
								type="checkbox"
								name="languages"
								id="language-hindi"
								value="hindi"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 border-purple border rounded-lg"
							>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-purple">
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
							for="language-polish"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left">
								Polish
							</span>

							<input
								type="checkbox"
								name="languages"
								id="language-polish"
								value="polish"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 border-purple border rounded-lg"
							>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-purple">
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
							for="language-arabic"
							className="relative flex flex-col bg-white p-4 rounded-lg"
						>
							<span className="font-semibold text-purple text-left">
								Arabic
							</span>

							<input
								type="checkbox"
								name="languages"
								id="language-arabic"
								value="arabic"
								className="absolute h-0 w-0 appearance-none"
							/>
							<span
								aria-hidden="true"
								className="hidden absolute inset-0 border-purple border rounded-lg"
							>
								<span className="absolute top-3.5 right-4 h-6 w-6 inline-flex items-center justify-center rounded-full bg-purple">
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
