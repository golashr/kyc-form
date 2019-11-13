#!/bin/bash

set -ev

echo "Deploying containers"
BUILDID=$1
echo $BUILDID

DOCUSENAME=$2
echo $DOCUSENAME

echo "Move to ledgeriumkyc folder"
cd ~/ledgerium/ledgeriumkyc

echo "Remove additional backed-up yml file earlier saved"
rm -rf docker-compose.yml_v*

VERSIONSTR=`awk '/ledgeriumkyc:v/{print}' docker-compose.yml`
VERSIONSTR=`echo "${VERSIONSTR}" | cut -d : -f3`
echo $VERSIONSTR
VERSIONSTR=${VERSIONSTR%?}
echo $VERSIONSTR

echo "Taking backup of the compose file" 
cp docker-compose.yml docker-compose.yml_v$VERSIONSTR 

echo "Pull the container down in case it is running" 
docker-compose down 

echo "String replace"
sed -i "s/$VERSIONSTR/v$BUILDID/g" docker-compose.yml

echo "Pull the new image from dockercontainer down in case it is running" 
docker pull $DOCUSENAME/ledgeriumkyc:v$BUILDID 

echo "Bringing up the containers" 
docker-compose up -d

echo "Checking if containers are up and running" 
docker ps -a

echo "script is finished"
