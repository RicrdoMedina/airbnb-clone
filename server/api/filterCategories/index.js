import { categoryMock } from "~/mocks/filterCategories";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return {
    message: "Category listed",
    result: categoryMock,
  };
});
