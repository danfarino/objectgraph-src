#!/bin/bash

npm run build &&
cd build &&
rm .gitignore && # so we don't accidentally ignore bundle.js files
git init &&
git add --all &&
git commit -m deploy &&
git remote add origin https://github.com/danfarino/objectgraph.git &&
git push origin HEAD --force &&
cd ..
