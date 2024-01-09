```bash

# create a httpd
> docker container run -itd --name server -p 8000:80 httpd

# connect to the container's shell
> docker container exec -it server bash

```

### Dockerfile

- text document which contains the docker instructions to build an image
- commands

  - FROM

    - used to select the base image
    - the base image acts as a platform on which we can put some commands to build our own image
    - e.g. FROM httpd

  - COPY

    - used to copy a file or directory from local machine to docker image
    - the first param is the path from local machine
    - the second param is the path in the docker image
    - e.g. COPY index.html /usr/local/apache2/htdocs/
      - copies the index.html file from current directory to image's /usr/local/apache2/htdocs/ directory

  - CMD

    - used to specify the command which needs to be executed right after the container gets created
    - the container will be responsible for running (only) this job
    - e.g. CMD node server.js
      - when the container starts, it starts executing this command
      - for some reason if this command fails, the container gets exited

  - WORKDIR

    - used to set the current directory for the image
    - e.g. WORKDIR /app

  - EXPOSE

    - used to expose or open a port from container
    - this port number is used for port forwarding
    - e.g. EXPOSE 3000

  - ENV
    - used to set environment variable
    - this variable will be passed to your application when image gets created
    - e.g. ENV MYSQL_DATABASE mydb

- commands

```bash

# build a docker image
# execute this command from the directory where Dockerfile exists
# -t: tag (docker image name)
# . : the Dockerfile exists in the current directory
> docker image build -t myimage .

# check the logs of the selected container
> docker container logs -f <container id> or <container name>

# remove the anonymous images
> docker image prune

```

## Docker Swarm

- initialize and remove the swarm

```bash

# get the ip address on windows
> ipconfig

# get the ip address on linux or mac
> ifconfig

# get the information about the swarm mode
> docker info

# start the swarm mode
> docker swarm init --advertise-addr <ip address of manager>
> docker swarm init --advertise-addr 127.0.0.1

# stop/remove the node from the swarm
> docker swarm leave --force

```

- commands releated nodes in docker swarm

```bash

# get the list of nodes
> docker node ls

# get information about a node
> docker node inspect <node id>

# remove a node (worker)
> docker node rm <node id>

```

- commands related to the service

```bash

# get the list of services
> docker service ls

# start a service
> docker service create --name <service name> <image name>
> docker service create --name mysevice httpd

# start a service with multple container (desired state = 5)
> docker service create --replicas 5 --name myservice httpd

# get the list of processes / containers running for a service
> docker serivce ps <service name> or <service id>

# get all the information about the service
> docker service inspect <service id> or <service name>

# remove a service
> docker service rm  <service id> or <service name>

# scaling a service
> docker service scale <service name> = <new desired state>

```
