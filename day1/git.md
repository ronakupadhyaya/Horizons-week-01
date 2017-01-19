# Git Overview

## What is Git
Git is a tool used for collaborating on text files (i.e. source code) by keeping track of all changes. All of the information for the repository (commit history) is stored in a folder named `.git` at the root of your project. A git repository can be hosted on your local computer or even online (i.e. on Github).

## Glossary
- **Repository**: a Git project
- **Branch**: a workspace within a project, allows independent work
- **Commit**: Git tracks the history of a projects as a series of commits. A single commit is a group of changes to files in the repository.

# Inline Exercise: Setting up Git and GitHub

## Goal

The goal of this exercise to get setup with Git and GitHub. You need Git and GitHub to access Horizons course materials and share your work with us.

## Mac Instructions

1. Open your Terminal, it's located in `/Applications/Utilities/Terminal.app`
1. [Download and install Git for Mac](https://git-scm.com/download/mac)
1. [Create a new SSH key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#platform-mac)
1. [Add the SSH key to your GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/#platform-mac)

## Windows Instructions

1. [Download and install Git for Windows](https://git-for-windows.github.io/)
1. Open Git Bash
1. [Create a new SSH key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#platform-windows)
1. [Add the SSH key to your GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/#platform-windows)

## Getting Started with Git

1. Create a new directory for Horizons course material.

  ```bash
  mkdir horizons
  cd horizons
  ```

1. Clone the `week01` repository

  ```bash
  git clone git@github.com:horizons-school-of-technology/week01.git
  ```

  This creates a local version of the `week01` course material for you to work on.
  ![git clone](./img/git_clone.png)

1. Change working directory into `week01`

  ```bash
  cd week01
  ```
cd week01
1. Create your own branch. We suggest using your Github username as the branch name.

  ```bash
  git checkout -b your-branch-name-here
  ```

  Creating a branch with your name allows you to make your own changes, and submit them without interfering with anyone else's code.
  ![git checkout image](./img/git_checkout.png)

1. Set-up your Git environment

  ```bash
  ./setup.sh
  ```

1. Push your branch to GitHub

  ```bash
  git push -u origin
  ```

1. Open `week01/day1/git.html` and note that there is a failing test.

1. Open `week01/day1/git.js` and fix the code by deleting the appropriate line.

1. Refresh `week01/day1/git.html` in your browser and make sure the test is passing.

1. Check updated files. Note that even though you have saved your files in Atom, the files have not been saved to git yet. You can see this by running the following command.

  ```bash
  git status
  ```

  This will display the files that have been modified.
  ![git status modified image](./img/git_status_modified.png)

1. Commit your changes. By doing this you will save your changes to git.

  ```bash
  git commit -am "Fix code"
  ```

  Locally saves the changes you made to `week01/day1/git.js` and titles the commit 'Fix Code'

1. Check that your repository is clean (i.e. all of your changes have been saved to git).

  ```bash
  git status
  ```

  This is a good way to check whether or not all of your changes have been committed.
  ![git status no modifications image](./img/git_status_not_modified.png)

1. Push your changes again

  ```bash
  git push origin
  ```
  ![git push to origin image](./img/git_push.png)

  Allows you to store your changes on the Horizons Github Repo (origin). This will make your work public and accessible via Github.

1. Now visit the [week01 repository on Github](https://github.com/horizons-school-of-technology/week01), you will notice that there is a banner with your branch name. Our sample branch is named `horizons-instructor`, your branch will have a different name.
![git_new_branch_github](./img/git_new_branch_github.png)

1. If you click on the button titled `Branch: master` it shows all branches in this repository. In this case you will see the branches created by fellow students (including yours).
![git_branch_dropdown](./img/git_branch_dropdown.png)

Congratulations! You're ready to complete Horizons exercises.

## Retrieving changes to updated exercises
We will often make changes to exercises after you have cloned (downloaded) them. To retrieve the latest changes made to any repository, follow these steps:

1. Make sure your branch is clean (all changes have been committed). Run the `git status` command, and make sure it says `nothing to commit, working directory clean`

  ```bash
  $ git status
  On branch [your-branch-name-here]
  Your branch is up-to-date with 'origin/[your-branch-name-here]'.
  nothing to commit, working directory clean
  ```

1. If your branch is not clean, then commit and push your changes.

  ```bash
  $ git commit -am "your commit message here"
  $ git push origin
  ```

1. Switch to the `master` branch.

  ```bash
  git checkout master
  ```

1. Retrieve the latest version of `master` from Github.

  ```bash
  git pull origin
  ```

1. Switch back to your own branch.

  ```bash
  git checkout your-branch-name-here
  ```

1. Merge the changes from `master` into your own branch.

  ```bash
  git merge master
  ```

## Git Commands
We interact with Git using the command line. Here are some of the most frequently used commands:

### `git clone`
Copies a Remote Git Repository to your local machine.

### `git checkout`
Creates a new branch. A branch is a copy of your code that you can modify without affecting the original. You will use branches to keep track of your own work keeping it separate from your peers.

### `git status`
Allows you to see any/all changes made to the project.

### `git commit`
Whenever a file has been changed you have to *commit* it. A commit saves the changes made to the file (locally), along with information like:
- Name of User that changed file
- Time of the change
- An ID unique to each commit
- A small description of the changes made
- Number of lines changed
- List of files updated

### `git push`
Saves your commits to the remote repository.

### `git pull`
Downloads changes from a remote branch to a local branch.

### `git stash`
Temporarily saves changes made to the project, and resets to the last commit. Changes can be reapplied at any time using `git stash pop`.

## Git Troubleshooting
Here are some common git errors you may run in to. If your error is not found in this guide please feel free to ask an instructor for assistance.

### `no changes added to commit`
This means that you forgot to include `-a` when running `git commit`.

  ```bash
  git commit -am "commit-message-here"
  ```

### `Please enter the commit message for your changes.`
If this message shows up then you forgot to include `-m` when running `git commit`. To fix this issue and go back to your terminal follow the steps corresponding to your OS.

#### Mac
An instance of either Nano or Vi will open on your terminal. To exit Nano enter the command <kbd>ctrl</kbd>+<kbd>x</kbd>. To exit Vi enter the command <kbd>shift</kbd>+<kbd>z</kbd> twice.

#### Windows
You should see an instance of Notepad open on your screen. Close this window and type the correct command.

  ```bash
  git commit -am "commit-message-here"
  ```

### `You cannot commit to 'master' in this repository.`
This message shows up when you are making changes to the master branch rather than using your own branch. To fix this follow these commands:

1. Use the `git stash` command to put aside your changes temporarily. This will hide your changes from git, and can be accessed at a later time.

  ```bash
  git stash
  ```

1. Switch to your own branch.

  ```bash
  git checkout your-branch-name-here
  ```

1. Bring back your hidden changes that were stashed in Step 1 to the current branch.

  ```bash
  git stash pop
  ```

1. Commit your changes.

  ```bash
  git commit -am "commit-message-here"
  ```
### `remote: error: GH006: Protected branch update failed for refs/heads/master.`
You may also see the following error message:
`! [remote rejected] master -> master (protected branch hook declined)`

This means that you have committed your changes to master instead of your own branch. Please ask an instructor to help move your commits to the correct place.
