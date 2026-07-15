"use client";

import {Button} from "@kinetic/react";

export function CustomRenderFunction() {
  return (
    <Button
      render={(props, {isPressed}) => (
        <button {...props} data-custom={isPressed ? "pressed" : "bar"} />
      )}
    >
      点按
    </Button>
  );
}
