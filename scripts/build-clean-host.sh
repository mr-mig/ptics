#!/bin/bash

cd host && rm -rf node_modules && npm install --include=dev && npx electron-rebuild