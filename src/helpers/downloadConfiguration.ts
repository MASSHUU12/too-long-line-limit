import * as vscode from "vscode";
import { exConfig } from "./exConfig";

/**
 * Change VS Code settings, based on extension settings
 *
 * @returns {*} void
 */
export const downloadConfiguration = (): void => {
  const editorConf = vscode.workspace.getConfiguration("editor");
  const editorRulers = editorConf.get("rulers") as Array<number>;

  // Check if rulers should be enabled
  if (exConfig.rulersEnabled()) {
    // Check if limits have changed
    if (
      editorRulers[0] !== exConfig.limit("soft") ||
      editorRulers[1] !== exConfig.limit("hard")
    ) {
      // Update rulers based on new settings
      editorConf.update(
        "rulers",
        [exConfig.limit("soft"), exConfig.limit("hard")],
        true
      );
    }
  } else if (editorConf.get("rulers") !== "[]") {
    // Remove rulers
    editorConf.update("rulers", [], true);
  }
};
