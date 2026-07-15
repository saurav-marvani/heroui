"use client";

import {Copy} from "@gravity-ui/icons";
import {Button, InputGroup, Label, TextField} from "@kinetic/react";

export function WithCopySuffix() {
  return (
    <TextField className="w-full max-w-[280px]" defaultValue="kinetic-ui.com" name="website">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Input className="w-full max-w-[280px]" />
        <InputGroup.Suffix className="pr-0">
          <Button isIconOnly aria-label="Copy" size="sm" variant="ghost">
            <Copy className="size-4" />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
