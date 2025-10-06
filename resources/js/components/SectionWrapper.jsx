import React from "react";
import Separator from "./Separator";

export default function SectionWrapper({ children, withSeparator = true }) {
  return (
    <div>
      {children}
      {withSeparator && <Separator />}
    </div>
  );
}
