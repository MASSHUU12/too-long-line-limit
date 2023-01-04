import * as vscode from "vscode";
import { exConfig } from "./helpers/exConfig";
import { validateLine } from "./helpers/validateLine";

/**
 * Performs validation on file
 *
 * @param {vscode.TextDocumentChangeEvent} e
 * @return {*} void
 */
export const fileValidator = (
  e: vscode.TextDocumentChangeEvent | vscode.TextEditor,
  diagCollection: vscode.DiagnosticCollection
): void => {
  // Array for diagnostic elements
  let diagArray = new Array<vscode.Diagnostic>();

  // If document language is in disabled list, skip validation
  if (exConfig.disabledIn().includes(e.document.languageId)) {
    diagCollection.has(e.document.uri) && diagCollection.delete(e.document.uri);
    return;
  }

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
