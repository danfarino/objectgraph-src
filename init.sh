#!/bin/bash

# Run this script when you first clone this repo

echo "Running npm install..."
npm install

echo "Building Monaco editor Web Worker..."
cd monaco
npm install
./build.sh
cd ..

echo "Done."
