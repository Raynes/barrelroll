#!/usr/bin/env bash

FILENAME="atom-shell-v0.21.2-$(uname -s | tr '[:upper:]' '[:lower:]')-x64.zip"

if [ 'Darwin' == $(uname -s) ]
  then
    DL_URL='https://github.com/atom/atom-shell/releases/download/v0.21.2/atom-shell-v0.21.2-darwin-x64.zip'
  else
    DL_URL='https://github.com/atom/atom-shell/releases/download/v0.21.2/atom-shell-v0.21.2-linux-x64.zip'
fi

echo "Downloading $DL_URL..."
wget $DL_URL

echo "Unzipping $FILENAME to ./atom-shell..."

unzip $FILENAME -d atom-shell/

echo "Deleting $FILENAME..."

rm $FILENAME
