#!/usr/bin/env zsh

# abort on errors
set -e

# build
# npm run build
yarn build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add --all
git commit -m 'deploy'
git branch -M main
git remote add origin https://github.com/ShabbirHasan1/shabbirhasan1.github.io.git
git push -u origin main

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -