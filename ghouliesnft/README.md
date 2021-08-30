
## Getting up and running
1. Run command `npm run setup`. This may take a while – be patient, do some exercise.
2. Copy and rename *default.config-local.json* to *config-local.json*.
3. Update content of config.local.json to suite your local environment.

## Workflow options

### Production setup

* run command `gulp`

**This will produce:**
* compressed CSS output
* optimized Image assets
* minified JS

### Development setup

* run command `gulp dev`

**This will produce:**
* nested CSS output
* un-minified JS
* source maps for both CSS and JS
* watch task for changes in SCSS and JS files
* BrowserSync links

### JS Linting

* run command `gulp js-lint`

This will check for common errors in your JS files.
Its not a part of the watch task.
