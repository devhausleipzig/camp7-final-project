import React, { useState } from "react";

const ImageUpload = () => {
	const [selectedImages, setSelectedImages] = useState([]);

	const onSelectFile = (event: any) => {
		const selectedFiles = event.target.files;
		const selectedFilesArray = Array.from(selectedFiles);

		const imagesArray: string[] = selectedFilesArray.map((file: any) => {
			return URL.createObjectURL(file);
		});

		setSelectedImages((previousImages) => previousImages.concat(imagesArray));
	};

	function deleteHandler(image: any) {
		setSelectedImages(selectedImages.filter((e) => e !== image));
		URL.revokeObjectURL(image);
	}

	return (
		<section>
			<label>
				Add up to 3 images to your profile.
				<br />
				<input
					type="file"
					name="images"
					onChange={onSelectFile}
					multiple
					accept="image/png , image/jpeg, image/webp"
					className="w-8/12 h-10 rounded-lg text-white text-lg mb-4 bg-purple-400"
				/>
			</label>
			<br />

			{/* <input
				type="file"
				multiple
				className="w-8/12 h-10 rounded-lg text-white text-lg mb-4 bg-purple-400"
			/> */}

			{selectedImages.length > 0 &&
				(selectedImages.length > 3 ? (
					<p className="error bg-purple-600 text-xl text-white w-screen py-4 mb-4">
						You can't upload more than <b>3</b> images! <br />
						{/* <span>
							please delete <b> {selectedImages.length - 3} </b> of them{" "}
						</span> */}
					</p>
				) : (
					<button
						className="w-8/12 h-10 rounded-lg text-white text-lg mb-4 bg-purple-600"
						onClick={() => {
							console.log(selectedImages);
						}}
					>
						UPLOAD {selectedImages.length} IMAGE
						{selectedImages.length === 1 ? "" : "S"}
					</button>
				))}

			<div className="images">
				{selectedImages &&
					selectedImages.map((image, index) => {
						return (
							<div
								key={image}
								className="image border-4 border-purple-600 m-4 rounded-lg"
							>
								<img
									src={image}
									height="10"
									alt="upload"
									onClick={() => deleteHandler(image)}
								/>
								<button
									onClick={() => deleteHandler(image)}
									className="text-lg text-white bg-purple-600 bold w-[100%] py-1"
								>
									remove
								</button>
								{/* <p>{index + 1}</p> */}
							</div>
						);
					})}
			</div>
		</section>
	);
};

export default ImageUpload;
