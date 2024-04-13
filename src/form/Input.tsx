import { InputCheckbox } from "./InputCheckbox";
import { InputCustom } from "./InputCustom";
import { CheckboxProps, InputProps } from "./types";

function Input(props: CheckboxProps | InputProps): JSX.Element {
  if ("type" in props && props.type === "checkbox") {
    const { checked, onCheckedChange, ...rest } = props as CheckboxProps;

    return (
      <InputCheckbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        {...rest}
      />
    );
  } else {
    const { onUncontrolledChange, ...restProps } = props as InputProps;
    return (
      <InputCustom {...restProps} onUncontrolledChange={onUncontrolledChange} />
    );
  }
}

export default Input;
