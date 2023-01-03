import * as vscode from "vscode";
import { exName } from "../constants/constants";

/**
 * Access to extension configuration
 */
export const exConfig = {
  /**
   * Soft limit of line length
   *
   * @return {*}  {number}
   */
  softLimit: (): number => {
    const config = vscode.workspace.getConfiguration(exName).get("softLimit");

    return parseInt(config === undefined ? "80" : (config as string));
  },
  /**
   * Hard limit of line length
   *
   * @return {*}  {number}
   */
  hardLimit: (): number => {
    const config = vscode.workspace.getConfiguration(exName).get("hardLimit");

    return parseInt(config === undefined ? "120" : (config as string));
  },
  /**
   * Whether rulers should be included
   *
   * @returns {*} {boolean}
   */
  rulersEnabled: (): boolean => {
    return vscode.workspace
      .getConfiguration(exName)
      .get("rulersEnabled") as boolean;
  },
};
