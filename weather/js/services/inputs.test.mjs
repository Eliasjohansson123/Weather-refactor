import { handleText } from "./inputs.js";

test("handleText returns the same input string", () => {
  const input = "Stockholm";

  const result = handleText(input);

  expect(result).toBe("Stockholm");
});
