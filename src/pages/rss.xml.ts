import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedProjects from "@utils/getSortedProjects";
import slugify from "@utils/slugify";
import { SITE } from "@config";

export async function get() {
  const projects = await getCollection("projects");
  const sortedProjects = getSortedProjects(projects);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedProjects.map(({ data }) => ({
      link: `projects/${slugify(data)}`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.pubDatetime),
    })),
  });
}
