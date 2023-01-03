import * as vscode from "vscode";
import { lineValidator } from "./lineValidator";

// This method is called when extension is activated for the first time
export function activate(context: vscode.ExtensionContext) {
  const DIAGNOSTIC_COLLECTION = vscode.languages.createDiagnosticCollection(
    "too-long-line-limit"
  );

  // This line of code will only be executed once when extension is activated
  console.log('Extension "Too Long - line limit" is now active.');

  // Listen for document focus changes
  vscode.window.onDidChangeActiveTextEditor((e) => {
    if (!e) {
      return;
    }
    lineValidator(e, DIAGNOSTIC_COLLECTION);
  });

  // Listen for document changes
  vscode.workspace.onDidChangeTextDocument((e) => {
    if (!vscode.window.activeTextEditor) {
      // No open text editor
      DIAGNOSTIC_COLLECTION.delete(e.document.uri);
      return;
    }
    lineValidator(e, DIAGNOSTIC_COLLECTION);
  });

  // Listen if file is closed
  vscode.workspace.onDidCloseTextDocument((e) =>
    // Delete diagnostic for this file
    DIAGNOSTIC_COLLECTION.delete(e.uri)
  );
}

// This method is called when extension is deactivated
export function deactivate() {}
