import { issuesData, IssueContent } from "./issuesData";
import { issuesDataEn } from "./issuesDataEn";
import { Language } from "../context/LanguageContext";

export function getIssuesData(lang: Language = "id"): Record<string, IssueContent> {
  return lang === "en" ? issuesDataEn : issuesData;
}

export function getIssueData(slug: string, lang: Language = "id"): IssueContent | undefined {
  const data = getIssuesData(lang);
  return data[slug];
}

export { issuesData, issuesDataEn };
