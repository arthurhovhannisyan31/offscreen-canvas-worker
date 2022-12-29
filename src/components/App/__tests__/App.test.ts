import { it, describe, expect, jest } from "@jest/globals";

import { App } from "../App";

jest.mock("../../../workers/standalone-workers", () => ({
  getMainWorker: jest.fn()
}));
jest.mock("../../../workers/worker-modules", () => ({
  getMainModuleWorker: jest.fn()
}));

describe("<App />", () => {
  it("gonna be all right", () => {
    expect(App).not.toBeNull();
  });
});
