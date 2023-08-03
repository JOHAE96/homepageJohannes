import { SITE } from "@config";

const getPageNumbers = (numberOfProjects: number) => {
  const numberOfPages = numberOfProjects / Number(SITE.projectsPerPage);

  let pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return pageNumbers;
};

export default getPageNumbers;
