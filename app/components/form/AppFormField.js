import { useFormikContext } from "formik";
import React from "react";

import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";

export default function AppFormField({
  textAlign,
  textSize,
  name,
  bg,
  color,
  ...otherProps
}) {
  const { handleChange, setFieldTouched, errors, touched } =
    useFormikContext();

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        textAlign={textAlign}
        bg={bg}
        color={color}
        textSize={textSize}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
