#!/bin/bash
SCRIPT_DIR="$(dirname "$(realpath "$0")")"

. "$SCRIPT_DIR"/build-clean-host.sh
cd ../host && npm run make

# Open the host directory in the OS file browser
HOST_DIR="$SCRIPT_DIR/../host/out"

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "$HOST_DIR"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    open "$HOST_DIR"
elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    explorer "$HOST_DIR"
else
    echo "Unsupported OS: $OSTYPE"
fi