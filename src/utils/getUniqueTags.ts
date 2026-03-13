import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";

const getUniqueTags = (projects: CollectionEntry<"projects">[]) => {
  const filteredProjects = projects.filter(({ data }) => !data.draft);
  const tags: string[] = filteredProjects
    .flatMap(project => project.data.tags)
    .map(tag => slugifyStr(tag))
    .filter(
      (value: string, index: number, self: string[]) =>
        self.indexOf(value) === index
    )
    .sort((tagA: string, tagB: string) => tagA.localeCompare(tagB));
  return tags;
};

export default getUniqueTags;
