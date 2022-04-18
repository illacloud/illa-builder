#!/usr/bin/env bash
mkdir reports || true
cp cypress-coverage/coverage-final.json reports/from-cypress.json && cp jest-coverage/coverage-final.json reports/from-jest.json
npx nyc merge reports && mv coverage.json .nyc_output/out.json
npx nyc report --reporter lcov --reporter text --report-dir coverage
