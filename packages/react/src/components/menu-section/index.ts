import type {ComponentProps} from "react";

import {MenuSectionRoot} from "./menu-section";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const MenuSection = MenuSectionRoot;

export type MenuSection = {
  Props: ComponentProps<typeof MenuSectionRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {MenuSectionRoot};

export type {MenuSectionRootProps, MenuSectionRootProps as MenuSectionProps} from "./menu-section";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {menuSectionVariants} from "@kinetic/styles";

export type {MenuSectionVariants} from "@kinetic/styles";
