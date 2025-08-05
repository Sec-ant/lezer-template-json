# Test Organization

This directory contains a well-organized test suite for the Template JSON grammar using Vitest.

## Structure

```text
tests/
├── grammar.test.ts            # Main test file
└── fixtures/                  # Test pattern fixtures
    ├── literals.txt           # JSON literals (true, false, null)
    ├── numbers.txt            # JSON number formats
    ├── strings.txt            # JSON string formats
    ├── arrays.txt             # JSON array formats
    ├── objects.txt            # JSON object formats
    ├── templates.txt          # Template expressions ({{...}})
    ├── complex.txt            # Complex real-world patterns
    └── edge-cases.txt         # Problematic patterns
```

## How It Works

### How Test Organization Works

- **One test suite per pattern category** - Easy to identify which patterns are failing
- **Fixture-based patterns** - Clean separation of test data from test logic
- **Simple utilities** - Minimal helper functions for loading and testing patterns

### Adding New Patterns

1. **Add to existing fixture**: Edit the appropriate `.txt` file in `tests/fixtures/`
2. **Create new category**: Add a new fixture file and corresponding test in `grammar.test.ts`

Example fixture file format:

```text
# Comments explaining the pattern type
pattern1
pattern2
pattern3
```

### Adding New Test Categories

1. Create a new fixture file: `tests/fixtures/my-new-category.txt`
2. Add patterns to the file (one per line, comments with `#`)
3. Add a test suite in `tests/grammar.test.ts`:

```typescript
describe("My New Category", () => {
  it("should parse my new pattern type", () => {
    const patterns = loadPatterns("my-new-category.txt");
    testPatternsForErrors(patterns);
  });
});
```

## Running Tests

```bash
pnpm test        # Watch mode (auto-compiles grammar)
pnpm test:ui     # Interactive UI for running tests
pnpm test:run    # Single run (auto-compiles grammar)
```

## Best Practices

### ✅ Do

- Keep fixture files focused on one pattern type
- Use descriptive comments in fixture files (starting with `#`)
- Add problematic patterns to `edge-cases.txt`
- Keep the test logic simple and reusable

### ❌ Don't

- Mix different pattern types in the same fixture
- Put test logic in fixture files
- Over-engineer the test utilities
- Duplicate patterns across fixtures

This organization makes it easy to:

- Add new patterns by editing text files
- Identify which pattern categories have issues
- Keep test logic clean and maintainable
- Scale to hundreds of test patterns
