#!/bin/bash

if [[ $TRAVIS_BRANCH == "master" ]]; then
  # setup git stuff
  git config --global user.name "${USER_NAME}"
  git config --global user.email "${USER_EMAIL}";
  git remote set-url origin https://$GH_TOKEN@github.com/northbrookjs/northbrook;
  git fetch origin;
  git checkout master;
  git branch --set-upstream-to=origin/master master;

  bash .scripts/npm-login.sh;

  # build library
  npm run build;

  # run deployment
  node cli.js release --skip-login;
fi
