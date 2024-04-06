import { Button } from "@/shared/ui/button";
import { ButtonProps } from "./types";

const CustomButton = (props: ButtonProps): JSX.Element => {
  return <Button className="" {...props} />;
};

export default CustomButton;
