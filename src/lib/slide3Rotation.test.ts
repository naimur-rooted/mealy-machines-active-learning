import { describe, it, expect } from "vitest";
import { nextSlide3Image } from "./slide3Rotation";

describe("slide3Rotation", () => {
  it("alternates deterministically between variant 1 and 2", () => {
    expect(nextSlide3Image("1")).toBe("2");
    expect(nextSlide3Image("2")).toBe("1");
  });
});
