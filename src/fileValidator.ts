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
 * @param {(TextDocumentChangeEvent | TextEditor)} editor
 * @param {DiagnosticCollection} diagCollection
 * @return {*}  {void}
 */
export const fileValidator = (
  editor: TextDocumentChangeEvent | TextEditor,
  diagCollection: DiagnosticCollection
): void => {
  // Array for diagnostic elements
  let diagArray = new Array<Diagnostic>();
  const document = editor.document;

  // If document language is not in enabledIn list, skip validation
  if (config.enabledIn().length > 0) {
    if (!config.enabledIn().includes(document.languageId)) {
      return;
    }
  } else {
    // If document language is in disabled list, skip validation
    if (config.disabledIn().includes(document.languageId)) {
      diagCollection.has(document.uri) && diagCollection.delete(document.uri);
      return;
    }
  }

  // Loop through all lines in document
  for (let i = 0; i < document.lineCount; i++) {
    const diag = validateLine(document.lineAt(i));

    if (diag === undefined) {
      continue;
    }
    diagArray.push(diag);
  }

  // Display problems
  diagCollection.set(window.activeTextEditor!.document.uri, diagArray);
};
