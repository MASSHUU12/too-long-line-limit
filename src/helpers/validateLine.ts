import * as vscode from "vscode";
import { errLongLine, warningLongLine } from "../constants/messages";
import { exConfig } from "./exConfig";

/**
 * Checks the length of the specified line,
 * if it exceeds the set standards it returns Diagnostic
 *
 * @param {vscode.TextLine} line
 * @return {*}  {(vscode.Diagnostic | undefined)}
 */
export const validateLine = (
  line: vscode.TextLine
): vscode.Diagnostic | undefined => {
  const len = line.text.length;
  let severity = -1;

  // If the line length is within an acceptable range, return
  if (len < exConfig.limit("soft")) {
    return undefined;
  }

  if (len > exConfig.limit("soft") && len <= exConfig.limit("hard")) {
    // Soft limit
    severity = exConfig.severity("soft");
  } else if (len > exConfig.limit("hard")) {
    // Hard limit
    severity = exConfig.severity("hard");
  } else {
    // If something goes wrong, return
    return undefined;
  }

  // Create Diagnostic
  return new vscode.Diagnostic(
    line.range,
    severity === 0 ? errLongLine : warningLongLine,
    severity
  );
};
