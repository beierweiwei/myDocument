## How to Install Nginx on CentOS 7

Prerequisites:
A CentOS 7 Server Minimal Install
A RHEL 7 Server Minimal Install
A CentOS/RHEL 7 system with static IP

1. First update the system software packages to the latest version.
`# yum -y update`
2. Next, install Nginx HTTP server from the EPEL repository using the YUM package manager as follows.
```bash 
# yum install epel-release
# yum install nginx
```
## Manage Nginx HTTP Server on CentOS 7 

3. Once Nginx web server installed, you can start it first time and enable it to start automatically at system boot.
```bash
# systemctl start nginx
# systemctl enable nginx
# systemctl status nginx
```
## Configure firewalld to Allow Nginx Traffic 
4. By default, CentOS 7 built-in firewall is set to block Nginx traffic. To allow web traffic on Nginx, update the system firewall rules to permit inbound packets on HTTP and HTTPS using the commands below.

```bash 
# firewall-cmd --zone=public --permanent --add-service=http
# firewall-cmd --zone=public --permanent --add-service=https
# firewall-cmd --reload
```
## Test Nginx Server on CentOS 7 
```bash 
http://SERVER_DOMAIN_NAME_OR_IP 
```
## Nginx Important Files and Directories
* The default server root directory (top level directory containing configuration files): /etc/nginx.
* The main Nginx configuration file: /etc/nginx/nginx.conf.
* Server block (virtual hosts) configurations can be added in: /etc/nginx/conf.d.
* The default server document root directory (contains web files): /usr/share/nginx/html.