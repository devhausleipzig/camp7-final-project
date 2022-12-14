import React, { useState, useRef } from "react";

import ReactCrop, {
	centerCrop,
	makeAspectCrop,
	Crop,
	PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
	mediaWidth: number,
	mediaHeight: number,
	aspect: number
) {
	return centerCrop(
		makeAspectCrop(
			{
				unit: "%",
				width: 90,
			},
			aspect,
			mediaWidth,
			mediaHeight
		),
		mediaWidth,
		mediaHeight
	);
}

export default function ImageCrop() {
	const [imgSrc, setImgSrc] = useState("");
	const previewCanvasRef = useRef<HTMLCanvasElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const [crop, setCrop] = useState<Crop>();
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
	const [scale, setScale] = useState(1);
	const [rotate, setRotate] = useState(0);
	const [aspect, setAspect] = useState<number | undefined>(1);

	function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files.length > 0) {
			setCrop(undefined); // Makes crop preview update between images.
			const reader = new FileReader();
			reader.addEventListener("load", () =>
				setImgSrc(reader.result?.toString() || "")
			);
			reader.readAsDataURL(e.target.files[0]);
		}
	}

	function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
		if (aspect) {
			const { width, height } = e.currentTarget;
			setCrop(centerAspectCrop(width, height, aspect));
		}
	}

	useDebounceEffect(
		async () => {
			if (
				completedCrop?.width &&
				completedCrop?.height &&
				imgRef.current &&
				previewCanvasRef.current
			) {
				// We use canvasPreview as it's much faster than imgPreview.
				canvasPreview(
					imgRef.current,
					previewCanvasRef.current,
					completedCrop,
					scale,
					rotate
				);
			}
		},
		100,
		[completedCrop, scale, rotate]
	);

	function handleToggleAspectClick() {
		if (aspect) {
			setAspect(undefined);
		} else if (imgRef.current) {
			const { width, height } = imgRef.current;
			setAspect(1);
			setCrop(centerAspectCrop(width, height, 1));
		}
	}

	return (
		<div className="ImageCrop bg-[#EEF6EF]">
			<div className="Crop-Controls">
				<label className="flex justify-center">
					{!imgSrc ? (
						<div className="w-[150px] h-[150px] text-white text-lg bg-[url('https://firebasestorage.googleapis.com/v0/b/camp7-18400.appspot.com/o/system%2Favatar_big.png?alt=media&token=4c7cadf8-46ac-4601-8145-c20a4bc48954')] bg-no-repeat">
							<span className="my-9 mr-2 flex items-center">
								Click here to upload your picture
							</span>
							<input
								type="file"
								name="images"
								onChange={onSelectFile}
								accept="image/png , image/jpeg, image/webp"
								className="hidden"
							/>
						</div>
					) : (
						<div>
							<label htmlFor="file-input">
								<div className="h-[150px] w-[150px] rounded-full">
									<img
										src={URL.createObjectURL(imgSrc)}
										height="10"
										alt="upload"
										className="h-[150px] w-[150px] rounded-full object-cover"
									/>
								</div>
							</label>
							<input
								id="file-input"
								type="file"
								name="images"
								onChange={onSelectFile}
								accept="image/png , image/jpeg, image/webp"
								className="hidden"
							/>
						</div>
					)}
				</label>
				<br />
				<div className="flex justify-around">
					<button
						className="w-32 h-10 rounded-lg bg-white text-lg mb-4 text-[#603BAD]"
						onClick={deleteHandler}
						disabled={!file}
					>
						<div className="flex items-center justify-around mx-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="w-6 h-6 fill-[#603BAD] text-white"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
								/>
							</svg>
							DELETE
						</div>
					</button>
					<button
						className="w-32 h-10 rounded-lg bg-white text-lg mb-4 text-[#603BAD]"
						onClick={uploadHandler}
					>
						<div className="flex items-center justify-around mx-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
								/>
							</svg>
							UPLOAD
						</div>
					</button>
				</div>

				{/* <input type="file" accept="image/*" onChange={onSelectFile} /> */}
				{/* <div>
					<label htmlFor="scale-input">Scale: </label>
					<input
						id="scale-input"
						type="number"
						step="0.1"
						value={scale}
						disabled={!imgSrc}
						onChange={(e) => setScale(Number(e.target.value))}
					/>
				</div>
				<div>
					<label htmlFor="rotate-input">Rotate: </label>
					<input
						id="rotate-input"
						type="number"
						value={rotate}
						disabled={!imgSrc}
						onChange={(e) =>
							setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
						}
					/>
				</div> */}
				{/* <div>
					<button onClick={handleToggleAspectClick}>
						Toggle aspect {aspect ? "off" : "on"}
					</button>
				</div> */}
			</div>
			{!!imgSrc && (
				<ReactCrop
					crop={crop}
					onChange={(_, percentCrop) => setCrop(percentCrop)}
					onComplete={(c) => setCompletedCrop(c)}
					aspect={aspect}
				>
					<img
						ref={imgRef}
						alt="Crop me"
						src={imgSrc}
						style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
						onLoad={onImageLoad}
					/>
				</ReactCrop>
			)}
			{/* <div>
				{!!completedCrop && (
					<canvas
						ref={previewCanvasRef}
						style={{
							border: "1px solid black",
							objectFit: "contain",
							width: completedCrop.width,
							height: completedCrop.height,
						}}
					/>
				)}
			</div> */}
		</div>
	);
}
