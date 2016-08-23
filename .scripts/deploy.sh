#!/bin/bash

if [[ $TRAVIS_BRANCH == "master" ]]; then
  # setup git stuff
  git config --global user.name 'Tylor Steinberger';
  git config --global user.email 'tlsteinberger167@gmail.com';
  git remote set-url origin https://$GH_TOKEN@github.com/northbrookjs/northbrook;
  git fetch origin
  git checkout origin master
  git branch --set-upstream-to=origin/master master

  bash .scripts/npm-login.sh

  # build library
  npm run build;

  # run deployment
  npm run release;
fi
