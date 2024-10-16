#!/bin/bash
SCRIPT_DIR="$(dirname "$(realpath "$0")")"

. "$SCRIPT_DIR"/build-plugin.sh
cd ../plugin && npm run build -- --base=./ && cp -r dist ../host