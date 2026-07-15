import {ColorArea} from "@kinetic/react";

export function ColorAreaDisabled() {
  return (
    <ColorArea isDisabled defaultValue="hsl(200, 100%, 50%)">
      <ColorArea.Thumb />
    </ColorArea>
  );
}
