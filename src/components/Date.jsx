import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { get_date } from '../lib/misc.js';

export function ResponsiveDatePicker({ date }) {
  const [value, setValue] = React.useState(dayjs(date));
  // console.log("date -> ", value);
  const isDisabled = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        label="Controlled picker"
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
           
          const arr = window.location.href.split("=");
          arr[arr.length - 1] = get_date(newValue);
          
          window.location.href = arr.join("=");
        }
        }
        disablePast
        shouldDisableDate={isDisabled}
      />
    </LocalizationProvider>
  );
}