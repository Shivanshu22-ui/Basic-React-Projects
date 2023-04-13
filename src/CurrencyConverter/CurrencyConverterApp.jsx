import React, { useEffect } from "react";
import CurrencyInput from "./CurrencyInput";

const BASE_URL = "https://api.exchangeratesapi.io/v1/latest?access_key=R2Ad5M3YOu0TqNC90P3ooKzYzCSbSKHD";

export default function CurrencyConverterApp() {
  useEffect(() => {
    fetch(BASE_URL)
    .then(res=>res.json())
    .then(data=>console.log(data))

  }, []);
  return (
    <div>
      <h2>Converter</h2>
      <CurrencyInput />
      <div className="equal">=</div>
      <CurrencyInput />
    </div>
  );
}
