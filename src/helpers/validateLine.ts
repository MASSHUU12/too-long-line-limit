import { TextLine, Diagnostic } from "vscode";
import { errLongLine, warningLongLine } from "../constants/messages";
import { config } from "./config";

/**
 * Checks the length of the specified line,
 * if it exceeds the set standards it returns Diagnostic
 *
 * @param {TextLine} line
 * @return {*}  {(Diagnostic | undefined)}
 */
export const validateLine = (line: TextLine): Diagnostic | undefined => {
  const len = line.text.length;
  let severity = -1;

  // If the line length is within an acceptable range, return
  if (len < config.limit("soft")) {
    return undefined;
  }

  if (len > config.limit("soft") && len <= config.limit("hard")) {
    // Soft limit
    severity = config.severity("soft");
  } else if (len > config.limit("hard")) {
    // Hard limit
    severity = config.severity("hard");
  } else {
    // If something goes wrong, return
    return undefined;
  }

  // Create Diagnostic
  return new Diagnostic(
    line.range,
    severity === 0 ? errLongLine : warningLongLine,
    severity
  );
};
