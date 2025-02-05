"use client";

import { Input } from "@/components/ui/input";
import { NumericFormat, NumericFormatProps } from "react-number-format";

export function CurrencyInput({ ...props }: NumericFormatProps) {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      prefix="$ "
      allowNegative={false}
      customInput={Input}
      {...props}
    />
  );
}
