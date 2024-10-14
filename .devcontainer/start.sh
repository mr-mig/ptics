#!/bin/bash
echo "Setting git safe dir to $WORKSPACE_DIR"
git config --global --add safe.directory $WORKSPACE_DIR

