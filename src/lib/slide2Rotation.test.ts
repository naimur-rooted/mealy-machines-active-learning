import { describe, it, expect } from "vitest";
import { nextSlide2Image } from "./slide2Rotation";

describe("slide2Rotation", () => {
  it("alternates deterministically between variant 1 and 2", () => {
    expect(nextSlide2Image("1")).toBe("2");
    expect(nextSlide2Image("2")).toBe("1");
  });
});
