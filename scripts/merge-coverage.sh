#!/usr/bin/env bash
mkdir reports || true
cp cypress-coverage/lcov.info reports/from-cypress.info && cp jest-coverage/lcov.info reports/from-jest.info
mkdir coverage || true
./scripts/mergeLcov.perl -a ./reports/from-cypress.info -a ./reports/from-jest.info -o ./coverage/lcov.info
./scripts/genHtml.perl ./coverage/lcov.info --output-directory=./coverage/lcov-report
