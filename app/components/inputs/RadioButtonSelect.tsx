import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FormHelperText } from "@mui/material";

interface RadioButtonSelectProps {
  id: string;
  label: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  options: Array<any>;
}

const RadioButtonSelect: React.FC<RadioButtonSelectProps> = ({
  errors,
  id,
  label,
  options,
  register,
  required,
}) => {
  return (
    <FormControl>
      <FormLabel
        sx={{
          "&.MuiFormLabel-root": {
            fontSize: "14px",
            color: "rgb(64 64 70/1)",
            fontWeight: 400,
            fontFamily: "Inter, sans-serif",
            "&.Mui-focused": {
              color: "rgb(64 64 64 /1)",
              fontFamily: "Inter, sans-serif",
            },
          },
        }}
        className="text-neutral-700 text-sm font-light"
      >
        {label}
      </FormLabel>
      <RadioGroup row name="row-radio-buttons-group">
        {options.map((option) => (
          <FormControlLabel
            {...register(id, { required })}
            value={option.value}
            control={
              <Radio
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 18,
                  },
                }}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{errors[id] && "This field is required"}</FormHelperText>
    </FormControl>
  );
};

export default RadioButtonSelect;
