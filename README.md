# PTICS
!["API CI badge"](https://github.com/mr-mig/ptics/actions/workflows/api-ci.yml/badge.svg)
!["Plugin CI badge"](https://github.com/mr-mig/ptics/actions/workflows/plugin-ci.yml/badge.svg)
---

Technical case study focused on interplay of fullstack technologies in Docker containers.

Stack:

- Rails
- Electron
- Svelte

# Development in Devcontainer

### X11 pass-through for Mac

To be able to render Electron host window inside Devcontainer, but open the window on Mac, you need to do some manual setup on your Mac:

1. Install XQuartz
  ```bash
  brew install xquartz --cask
  ```

1. Add to PATH `/opt/X11/bin` and/or `/usr/X11/bin`
1. Run `xquartz` on your Mac 
1. Congigure  `Allow connections from network clients` in XQuartz Settings (menu bar)
1. Run `xhost +localhost`

⚠️ Most likely it won't work for the initial setup. Follow the steps in [this guide](https://gist.github.com/sorny/969fe55d85c9b0035b0109a31cbcb088) to have the clean setup.
