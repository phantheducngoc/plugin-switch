## Set Up Your Dev Environment

Before you generate a new Salesforce plugin, set up these prerequisites.

Install or update Node.js.

To build a Salesforce CLI plugin, you need the latest long-term support (LTS) version of Node.js. If you’re new to Node.js development, we suggest that you use nvm (Node Version Manager) to install Node.js. See this installation script to install or update nvm.

To check your Node.js version, run:

```bash
node --version
If your node version is earlier than 8 (or if you don’t have Node.js installed), run this command to install LTS:
```

````bash
sudo npm install -g yarn
Install TypeScript (target es2017.)

```bash
npm install -g typescript
````

Salesforce CLI plugins can use JavaScript instead of TypeScript, but the classes in the Salesforce DX core library are written in TypeScript.

Install or update Salesforce CLI.

If you don’t have Salesforce CLI installed on your computer, see Install the Salesforce CLI in the Salesforce CLI Setup Guide to install both the sfdx and sf executables. After installing, update Salesforce CLI to ensure you’re on the latest version; this command updates both executables.

```bash
sfdx update
We recommend you use Visual Studio Code with Salesforce Extensions as your IDE, because it includes tools for developing on the Salesforce platform.
```

## Install(not ready)

```bash
sf plugins install @salesforce/plugin-switch@x.y.z
```

### Build(use git)

To build the plugin locally, make sure to have yarn installed and run the following commands:


```bash
# Clone the repository
git clone https://github.com/nphan-sts/plugin-switch.git

# Install the dependencies and compile
yarn && yarn build
```

```bash
# Link your plugin to the sf cli
sf plugins link .
# To verify
sf plugins
```

```bash
# Create SFDX project with manifest
cd ../
sfdx force:project:create --projectname "plugin-switch-sfdx" --manifest
cd plugin-switch-sfdx
git init
```
Copy package.xml in LPC-830 to package.xml file



## Commands

SFDX project is required

<!-- commands -->

- [`sf switch retrieve'`]

## `sf switch retrieve'`

```
USAGE
  $ sf switch retrieve -x <value> [--json]

FLAGS
  -x, --package=<value>  (required) Retrieve Flows, Validation Rules, Apex triggers, Process builders defined in package.xml.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION

  Retrieve Flows, Validation Rules, Apex triggers, Process builders defined in package.xml.

EXAMPLES
  '$ sf switch:retrieve --package path/to/package.xml'
```

- [`sf switch switchOff'`]

## `sf switch switchOff'`

USAGE
$ sf switch switchOff -x <value> [--json]

FLAGS
-x, --package=<value> (required) Change Flows,Process builders activeVersionNumber to 0, Validation Rules active to false, Apex triggers status to Inactive. then deploy to the org.

GLOBAL FLAGS
--json Format output as json.

DESCRIPTION

Change Flows,Process builders activeVersionNumber to 0, Validation Rules active to false, Apex triggers status to Inactive. then deploy to the org.

EXAMPLES
$ sf switch switchOff --package path/to/package.xml

- [`sf switch switchOn'`]

## `sf switch switchOn'`

Change Flows, Validation Rules, Apex triggers, Process builders to original version.

USAGE
$ sf switch switchOn -x <value> [--json]

FLAGS
-x, --package=<value> (required) Change Flows, Validation Rules, Apex triggers, Process builders to original version. then deploy to the org.

GLOBAL FLAGS
--json Format output as json.

DESCRIPTION

Change Flows, Validation Rules, Apex triggers, Process builders to original version. then deploy to the org.

EXAMPLES
$ sf switch switchOn --package path/to/package.xml

<!-- commandsstop -->
