import { travelMock } from "~/mocks/travelCategories";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return {
    message: "Categories listed",
    result: travelMock,
  };
});
