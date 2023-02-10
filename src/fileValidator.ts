import {
  TextDocumentChangeEvent,
  TextEditor,
  DiagnosticCollection,
  Diagnostic,
  window,
} from "vscode";
import { config } from "./helpers/config";
import { validateLine } from "./helpers/validateLine";

/**
 * Performs validation on file
 *
 * @param {TextDocumentChangeEvent} e
 * @param diagCollection
 * @return {*} void
 */
export const fileValidator = (
  e: TextDocumentChangeEvent | TextEditor,
  diagCollection: DiagnosticCollection
): void => {
  // Array for diagnostic elements
  let diagArray = new Array<Diagnostic>();

  // If document language is not in enabledIn list, skip validation
  if (config.enabledIn().length > 0) {
    if (!config.enabledIn().includes(e.document.languageId)) {
      return;
    }
  } else {
    // If document language is in disabled list, skip validation
    if (config.disabledIn().includes(e.document.languageId)) {
      diagCollection.has(e.document.uri)
      && diagCollection.delete(e.document.uri);
      return;
    }
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
  diagCollection.set(window.activeTextEditor!.document.uri, diagArray);
};
