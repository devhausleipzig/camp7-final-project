import ImageUpload from "../components/imagesUpload/imageUpload";
import DateField from "../components/profile/dateField";
import DescriptionField from "../components/profile/descriptionField";
import GenderField from "../components/profile/genderField";
import LanguagesField from "../components/profile/languagesField";
import NameField from "../components/profile/nameField";

export default function Settings() {
  return (
    <div className="w-screen h-screen py-8 text-center bg-[#EEF6EF]">
      <div className="mb-12 grid gap-8">
        <ImageUpload />
        <NameField />
        <DescriptionField />
        <GenderField />
        <LanguagesField />
        <DateField />
      </div>
    </div>
  );
}
