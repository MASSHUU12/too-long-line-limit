import * as vscode from "vscode";
import { errLongLine, warningLongLine } from "./constants/messages";
import { validateLine } from "./helpers/validateLine";
/**
 * Performs validation on each line of the file
 *
 * @param {vscode.TextDocumentChangeEvent} e
 * @return {*} void
 */
export const lineValidator = (
  e: vscode.TextDocumentChangeEvent | vscode.TextEditor,
  diagCollection: vscode.DiagnosticCollection
): void => {
  // Array for diagnostic elements
  let diagArray = new Array<vscode.Diagnostic>();

  // Loop through all lines in document
  for (let i = 0; i < e.document.lineCount; i++) {
    const diag = validateLine(e.document.lineAt(i));

    if (diag === undefined) {
      continue;
    }

    diagArray.push(diag);
  }

  // Display problems
  diagCollection.set(vscode.window.activeTextEditor!.document.uri, diagArray);
};
