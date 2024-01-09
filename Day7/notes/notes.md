### basic commands

```bash

# check the docker version
> docker version

# start the docker daemon on ubuntu
> sudo systemctl start dockerd

```

### image related commands

- contains the instructions to create container(s)
- collection of layers
- layer is having the instructions
- ways to create a new image
  - using a container
  - using a Dockerfile

```bash

# list all the images
> docker image ls

# pull an image from docker hub
> docker image pull <image name>
> docker image pull hello-world

# delete an image
> docker image rm <image name>
> docker image rm hello-world

# get image details
> docker image inspect <image name>
> docker image inspect hello-world

```

- download the images

```bash

# used to create the database container
> docker image pull mysql

# used to create container which will run backend / node application
> docker image pull node

# used to create a container for running react/frontend code
> docker image pull httpd

```

### containers

```bash

# list of the running containers
> docker container ls

# list of all the containers
> docker container ls -a

# create a container [container will not start/run]
> docker container create --name <container name> <image name>
> docker container create --name mycontainer hello-world

# start a container
> docker container start <container name> or <container id>
> docker container start mycontainer

# create and start [run] the container
> docker container run --name <container name> <image name>
> docker container run --name mycontainer hello-world

# create and start [run] the container in detached mode
# detached
# - the container starts running in the background
# - terminal shows the command prompt immediately
# - it does not capture the keyboard and the shell
> docker container run -d --name <container name> <image name>

# create and start [run] the container temporarily
# when the container stops, do not keep it on the machine
# when the cotnainer stops, remove it automatically
> docker container run --name <container name> --rm <image name>

# remove the container
> docker container rm <container name> or <container id>
> docker container rm mycontainer

# remove the container forcefully
# most of the times this parameter is needed to remove the running container
# --force does
# - stops the container (if it is running)
# - removes the container
> docker container rm --force <container name> or <container id>

# stop the container
> docker container stop <container name> or <container id>
> docker container stop server

# create a httpd container
> docker container run --name server httpd

# attach the container running in detached mode
> docker container attach <container name> or <container id>

# execute a command inside the container
> docker container exec <container name> or <container id> <command>
> docker container exec server date

# execute a command inside the container with shell
# - i: iteractive
# - t: terminal (teletype)
> docker container exec -it <container name> or <container id> bash / sh

# connect the container over a specififed port
# - i: iteractive
# - t: terminal (teletype)
# - d: detached
> docker container run -itd --name <container name> -p <local port>:<container port> <image name>
> docker container run -itd --name server -p 8000:80 httpd

> docker container exec -it server bash
> apt-get update
> apt-get install vim
> cd /usr/local/apache2/htdocs
> vim index.html
# press i
# change the contents
# escape :wq <enter>

# exit to the local shell
> exit

```
