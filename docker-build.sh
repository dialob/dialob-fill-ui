#!/bin/bash
docker build -t docker.resys.io/flexiform-chat:latest .
[[ $1 == '-push' ]] && docker push docker.resys.io/flexiform-chat:latest
