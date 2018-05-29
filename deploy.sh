#!/bin/bash

yarn build &&
cd build &&
git init &&
git add --all &&
git commit -m deploy &&
git remote add origin https://github.com/danfarino/objectgraph.git &&
git push origin HEAD --force
