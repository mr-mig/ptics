#!/bin/bash

cd plugin && npm install && npm run build -- --base=./ && cp -r dist ../host