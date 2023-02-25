import { it, describe, expect, jest } from "@jest/globals";

import { App } from "../App";

jest.mock("../../../workers/module-worker", () => ({
  getMainModuleWorker: jest.fn()
}));
jest.mock("../../../workers/common", () => ({
  putImageData: jest.fn(),
  drawImage: jest.fn(),
  processImageData: jest.fn(),
}));

describe("<App />", () => {
  it("gonna be all right", () => {
    expect(App).not.toBeNull();
  });
});
