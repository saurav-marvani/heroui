"use client";

import {DateField, Label} from "@kinetic/react";

export function Basic() {
  return (
    <DateField className="w-[256px]" name="date">
      <Label>日期</Label>
      <DateField.Group>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      </DateField.Group>
    </DateField>
  );
}
