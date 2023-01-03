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
    const config = vscode.workspace
      .getConfiguration(exName)
      .get("softLimit") as string;

    return parseInt(config ? config : "80");
  },
  /**
   * Hard limit of line length
   *
   * @return {*}  {number}
   */
  hardLimit: (): number => {
    const config = vscode.workspace
      .getConfiguration(exName)
      .get("hardLimit") as string;

    return parseInt(config ? config : "120");
  },
};
