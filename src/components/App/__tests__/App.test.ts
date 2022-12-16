import { it, describe, expect } from "@jest/globals";

import { App } from "../App";

describe("<App />", () => {
  it("gonna be all right", () => {
    expect(App).not.toBeNull();
  });
});
