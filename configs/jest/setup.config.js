import * as matchers from "jest-extended";
import { toBeArray, toBeSealed } from "jest-extended";

expect.extend(matchers);
expect.extend({ toBeArray, toBeSealed });
