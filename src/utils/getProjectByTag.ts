import { slugifyAll } from "./slugify";
import type { CollectionEntry } from "astro:content";

const getProjectsByTag = (
  projects: CollectionEntry<"projects">[],
  tag: string
) => projects.filter(project => slugifyAll(project.data.tags).includes(tag));

export default getProjectsByTag;
