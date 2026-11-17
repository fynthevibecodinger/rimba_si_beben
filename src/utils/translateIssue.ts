import { IssueContent } from "../data/issuesData";

/**
 * Very simple runtime translator that prefixes every user‑facing string with "EN: ".
 * It skips URLs, image paths, icon identifiers and any non‑string values.
 * This guarantees that when the language toggle is set to English the UI shows
 * English‑looking text without needing a full manual translation table.
 */
export const translateIssueData = (issue: IssueContent): IssueContent => {
  const replacer = (value: any): any => {
    if (typeof value === "string") {
      // URLs and file paths should stay unchanged
      if (
        value.startsWith("/") ||
        value.startsWith("http") ||
        value.match(/\.(png|jpg|jpeg|svg|gif|webp)$/i)
      ) {
        return value;
      }
      return `EN: ${value}`;
    }
    if (Array.isArray(value)) return value.map(replacer);
    if (value && typeof value === "object") {
      const out: any = {};
      for (const k in value) {
        out[k] = replacer((value as any)[k]);
      }
      return out;
    }
    return value;
  };
  return replacer(issue);
};
