## git settings

#### global

- the global settings in linux (ubuntu) are stored in
  - $HOME/.gitconfig

```bash

# get the global settings
> git config --global --list

# set the username
> git config --global user.name "amit"

# set the email
> git config --global user.email "amit.kulkarni@sunbeaminfo.com"

```

#### local settings

- the local settings are stored under the .git/config file in the respective repository

## terminologies

- repository

  - the directory having .git metadata directory
  - .git directory contains

    - config

      - all the local settings will be stored in this file
      - the following settings will override the global ones

        ```bash
            [user]
                name = "amit"
                email = "amit.kulkarni@sunbeaminfo.com"
        ```

    - HEAD

      - contains the hash of the head commit

    - description
      - more information about the current repository
      - it is not going to be used anywhere

## commands

```bash

# initialize a repository
> git init

# get the current status
> git status -s

# add the changes in the file(s) in staging area
> git add .

# commit the files (changes) to the repository
> git commit -m 'message here'

# restore the last version of a file from repository
# remove the unstaged changes
# before moving the chagnes to the staging area
> git checkout <file name>

```

#### resetting

- resetting/remove the chagnes from staging area
- types

  - soft reset

    - move the changes from staging area to the directory
    - simply removes the changes from the staging area
    - the moved changes from staging area are NOT lost

    - ```bash
      > git reset
      ```
    - now if you want to remove all the changes permenantly

    - ```bash
      > git checkout <file name>
      ```

  - hard reset

    - combination of git reset and git checkout
    - remove the changes from staging area and remove them permenantly
    - execute this command on your own risk :)

    - ```bash
      > git reset --hard
      ```

#### checkout

- used to
  - restore the previous version of a file
  - check out the branch chnages
  - used to restore the changes to the previous commit (for all the files)
  - to create a new branch and switch to the branch

#### branch

```bash

# list all the branches
> git branch

# create a new branch
# this command will not switch to b1 immediately
> git branch <branch name>
> git branch b1

# switch to branch
> git checkout <branch name>
> git checkout b1

# create and checkout at the same time
> git checkout -b <new branch>

# delete a branch
> git branch -d <branch name>
> git branch -d b1

```

- merging changes

  ```bash

    # merging changes from another branch to the current branch
    > git checkout <branch in which the changes from another branch need to be merge>
    > git merge <name of the branch from which the changes need to be merged>

  ```

  - e.g.

  ```bash

    # merge changes from even-number branch to master branch
    > git checkout master
    > git merge even-number

  ```

### Remote repositories

```bash

# print the remote repository connected with the current repository
> git remote -v

# add a remote repository for the current one
> git remote add origin https://github.com/pythoncpp/application3.git

# push your changes to the remote repository
> git push origin master

```
