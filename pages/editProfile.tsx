import useProtectedPage from "../hooks/useProtectedPage";
import Button, { ButtonSizes } from "../components/button/button";
import ImageUpload from "../components/imagesUpload/imageUpload";
import ImageCrop from "../components/imagesUpload/imageCrop";
import NameField from "../components/profile/nameField";
import DescriptionField from "../components/profile/descriptionField";
import GenderField from "../components/profile/genderField";
import LanguagesField from "../components/profile/languagesField";

interface Props {
	username: string;
}

export default function Settings(props: Props) {
	// const authContext = useProtectedPage();
	return (
		<div className="w-screen h-screen py-8 text-center bg-[#EEF6EF]">
			{/* <h1>{props.username}</h1> */}
			{/* <h1 className="text-2xl bold mb-4">Placeholder Username</h1> */}
			{/* <svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				className="w-24 h-24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
				/>
			</svg> */}

			<div className="block mb-12 grid gap-8">
				{/* <Button label={"Edit"} link={"/photo"} size={ButtonSizes.default} />
			</div> */}
				<ImageUpload />
				{/* <ImageCrop /> */}
				<NameField />
				<DescriptionField />
				<GenderField />
				<LanguagesField />
				{/* 
				<Button label={"Age"} link={"/age"} size={ButtonSizes.wide} />
				<Button label={"Gender"} link={"/gender"} size={ButtonSizes.wide} />
				<Button
					label={"Languages"}
					link={"/languages"}
					size={ButtonSizes.wide}
				/>
				<Button
					label={"Interests"}
					link={"/interests"}
					size={ButtonSizes.wide}
				/>
				<div className="mt-12">
					<Button
						label={"Save Changes"}
						link={"/save"}
						size={ButtonSizes.wide}
					/>
					<Button label={"Cancel"} link={"/"} size={ButtonSizes.wide} />
		</div> */}
			</div>
		</div>
	);
}
