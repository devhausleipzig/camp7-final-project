import Button, { ButtonSizes } from "../components/button/button";

interface Props {
  username: string;
}

export default function Settings(props: Props) {
  return (
    // <div className="w-screen grid grid-cols-3 gap-x-8 gap-y-4 mx-4 text-center sans text-2xl">
    // 	<h1 className="col-span-3">Profile Pictures</h1>
    // 	<div className="col-span-3"></div>
    // 	<h1 className="text-right col-span-1">Birthday</h1>
    // 	<div className="col-span-2 text-sm">Birthday Placeholder</div>
    // 	<h1 className="col-span-3">Age Range of Friends</h1>
    // 	<div className="col-span-3 text-sm">Slider Placeholder</div>
    // 	<h1 className="text-right col-span-1">Languages</h1>
    // 	<div className="col-span-2"></div>
    // 	<h1>Interests</h1>
    // 	<div className="col-span-2"></div>
    // </div>
    <div className="w-screen mt-8 text-center">
      {/* <h1>{props.username}</h1> */}
      <h1 className="text-2xl bold mb-4">Placeholder Username</h1>
      <Button
        label={"Change Password"}
        link={"/password"}
        size={ButtonSizes.wide}
      />
      <Button label={"Edit Profile"} link={"/edit"} size={ButtonSizes.wide} />
      <Button
        label={"Push Notifications"}
        link={"/notifications"}
        size={ButtonSizes.wide}
      />
      <hr className="mt-4 mb-8 border-black ml-4 w-11/12" />
      <Button label={"About Us"} link={"/about"} size={ButtonSizes.wide} />
      <Button label={"Support"} link={"/support"} size={ButtonSizes.wide} />
      <Button
        label={"Privacy Policy"}
        link={"/privacy"}
        size={ButtonSizes.wide}
      />
    </div>
  );
}
