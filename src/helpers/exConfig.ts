import * as vscode from "vscode";
import { exName } from "../constants/constants";

/**
 * Get soft or hard limit
 *
 * @param {("soft" | "hard")} whichLimit
 * @return {*}  {number}
 */
const limit = (whichLimit: "soft" | "hard"): number => {
  const config = vscode.workspace
    .getConfiguration(exName)
    .get(whichLimit + "Limit");

  if (!config) {
    return whichLimit === "soft" ? 80 : 120;
  }

  return parseInt(config as string);
};

/**
 * Whether rulers should be included
 *
 * @returns {*} {boolean}
 */
const rulersEnabled = (): boolean => {
  return vscode.workspace
    .getConfiguration(exName)
    .get("rulersEnabled") as boolean;
};

/**
 * In which languages the check is to be disabled
 *
 * @return {*}  {string[]}
 */
const disabledIn = (): string[] => {
  const config = vscode.workspace.getConfiguration(exName).get("disabledIn");

  if (config) {
    return config as Array<string>;
  }
  return [];
};

/**
 * Access to extension configuration
 */
export const exConfig = {
  limit: limit,
  rulersEnabled: rulersEnabled,
  disabledIn: disabledIn,
};
