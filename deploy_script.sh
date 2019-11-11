#!/bin/bash

echo "Deploying containers"
echo "Move to ledgeriumkyc folder"
cp docker-compose.yml docker-compose.yml_v$BUILDID 

echo "List images"
docker images 

echo "replace docker image tag and restart the container"
sed -i /"s//ledgeriumkyc:v1.0//ledgeriumkyc:v${BUILDID}//g/" docker-compose.yml && docker-compose up -d

echo "script is finished"
