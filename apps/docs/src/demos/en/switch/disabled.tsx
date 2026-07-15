import {Switch} from "@kinetic/react";

export function Disabled() {
  return (
    <Switch isDisabled>
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        Enable notifications
      </Switch.Content>
    </Switch>
  );
}
