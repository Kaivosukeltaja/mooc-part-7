#!/bin/bash
set -ev
cd frontend
yarn
yarn test
yarn build
cd ../backend
yarn
yarn test
