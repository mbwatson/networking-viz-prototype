# networking Visualization Prototype

This React application is a proof-of-concept to center discussions around a website component that exposes collaborations across a network of individuals and organizations.

### Test Data

There is a script to generate data, which will be dumped into the `src/content/data.yaml` file.

To generate new test content, run `npm run generate`.
There are a few arguments that can be passed to control this script's behavior.
Recall that pattern is `npm run [command] [-- <args>]`.
Passing the `--verbose` flag (or just `-v` for short) will dump the generated content to the console for visual inspection.
To do a content-generation dry-run, pass the `--fake` flag (or just `-f` for short).
For example, `npm run generate -- -fv` will show you lots of generated data (`-v`), but not write anything to disk (`-f`).
This command is particularly useful for getting quick feedback while writing new content-generation functionality.

There are a couple more knobs on this generator. You can pass in the number of instructors and courses to generate with the `--people` and `--organizations` arguments, respectively.

```
$ npm run generate -- --people=32 --organizations=8
 | successfully wrote to src/content/data.yaml:
 |   - 32 people
 |   - 8 organizations
```

For a more succinct approach, the command `npm run generate -- -p 32 -o 8` invokes identical behavior.


## Content Management

All content lives in the `src/content` directory in a single YAML file.
There are two core content types: People and Organizations.
See types for these fields below, with their necessity and uniquess indicated.

- **Person**

  - `id` : `String`, required, unique
  - `name` : `String`
  - `organization_id` : `String`

- **Organization**

  - `id` : `String`, unique
  - `name` : `String`, required

## 🎁 Building for Production

A production bundle of this application is built with `npm run build`, which will land in the `dist` directory.

## 🚀 Deployment

This will likely never make it to a production deployment.
