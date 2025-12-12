import { jest } from "@jest/globals";

import { debounce } from "./dropdown.js";

//Test to see if when you call adebounced function, it should not run immediately. (Runa fter 300ms)

test("debounce delays function execution", () => {
  //fake function to debounce
  const originalFunction = jest.fn();

  //tells jest to take constrol of timers
  //fast forward times to not have to use real delay
  jest.useFakeTimers();

  //debounced version of fake function
  const debouncedFunction = debounce(originalFunction, 300);

  //should not be run immediately
  debouncedFunction();

  //fake function has not been called yet
  expect(originalFunction).not.toHaveBeenCalled();

  //fast forward 300ms
  jest.advanceTimersByTime(300);

  //debounce waits, runs once
  expect(originalFunction).toHaveBeenCalledTimes(1);
});
