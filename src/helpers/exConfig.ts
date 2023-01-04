import * as vscode from "vscode";
import { exName } from "../constants/constants";

/**
 * Soft limit of line length
 *
 * @return {*}  {number}
 */
const softLimit = (): number => {
  const config = vscode.workspace.getConfiguration(exName).get("softLimit");

  return parseInt(config === undefined ? "80" : (config as string));
};

/**
 * Hard limit of line length
 *
 * @return {*}  {number}
 */
const hardLimit = (): number => {
  const config = vscode.workspace.getConfiguration(exName).get("hardLimit");

  return parseInt(config === undefined ? "120" : (config as string));
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
  softLimit: softLimit,
  hardLimit: hardLimit,
  rulersEnabled: rulersEnabled,
  disabledIn: disabledIn,
};
