import * as vscode from "vscode";
import { exConfig } from "./exConfig";

/**
 * Change VS Code settings, based on extension settings
 *
 * @returns {*} void
 */
export const downloadConfiguration = (): void => {
  const editorConf = vscode.workspace.getConfiguration("editor");

  // Check if limits have changed
  if (
    editorConf.get("rulers") !==
    `[${exConfig.softLimit()}, ${exConfig.hardLimit()}]`
  ) {
    // Update rulers based on new settings
    editorConf.update(
      "rulers",
      [exConfig.softLimit(), exConfig.hardLimit()],
      true
    );
  }
};
