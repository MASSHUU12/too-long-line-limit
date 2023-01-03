import * as vscode from "vscode";
import { errLongLine, warningLongLine } from "./constants/messages";
/**
 * Performs validation on each line of the file
 *
 * @param {vscode.TextDocumentChangeEvent} e
 * @return {*} void
 */
export const lineValidator = (
  e: vscode.TextDocumentChangeEvent,
  diagCollection: vscode.DiagnosticCollection
): void => {
  // Array for diagnostic elements
  let diagArray = new Array<vscode.Diagnostic>();
  let diagNum = -1;

  const editor = vscode.window.activeTextEditor;

  if (!editor || !vscode.workspace.textDocuments.includes(editor!.document)) {
    // No open text editor
    diagCollection.clear();
    return;
  }

  // Loop through all lines in document
  for (let i = 0; i < e.document.lineCount; i++) {
    // Get length of line
    const line = e.document.lineAt(i);
    const lineLen = line.text.length;

    // Check if line is too long, if not, continue
    if (lineLen > 80 && lineLen <= 120) {
      diagNum = 1;
    } else if (lineLen > 120) {
      diagNum = 0;
    } else {
      continue;
    }

    // Create error Diagnostic
    const diagnostic = new vscode.Diagnostic(
      line.range,
      diagNum === 0 ? errLongLine : warningLongLine,
      diagNum === 0
        ? vscode.DiagnosticSeverity.Error
        : vscode.DiagnosticSeverity.Warning
    );

    diagArray.push(diagnostic);
  }

  // Display problems
  diagCollection.set(editor.document.uri, diagArray);
};
