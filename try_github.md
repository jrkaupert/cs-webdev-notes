# Git Init #
`git init` command is used to initialize a git repository

# Git Status #
`git status` command is used to determine current state of repository, see
changes, etc...

# Git Add #
`git add` command is used to add files to be tracked in the repository

`git add '*.txt'` can be used to add all .txt files

# Git Commit #
`git commit -m "commit message"` command used to commit files in the staging
area into the repository, including a commit message of changes

# Git Log #
`git log` command used to show log of commit history

# Git Remote Add #
`git remote add origin https://github.com/repo-name` command adds remote
repository, given remote name and repository URL

# Git Push #
`git push -u origin master` command pushes to remote "origin" and default
local branch named *master*.  -u saves the parameters for the future

# Git Pull #
`git pull origin master` command pulls new changes from remote repository

# Git Diff #
`git diff HEAD` command performs diff against most recent commit.  HEAD is a
pointer to that commit. Can use `git diff --staged` to see staged changes

# Git Reset #
`git reset` command can be used to unstage files

# Git Checkout #
`git checkout -- <target>` can be used to change files back to how they were
at last commit.  Can be used to checkout a branch as well. Checkout *master*
branch before merging other branches in

# Git Branch #
`git branch <branchname>` command is used to create a new branch for code.
`git branch` can be used without a target to list available branches.
`git branch -d <branchname>` can be used to delete a branch

# Git Remove #
`git rm '*.txt'` can be used to remove .txt files from disk and stage removal
of those files

# Git Merge #
`git merge <branchname>` can be used when *master* branch is checked out to
merge changes into *master* branch
