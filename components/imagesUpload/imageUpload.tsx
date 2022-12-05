import { route } from "nextjs-routes";
import test from "node:test";
import React, { useState, useEffect } from "react";
import { methods } from "../../utils/methods";
import storage from "../../firebaseConfig";
import {
	ref,
	uploadBytesResumable,
	UploadTaskSnapshot,
	getDownloadURL,
} from "firebase/storage";
import { url } from "node:inspector";

const ImageUpload = () => {
	const [selectedImages, setSelectedImages] = useState<string[]>([]);
	const [file, setFile] = useState<File | null>(null);
	const [imageURL, setImageURL] = useState<string | null>(null);
	useEffect(() => {
		if (imageURL) {
			fetch("http://localhost:3000/api/user/images", {
				method: "POST",
				body: JSON.stringify({ imageURL }),
			});
		}
	}, [imageURL]);

	const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = event.target.files!;
		const selectedFilesArray = Array.from(selectedFiles);
		setFile(event.target.files![0]);
		const imagesArray: string[] = selectedFilesArray.map((file: File) => {
			return URL.createObjectURL(file);
		});

		setSelectedImages((previousImages) => [...previousImages, ...imagesArray]);
	};

	function deleteHandler(image: string) {
		setSelectedImages(selectedImages.filter((e) => e !== image));
		URL.revokeObjectURL(image);
	}

	async function uploadHandler() {
		if (!file) {
			alert("No file selected");
			return;
		}
		const storageRef = ref(storage, `/userImages/${file.name}`);

		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				console.log(progress);
			},
			(error) => console.log(error),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					console.log(url);
					setSelectedImages([]);
					setImageURL(url);
				});
			}
		);

		// console.log("starting upload");
		// // load image from disk
		// const image = "???";
		// // convert format
		// const formData = new FormData();
		// formData.append("uploaded-image", image, image.name);
		// const uploadResponse = await fetch(
		// 	route({ pathname: "/api/user/images" }),
		// 	{
		// 		method: methods.post,
		// 		body: JSON.stringify({ data: image }),
		// 	}
		// );
		// if (!uploadResponse.ok) {
		// 	// oh no!!
		// }
	}

	return (
		<section>
			<label>
				<span>Add a picture to your profile. </span>
				<br />
				<input
					type="file"
					name="images"
					onChange={onSelectFile}
					// multiple
					accept="image/png , image/jpeg, image/webp"
					className="w-8/12 h-10 rounded-lg text-white text-lg mb-4 bg-purple-400"
				/>
			</label>
			<br />

			{selectedImages.length > 0 &&
				(selectedImages.length > 1 ? (
					<p className="error bg-purple-600 text-xl text-white w-screen py-4 mb-4">
						You can only upload <b>1</b> image! <br />
						{/* <span>
							please delete <b> {selectedImages.length - 3} </b> of them{" "}
						</span> */}
					</p>
				) : (
					<button
						className="w-8/12 h-10 rounded-lg text-white text-lg mb-4 bg-purple-600"
						onClick={uploadHandler}
					>
						UPLOAD IMAGE
						{/* UPLOAD {selectedImages.length} IMAGE
						{selectedImages.length === 1 ? "" : "S"} */}
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
