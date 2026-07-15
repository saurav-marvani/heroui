"use client";

import {InputGroup, Label, TextField} from "@kinetic/react";

export function WithTextPrefix() {
  return (
    <TextField className="w-full max-w-[280px]" defaultValue="kinetic-ui.com" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Prefix>https://</InputGroup.Prefix>
        <InputGroup.Input className="w-full max-w-[280px]" />
      </InputGroup>
    </TextField>
  );
}
