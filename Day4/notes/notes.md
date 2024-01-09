- configuration

  - type: t2.micro
  - AMI: ubuntu 22.04
  - pem file: test-vm

- fix UNPROTECTED PRIVATE KEY FILE!

```bash

# change the permissions
> chmod 400 <pem file path>

# example
> chmod 400 ~/Downloads/test-vm.pem
```

- connect to the virtual machine

```bash
# command to connect to a virtual machine
> ssh -i <pem file path> ubuntu@<public ip address>

# example
> ssh -i ~/Downloads/test-vm.pem ubuntu@13.232.250.87

```

## prepare the machine to host react website

```bash

# update the system cache
> sudo apt-get update

# install apache
> sudo apt-get install apache2

# install mysql
> sudo apt-get install mysql-server

# install nodejs
> curl -sL https://deb.nodesource.com/setup_17.x -o nodesource_setup.sh
> sudo bash nodesource_setup.sh
> sudo apt-get update
> sudo apt-get install nodejs

```

- open port 80 from security settings
  - select the security tab
  - select security group
  - go to the inbound rules and click on the button "Edit inbound rules"
  - add a rule to open port 80 (http)
    - select Type as http (this will auto fill the port number with value 80)
    - select source to Anywhere-IPv4 (it will add 0.0.0.0/0)
  - click the button "Save rules"
