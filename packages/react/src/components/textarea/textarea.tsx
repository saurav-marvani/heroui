"use client";

import type {TextAreaVariants} from "@kinetic/styles";
import type {ComponentPropsWithRef} from "react";

import {textAreaVariants} from "@kinetic/styles";
import React, {use} from "react";
import {TextArea as TextAreaPrimitive} from "react-aria-components/TextArea";

import {composeTwRenderProps} from "../../utils";
import {TextFieldContext} from "../textfield";

/* -------------------------------------------------------------------------------------------------
 * TextArea Root
 * -----------------------------------------------------------------------------------------------*/
interface TextAreaRootProps
  extends ComponentPropsWithRef<typeof TextAreaPrimitive>, TextAreaVariants {}

const TextAreaRoot = ({className, fullWidth, variant, ...rest}: TextAreaRootProps) => {
  const textFieldContext = use(TextFieldContext);
  const resolvedVariant = variant ?? textFieldContext?.variant;

  return (
    <TextAreaPrimitive
      data-slot="textarea"
      className={composeTwRenderProps(
        className,
        textAreaVariants({fullWidth, variant: resolvedVariant}),
      )}
      {...rest}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {TextAreaRoot};

export type {TextAreaRootProps};
