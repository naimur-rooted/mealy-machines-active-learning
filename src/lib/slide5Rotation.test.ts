import { describe, it, expect } from "vitest";
import { nextSlide5Image } from "./slide5Rotation";

describe("slide5Rotation", () => {
  it("alternates deterministically between variant 1 and 2", () => {
    expect(nextSlide5Image("1")).toBe("2");
    expect(nextSlide5Image("2")).toBe("1");
  });
});
