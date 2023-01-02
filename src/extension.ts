import * as vscode from "vscode";
import { lineValidator } from "./lineValidator";

// This method is called when extension is activated for the first time
export function activate(context: vscode.ExtensionContext) {
  // This line of code will only be executed once when extension is activated
  console.log('Extension "Too Long - line limit" is now active.');

  let disposable = vscode.commands.registerCommand(
    "too-long-line-limit.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello");
    }
  );

  const DIAGNOSTIC_COLLECTION = vscode.languages.createDiagnosticCollection(
    "too-long-line-limit"
  );

  // Listen for document changes
  vscode.workspace.onDidChangeTextDocument((e) =>
    lineValidator(e, DIAGNOSTIC_COLLECTION)
  );

  context.subscriptions.push(disposable);
}

// This method is called when extension is deactivated
export function deactivate() {}
