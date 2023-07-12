const fs = require("fs");
const path = require("path");
const YAML = require("yaml");
const { hasDistinctElements } = require("./util");

const contentDir = path.join("./src", "content");

// paths with specific content
const contentFile = path.join(contentDir, "data.yaml");

// read the content
const dataYaml = fs.readFileSync(contentFile, "utf8");
const data = YAML.parse(dataYaml);

/*
 * tests
 **/

test("people ids should be unique", () => {
  const ids = data.people.map(({ id }) => id);
  expect(hasDistinctElements(ids)).toBe(true);
});

test("organization ids should be unique", () => {
  const ids = data.organizations.map(({ id }) => id);
  expect(hasDistinctElements(ids)).toBe(true);
});
