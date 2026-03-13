import { getCollection } from "astro:content";
import generateOgImage from "@utils/generateOgImage";
import type { APIRoute } from "astro";

export const get: APIRoute = async ({ params }) => ({
  body: await generateOgImage(params.ogTitle),
});

const projectsImportResult = await getCollection(
  "projects",
  ({ data }) => !data.draft
);
const projects = Object.values(projectsImportResult);

export function getStaticPaths() {
  return projects
    .filter(({ data }) => !data.ogImage)
    .map(({ data }) => ({
      params: { ogTitle: data.title },
    }));
}
