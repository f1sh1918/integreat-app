![Integreat](build-configs/integreat/assets/app-logo.png)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)
[![versioning](https://img.shields.io/badge/calver-YYYY.MM.PATCH-22bfda.svg)](version.json)
[![CircleCI Status](https://circleci.com/gh/Integreat/integreat-app.svg?style=shield)](https://circleci.com/gh/Integreat/integreat-app)

# integreat-app

React JS and React Native App for [Integreat](https://integreat-app.de), [Malte](https://www.malteser-werke.de/malte-app.html) and [Aschaffenburg](https://aschaffenburg.app).

## Contents

- [Contributing](#contributing)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Project setup](#project-setup)
- [Further Reading](#further-reading)

## Contributing

You can contribute by:

- [Creating Pull requests](docs/contributing.md#pull-requests)
- [Reporting bugs](docs/contributing.md#bug-reporting)

If you want to know more about Integreat or if you want to join us, contact [Max](mailto:ammann@integreat-app.de),
[Steffen](mailto:kleinle@integreat-app.de) or [our info mail](mailto:info@integreat-app.de) and visit our [website](https://integreat-app.de).

## Project Structure

This is a monorepo and contains the following projects:

- **[web](web/README.md)**: React JS webapp
- **[native](native/README.md)**: React Native Android and iOS apps

Both projects are whitelabelled with different [build configs](build-configs/README.md).

There are also separate sub-projects used by both projects:

- **[translations](translations/README.md)**: Translated texts and utilities to manage them
- **[api-client](api-client/README.md)**: Implementation of the endpoints (v3) of the integreat cms
- **[build-configs](build-configs/README.md)**: Configuration files to build different versions of the apps

If you make changes in these sub-projects, make sure to bump the version in the corresponding package.json and run yarn
to make these changes available in both projects.

## Getting Started

### Prerequisites

- Rate our Integreat app in the [PlayStore](https://play.google.com/store/apps/details?id=tuerantuer.app.integreat)
  and the [Apple App Store](https://apps.apple.com/ae/app/integreat/id1072353915).
- Install [nodejs](https://nodejs.org/). At least v10 is required, but we recommend the v12 LTS.
  Using the latest version (v13) may lead to errors.
- Install [yarn](https://yarnpkg.com/).

### Project setup

We suggest **[IntelliJ IDEA Ultimate](https://www.jetbrains.com/idea/)** as IDE. JetBrains provides free licences for students.
If you are using a different IDE like Visual Studio Code ([./docs/vscode.md](./docs/vscode.md)) the steps might differ.

- Import this project (VCS > Get from Version Control).
- **Open either the [web](web) or [native](native) directory separately in IntelliJ (File > Open).**
- Follow the steps mentioned in the [web README](web/README.md) or the [native README](native/README.md).

_We are recommending to use either a Linux distribution or MacOS for development.
If you want to develop on Windows anyway, follow the steps [here](./docs/windows-setup.md)
or use the Windows Subsystem for Linux following the information [here](./docs/wsl-setup.md)._

## Further Reading

More information on both the webapp and the native app can be found in the [web documentation](web/docs) and the [app documentation](native/docs).
Documentation on [CI/CD](docs/cicd.md), [contributing](docs/contributing.md) and our [conventions](docs/conventions.md) can be found [here](docs).
