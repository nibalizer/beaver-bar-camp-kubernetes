#!/bin/bash

pushd collect-votes
docker build -t nibalizer/collect-votes .
popd
docker push nibalizer/collect-votes

pushd validate-votes
docker build -t nibalizer/validate-votes .
popd
docker push nibalizer/validate-votes
