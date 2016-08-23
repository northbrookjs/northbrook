#!/bin/bash

if [[ $TRAVIS_BRANCH == "master" ]]; then
  # setup git stuff
  git config user.name 'Tylor Steinberger';
  gitconfig user.email 'tlsteinberger167@gmail.com';
  git remote set-url origin https://$GH_TOKEN@github.com/northbrookjs/northbrook;

  bash ./npm-login.sh

  # build library
  npm run build;

  # run deployment
  npm run release;
fi
