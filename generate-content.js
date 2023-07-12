const fs = require("fs");
const path = require("path");
const { faker } = require("@faker-js/faker");
const YAML = require("yaml");
const { emptyDirectory } = require("./test/util");
const arg = require("arg");

const slugify = (text) => faker.helpers.slugify(text).toLowerCase();

// store incoming command line arguments
const args = arg({
  // types
  "--verbose": Boolean,
  "--fake": Boolean,
  "--people": Number,
  "--organizations": Number,
  // aliases
  "-v": "--verbose",
  "-f": "--fake",
  "-p": "--people",
  "-o": "--organizations",
});
// ^ couldn't hurt to add a --help, -h flag.
// MODE defaults
// - VERBOSE=true : console.log the generator entities
// - WRITE_MODE=true : overwrite existing test data
let VERBOSE_MODE = false;
let WRITE_MODE = true;
// overwrite defaults as available
if (args["--verbose"]) {
  VERBOSE_MODE = true;
}
if (args["--pretend"]) {
  WRITE_MODE = false;
}
const COUNTS = {
  people: args["--people"] > 0 ? args["--people"] : 32,
  organizations: args["--organizations"] > 0 ? args["--organizations"] : 8,
};
// ^ it feels like there's some tidying up/abstraction that could be done here.

const contentDir = path.join(__dirname, "src", "content");

// paths with specific content
const contentFile = path.join(contentDir, "data.yaml");

//

// organization generator
function generateOrganization() {
  const name = faker.company.name();

  return {
    name,
    id: slugify(name),
    color: faker.color.rgb({ format: "css" }),
  };
}
// generate organizations.
const organizations = faker.helpers.multiple(generateOrganization, {
  count: COUNTS.organizations,
});

// person generator
function generatePerson() {
  const first_name = faker.person.firstName();
  const last_name = faker.person.lastName();
  const id = slugify(`${first_name} ${last_name}`);

  return {
    id,
    name: `${first_name} ${last_name}`,
    organization_id: faker.helpers.arrayElement(
      organizations.map(({ id }) => id),
    ),
  };
}
// generate people.
const people = faker.helpers.multiple(generatePerson, {
  count: COUNTS.people,
});

VERBOSE_MODE &&
  console.log(
    "VERBOSE_MODE=true\n",
    JSON.stringify(
      {
        people,
        organizations,
      },
      null,
      2,
    ),
  );
console.log(`
 | successfully wrote to ${contentFile}:
 |   - ${people.length} people
 |   - ${organizations.length} organizations
`);

if (WRITE_MODE) {
  // write new content
  fs.writeFileSync(
    contentFile,
    YAML.stringify({ people, organizations }, null, 2),
  );
} else {
  console.log("WRITE_MODE=false: existing test data is preserved.");
}
