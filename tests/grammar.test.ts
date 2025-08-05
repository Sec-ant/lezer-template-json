/// <reference types="../src/vite-env.d.ts" />

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parser } from "../dist/es/index.js";

// Utility function to load patterns from fixture files
function loadPatterns(filename: string): string[] {
  const content = readFileSync(`./tests/fixtures/${filename}`, "utf-8");
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

// Utility function to test patterns for errors
function testPatternsForErrors(patterns: string[], allowErrors = false) {
  patterns.forEach((pattern) => {
    const tree = parser.parse(pattern);

    // Basic sanity checks
    expect(tree.length).toBe(pattern.length);
    expect(tree.type.name).toBe("TemplateJsonText");

    if (!allowErrors) {
      // Check that there are no error nodes
      let hasError = false;
      tree.iterate({
        enter: (node) => {
          if (node.type.isError) {
            hasError = true;
          }
        },
      });

      if (hasError) {
        console.log(`Unexpected error in pattern: "${pattern}"`);
      }
      expect(hasError).toBe(false);
    }
  });
}

describe("Template JSON Grammar", () => {
  describe("JSON Literals", () => {
    it("should parse basic JSON literals (true, false, null)", () => {
      const patterns = loadPatterns("literals.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("JSON Numbers", () => {
    it("should parse various number formats", () => {
      const patterns = loadPatterns("numbers.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("JSON Strings", () => {
    it("should parse JSON strings with escapes", () => {
      const patterns = loadPatterns("strings.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("JSON Arrays", () => {
    it("should parse JSON arrays", () => {
      const patterns = loadPatterns("arrays.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("JSON Objects", () => {
    it("should parse JSON objects", () => {
      const patterns = loadPatterns("objects.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Template Expressions", () => {
    it("should parse template expressions in JSON", () => {
      const patterns = loadPatterns("templates.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Edge Cases", () => {
    it("should handle problematic patterns", () => {
      const patterns = loadPatterns("edge-cases.txt");
      // Allow errors for edge cases since they may be intentionally malformed
      testPatternsForErrors(patterns, true);
    });
  });

  describe("Complex Real-World Patterns", () => {
    it("should parse complex template JSON patterns", () => {
      const patterns = loadPatterns("complex.txt");
      testPatternsForErrors(patterns);
    });
  });
});
