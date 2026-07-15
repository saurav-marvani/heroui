"use client";

import {Link} from "@kinetic/react";

export function CustomRenderFunction() {
  return (
    <Link href="#" render={(props) => <span {...props} data-custom="foo" />}>
      立即行动
      <Link.Icon />
    </Link>
  );
}
