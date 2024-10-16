# PTICS
!["API CI badge"](https://github.com/mr-mig/ptics/actions/workflows/api-ci.yml/badge.svg)
!["Plugin CI badge"](https://github.com/mr-mig/ptics/actions/workflows/plugin-ci.yml/badge.svg)
---

Technical case study focused on interplay of fullstack technologies in Docker containers.

![PTICS client](https://github.com/user-attachments/assets/31993dee-9307-495b-997a-5df7a7c125ca)

Stack:

- Rails
- Electron
- Svelte

## Running the apps

### Prerequisites

To be able to run the demo in prodution/packaged mode, you will need to have `Docker` and `NodeJS` installed on your machine.
All other dependencies should be installed automatically via build/run/package scripts.

You will need to have two ports available: 
1. Prod mode: `3000`  for the API
2. Dev mode: `3000` for the API and `3002` for the Plugin

### Running the demo

To run the demo you need to run these scripts from the project root (`cd ./ptics`) in this specific order:
1. Build & pack svelte plugin

    ```bash
    scripts/package-plugin.sh
    ```
2. Build & pack electron app.  
It should automatically open the directory containing build artifacts when finished.

    ```bash
    scripts/package-host.sh
    ```
3. Build and pack Rails server

    ```bash
    scripts/package-api.sh
    ```
4. Run Rails server


    ```bash
    scripts/run-api.sh
    ```

This seuqence will build and package all things:
1. Svelte plugin inside eletron host app
2. Rails server in docker-composed containers setup

After the server is up and running, you should manually open Electron app from the directory from step 2.

_**Note:**_ you can run **several** Electron apps on Mac by using this command:
```
open -n electron-host.app
```
## Development

### Server/Plugin development in Devcontainer

The Rails server (`/api`) and Svelte plugin (`/plugin`) are supposed to be developed within devcontainer. The corresponding setup lives in `/.devcontainer` directory.

The easiest way to launch the configuration is **to open the project in VSCode**. When launched, VSCode will show a popup suggesting to open the project in devcontainer.

Having the setup like that allows to abstract away all dependencies setup and not pollute the dev machine with excesive stuff.

Also, it makes the dev setup uniform.

#### Development Lifecycle

When you boot into the Devcontainer, it will automatically install basic dependencies and make all necessary one-time changes.

Depending on what part of the stack you are planning to work on, you will need the following scripts:

1. `/api`
    - Install and build the dependencies needed for development
      ```bash
      scripts/build-api.sh
      ```
    - Run tests once
      ```bash
      scripts/test-api.sh
      ```
    - Runs a server on `http://localhost:3000`  
      ```bash
      scripts/dev-api.sh
      ```
      
2. `/plugin`
    - Install and build the dependencies  
      ```bash
      scripts/build-plugin.sh
      ```
    - Run tests once  
      ```bash
      scripts/test-plugin.sh
      ```
    - Run the dev server and serve the plugin content on `http://localhost:3002`.  
      You can open it in the browser. Each new tab will have a separate session with a new user.
      ```bash
      scripts/dev-plugin.sh
      ```
      
       

### Electron development on host machine

This is **a preferred way of developing electron app**.

You can run both server and plugin in _Devcontainer_ and Electron on )_your dev machine_. The ports will be forwarded automatically.

1. `/host`  
    - Install and **recompile**  dependencies for Electron from scratch
      ```bash
      scripts/build-clean-host.sh
      ```
    - Install dependencies without **recompiling**  
      ```bash
      scripts/build-host.sh
      ```
    - Run a single Electron app process  
      ```bash
      scripts/dev-host.sh
      ```
      

### Electron development in Devcontainer: X11 pass-through for Mac

It is possible to render Electron host window inside Devcontainer, 
but open the window on Mac.

☝️ _**This approach was added for demo purposes and is not recommended!**_

To do that, you need to make some manual setup on your Mac:

1. Install XQuartz
  ```bash
  brew install xquartz --cask
  ```

1. Add to PATH `/opt/X11/bin` and/or `/usr/X11/bin`
1. Run `xquartz` on your Mac 
1. Congigure  `Allow connections from network clients` in XQuartz Settings (menu bar)
1. Run `xhost +localhost`

⚠️ Most likely it won't work for the initial setup. Follow the steps in [this guide](https://gist.github.com/sorny/969fe55d85c9b0035b0109a31cbcb088) to have the clean state.

⚠️ If you switch between host machine and devcontainer development, you need to run `scripts/build-clean-host.sh` to recompile Electron dependencies for targeted arch and OS.


