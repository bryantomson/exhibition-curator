"use client";

import React, { useState } from "react";

import { HslColorPicker, HslColor } from "react-colorful";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const ColourPicker = () => {
  const myHslValue: HslColor = { h: 0, s: 0, l: 0 };
  const [color, setColor] = useState(myHslValue);
  console.log(color);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleColourPick = (colour: HslColor) => {
    const { h, s, l } = colour;

    const params = new URLSearchParams(searchParams);

    if (colour) {
      params.set("hue", h.toString());
      params.set("saturation", s.toString());
      params.set("lightness", l.toString());
    } else {
      removeColour()
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const removeColour = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("hue");
    params.delete("saturation");
    params.delete("lightness");

    replace(`${pathname}?${params.toString()}`);

  };

  return (
    <>
      <HslColorPicker color={color} onChange={handleColourPick} />

      <div onClick={removeColour} className="btn">Remove</div>
    </>
  );
};

export default ColourPicker;
