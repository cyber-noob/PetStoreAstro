import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function ResponsiveDatePicker() {
  const [value, setValue] = React.useState(dayjs("2024-02-16"));
  console.log("date -> ", value);
  const isDisabled = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        label="Controlled picker"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        disablePast
        shouldDisableDate={isDisabled}
      />
    </LocalizationProvider>
  );
}
