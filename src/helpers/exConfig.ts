import { VS_CONFIG } from "../constants/constants";
import { Limit } from "../types/types";

/**
 * Get soft or hard limit
 *
 * @param {Limit} whichLimit
 * @return {*}  {number}
 */
const limit = (whichLimit: Limit): number => {
  const config = VS_CONFIG.get(whichLimit + "Limit");

  if (!config) {
    return whichLimit === "soft" ? 80 : 120;
  }
  return parseInt(config as string);
};

/**
 * Get severity of specified limit
 *
 * @param {Limit} whichLimit
 * @return {*}  {number}
 */
const severity = (whichLimit: Limit): number => {
  const config = VS_CONFIG.get(whichLimit + "LimitSeverity");

  if (!config) {
    return whichLimit === "soft" ? 1 : 0;
  }
  return parseInt(config as string);
};

/**
 * Whether rulers should be included
 *
 * @returns {*} {boolean}
 */
const rulersEnabled = (): boolean => {
  return VS_CONFIG.get("rulersEnabled") as boolean;
};

/**
 * In which languages the check is to be disabled
 *
 * @return {*}  {string[]}
 */
const disabledIn = (): string[] => {
  const config = VS_CONFIG.get("disabledIn");

  if (config) {
    return config as Array<string>;
  }
  return [];
};

/**
 * Access to extension configuration
 */
export const exConfig = {
  limit: limit,
  severity: severity,
  rulersEnabled: rulersEnabled,
  disabledIn: disabledIn,
};
