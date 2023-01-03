import * as vscode from "vscode";
import { errLongLine, warningLongLine } from "../constants/messages";

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
  if (len < 80) {
    return undefined;
  }

  if (len > 80 && len <= 120) {
    // Soft limit
    severity = 1;
  } else if (len > 120) {
    // Hard limit
    severity = 0;
  } else {
    // If something goes wrong, return
    return undefined;
  }

  // Create Diagnostic
  return new vscode.Diagnostic(
    line.range,
    severity === 0 ? errLongLine : warningLongLine,
    severity === 0
      ? vscode.DiagnosticSeverity.Error
      : vscode.DiagnosticSeverity.Warning
  );
};
