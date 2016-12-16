#!/bin/bash
# Set up git configs and install pre-commit hook.
set -e

if [ -z "`git config --global --get push.default`" ]; then
    git config --global push.default current
    echo "Updated Git config push.default"
fi

if [ -z "`git config --global --get user.name`" ]; then
    echo -n "Enter your name: "
    read name
    echo "Updated Git name: $name"
    git config --global user.name "$name"
fi

if [ -z "`git config --global --get user.email`" ]; then
    echo -n "Enter your GitHub email: "
    read email
    echo "Updated GitHub email: $email"
    git config --global user.email "$email"
fi

# Copy pre-commit hooks
echo "Update commit hooks"
cp -f pre-commit .git/hooks/pre-commit
