#!/bin/bash

if [[ $TRAVIS_BRANCH == "master" ]]; then
  # setup git stuff
  git config user.name 'Tylor Steinberger';
  gitconfig user.email 'tlsteinberger167@gmail.com';
  git remote set-url origin https://$GH_TOKEN@github.com/northbrookjs/northbrook;

  # sign in to NPM to allow deployment
  npm adduser <<!
  $NPM_USERNAME
  $NPM_PASSWORD
  $NPM_EMAIL
  !;

  # build library
  npm run build;

  # run deployment
  npm run release;
fi
