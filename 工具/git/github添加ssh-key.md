# github添加ssh key

添加SSH密钥到GitHub

## Step 1、检查本机现有的SSH密钥

检查`~/.ssh`看看是否有名为`d_rsa.pub  `和`id_dsa.pub`的2个文件。如果你什么都没得到这些文件，转到  步骤2 ;否则，请跳到  第3步。

打开你的Git Bash，输入：

    $ ls -al ~/.ssh

## Step 2、创建一个新的SSH密钥

注意期间“输入密码（空没有密码）：再次输入密码]：[键入密码]＃再次输入相同的密码”，如下：

“Enter passphrase (empty for no passphrase): [Type a passphrase] # Enter same passphrase again:”
可不管，直接一路ENTER。

    $ ssh-keygen -t rsa -C "注册Github用的邮箱"  
    $ ssh-keygen -t rsa -C "注册Github用的邮箱"

Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/UsersName/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/UsersName/.ssh/id_rsa.
Your public key has been saved in /c/Users/UsersName/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:rwuerTS5wjzt86GtvvVt0jwm5nquIJWpdXt+kw2exYU 注册Github用的邮箱
The key's randomart image is:
    +---[RSA 2048]----+
    | |
    | |
    | . |
    | o E .|
    | = S . . |
    | + o o . o |
    | oo.* + o+ * |
    | =+o@ *=.% . |
    | =@*OO=*.o |
    +----[SHA256]-----+

现在你的公钥已经保存在/c/Users/you/.ssh/id_rsa.pub中。

如果以上“ssh-keygen 生成一个公钥私钥”的过程中选择设置了密码，及可通过“ssh-add”来实现ssh免密码登陆。（详情可参照“[ssh-agent用法](https://www.2cto.com/os/201505/397009.html)”）

添加新的SSh密钥到ssh-keyen中：

$ eval "$ (ssh-agent -s)"  #ssh-agent启动之后，如果通过公钥做身份验证，只需第一次输入密码，以后ssh-agent会帮你自动输入。

## Step 3、将你的SSH key添加到GitHub

运行以下代码复制id_rsa.pub到剪切板：

    $ clip < ~/.ssh/id_rsa.pub
或

手动复制 ~/.ssh文件夹下的id_rsa.pub。

现在将其添加到GitHub上（参考GitHub官网教程“Adding a new SSH key to your GitHub account”）：

在页面的用户栏的右上角，单击  Settings ；

在左侧边栏点击 SSH and GPG keys.；

点击   New SSH key ；

在Title标题区域中，为新的SSH密钥添加一个描述性标签。例如，如果您使用的是个人的PC，您可以调用这个关键的“Personal MacBook Air”；
粘贴您的钥匙插入 Key 区域中；

点击  Add SSH key ；

确认通过输入操作GitHub的密码。

## Step 4、测试SSH key是否成功的添加到GitHub

    $ ssh -T git@github.com # 用 ssh 连接 github
    $ ssh -T git@github.com

中途会有如下提示，选择yes即可：
Are you sure you want to continue connecting (yes/no)? yes