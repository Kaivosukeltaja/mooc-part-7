#!/bin/bash
set -ev
cd frontend
npm install
npm run test
npm run build
cd ../backend
npm install
npm run test
