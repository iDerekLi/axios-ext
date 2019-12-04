#!/usr/bin/env sh
set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # build
  npm version $VERSION --no-git-tag-version
  VERSION=$VERSION npm run build:lib

  # commit
  git add .
  git tag v$VERSION
  git commit -am "build: release $VERSION"

  # publish
  git push origin dev
  git push origin refs/tags/v$VERSION

  if [[ $VERSION =~ [beta] ]]
  then
    npm publish --tag beta
  else
    npm publish
  fi
fi
