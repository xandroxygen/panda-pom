# get provided version or exit
version=$1
if [[ -z $version ]]; then
  echo "Version required"
  echo "Usage: $0 <version>"
  exit 1
fi

# build site for github pages
yarn build:github

# copy files to /docs for github pages
rm -rf ./docs/*
cp -R ./dist/* ./docs
touch ./docs/.nojekyll

# commit and tag changes
git add ./docs
git commit -qa --allow-empty -m "release $version"
git tag $version

# deploy new release
git push origin $version
git push