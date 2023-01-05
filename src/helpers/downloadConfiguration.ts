import { workspace } from "vscode";
import { config } from "./config";

/**
 * Change VS Code settings, based on extension settings
 *
 * @returns {*} void
 */
export const downloadConfiguration = (): void => {
  const editorConf = workspace.getConfiguration("editor");
  const editorRulers = editorConf.get("rulers") as Array<number>;

  // Check if rulers should be enabled
  if (config.rulersEnabled()) {
    // Check if limits have changed
    if (
      editorRulers[0] !== config.limit("soft") ||
      editorRulers[1] !== config.limit("hard")
    ) {
      // Update rulers based on new settings
      editorConf.update(
        "rulers",
        [config.limit("soft"), config.limit("hard")],
        true
      );
    }
  } else if (editorConf.get("rulers") !== "[]") {
    // Remove rulers
    editorConf.update("rulers", [], true);
  }
};
