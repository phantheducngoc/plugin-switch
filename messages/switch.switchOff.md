# summary

Deactivate triggers, flows, workflow/validation rules locally, then deploy the changes.

# description

Finds metadata XML and flips Active/true flags to Inactive/false (triggers, flows, workflow, validation rules), then deploys using the provided manifest.

# flags.package.summary

Path to package.xml

# examples

- <%= config.bin %> <%= command.id %> --package force-app/main/default/package.xml
