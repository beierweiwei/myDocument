# 将多次commit合并，只保留一次提交历史

## 1.首先使用git log查看一下提交历史

```shell
[demo@ubuntu1204:zh_cn(bugfix/ycs-MOS-1503-notify-template-table-center)]$ git log
commit 5e187c7dbe84af67ad19823a54f3cc3e3f6d6940
Author: yangcs2009 <yangchangsheng@meituan.com>
Date:   Thu Jul 30 20:48:15 2015 +0800
 
    add center style indent
 
commit 6d577eb344080d7e3593733ac8dcb622de22b492
Author: yangcs2009 <yangchangsheng@meituan.com>
Rebasing (4/4)
Date:   Thu Jul 30 20:30:20 2015 +0800
 
    add center style
 
commit f9b9508a3ab634f8c8a2d28ab844a3a87d8e30ab
Author: yangcs2009 <yangchangsheng@meituan.com>
Date:   Thu Jul 30 20:16:35 2015 +0800
 
    add center style
 
commit 111ab9cc26101f7c6972de3dccfef2836a95efe0
Author: yangcs2009 <yangchangsheng@meituan.com>
Date:   Thu Jul 30 18:57:46 2015 +0800
 
    update templates
```

这样在git中看到的是4次提交，有点冗余，需要做的是将4次commit合并为一次

## 2. git 压缩  git rebase -i HEAD~4
该命令执行后，会弹出一个编辑窗口，4次提交的commit倒序排列，最上面的是最早的提交，最下面的是最近一次提交。
```
pick 5e187c7dbe8    add center style indent
pick 6d577eb3440    add center style
pick f9b9508a3ab    add center style
pick 111ab9cc261    update templates
# Rebase 150a643..2fad1ae onto 150a643
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
pick 5e187c7dbe8    add center style indent
squash 6d577eb3440  add center style
squash f9b9508a3ab  add center style
squash 111ab9cc261  update templates
# Rebase 150a643..2fad1ae onto 150a643
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

修改第2-4行的第一个单词pick为squash，当然看一下里面的注释就理解含义了。
然后保存退出，git会压缩提交历史，如果有冲突，需要修改，修改的时候要注意，保留最新的历史，不然我们的修改就丢弃了。修改以后要记得敲下面的命令：
```shell
git add .
git rebase --continue
```

如果你想放弃这次压缩的话，执行以下命令：

```shell
git rebase --abort
```

如果没有冲突，或者冲突已经解决，则会出现如下的编辑窗口：

```
# This is a combination of 4 commits.
# The first commit’s message is:
add center style indent
 
# The 2nd commit’s message is:
add center style
 
# The 3rd commit’s message is:
add center style
 
# The 4th commit’s message is:
update templates
 
# Please enter the commit message for your changes. Lines starting
# with ‘#’ will be ignored, and an empty message aborts the commit.
```

3.同步到远程git仓库
不过此时远程的信息仍未改变，下面操作会把修改同步到远程git仓库
``` 
[demo@ubuntu1204:zh_cn(bugfix/ycs-MOS-1503-notify-template-table-center)]$ git push -f
Enter passphrase for key '/home/demo/.ssh/id_rsa':
Counting objects: 1, done.
Writing objects: 100% (1/1), 223 bytes | 0 bytes/s, done.
Total 1 (delta 0), reused 0 (delta 0)
remote:
remote: View pull request for bugfix/ycs-MOS-1503-notify-template-table-center => release/1.1.3:
remote:   http://git.sankuai.com/projects/SA/repos/cloud/pull-requests/1042
remote:
To ssh://git@git.sankuai.com/sa/cloud.git
 + 5e187c7...8d26431 bugfix/ycs-MOS-1503-notify-template-table-center -> bugfix/ycs-MOS-1503-notify-template-table-center (forced update)
```
4.查看远程git仓库效果
