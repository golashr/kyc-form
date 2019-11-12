#!/bin/bash

set -ev

BUILDID=$1
echo $BUILDID

DOCUSENAME=$2
echo $DOCUSENAME

echo "Deploying containers"
echo "Move to ledgeriumkyc folder"
cd ~/ledgerium/ledgeriumkyc

echo "Taking backup of the compose file" 
cp docker-compose.yml docker-compose.yml_v123 

#echo "List images"
#docker images 

echo "Pull the container down in case it is running" 
docker-compose down 

echo "Pull the new image from dockercontainer down in case it is running" 
#docker pull $DOCUSENAME/ledgeriumkyc:vbuild-29996 
docker pull golra03/ledgeriumkyc:vbuild-29996 

echo "Bringing up the containers" 
docker-compose up -d

echo "Checking if containers are up and running" 
docker ps -a

echo "npm install gulp"
npm install -g gulp-cli 

#echo "replace docker image tag and restart the container"
#sed -i /"s//ledgeriumkyc:v1.0//ledgeriumkyc:v${BUILDID}//g/" docker-compose.yml && docker-compose up -d

echo "script is finished"
