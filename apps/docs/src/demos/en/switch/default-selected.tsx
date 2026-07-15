import {Switch} from "@kinetic/react";

export function DefaultSelected() {
  return (
    <Switch defaultSelected>
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        Enable notifications
      </Switch.Content>
    </Switch>
  );
}
