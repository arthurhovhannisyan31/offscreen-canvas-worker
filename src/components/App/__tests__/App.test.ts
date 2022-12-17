import { it, describe, expect, jest } from "@jest/globals";

import { App } from "../App";

jest.mock("../../../workers/main", () => ({
  getMainWorker: jest.fn()
}));

describe("<App />", () => {
  it("gonna be all right", () => {
    expect(App).not.toBeNull();
  });
});
