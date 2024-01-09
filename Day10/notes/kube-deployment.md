## run your website inside kubernetes

- make your application containerized

  - make sure that your website is running inside a container
  - to run the application inside the container

    - create a docker image with following Dockerfile

    ```dockerfile

        # use httpd as base image
        FROM httpd

        # copy the index file to htdocs
        COPY index.html /usr/local/apache2/htdocs/

        # expose port 80
        EXPOSE 80

    ```

    - build image

    ```bash

    > docker image build -t mywebsite .

    ```

    - create a container using the image

    ```bash

    # create container to test the website
    > docker container run -itd --name website -p 8000:80 mywebsite

    ```

- run the application inside kubernetes cluster

  - to create the pod your docker image must be avaiable inside docker hub
  - to push your image to docker hub

    - create an account on docker hub

      - visit: https://hub.docker.com

    - login with the new account created

      ```bash

      # login with new account
      > docker login

      ```

    - tag the image with your account

      ```bash
      > docker image tag <image name> <account name>/<image name>
      > docker image tag mywebsite amitksunbeam/mywebsite
      ```

    - push the image to the docker hub

      ```bash
      > docker image push <account name>/<image name>
      > docker image push amitksunbeam/mywebsite
      ```

- create a replica set to run multiple pods

  ```yaml
  apiVersion: apps/v1
  kind: ReplicaSet
  metadata:
  name: rs-mywebsite
  spec:
  replicas: 5
  selector:
    matchLabels:
    app: mywebsite
  template:
    metadata:
    name: mywebsite
    labels:
      app: mywebsite
    spec:
    containers:
      - name: mywebsite-container
        image: amitksunbeam/mywebsite
        ports:
          - containerPort: 80
            protocol: TCP
  ```

- create a service to make the website available outside of the cluster

  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: mywebsite-service
  spec:
    type: NodePort
    selector:
      app: mywebsite
    ports:
      - port: 80
  ```

- make the service accessible outside of minikube

  ```bash

  > minikube service mywebsite-service --url

  ```

- visit the url given by minikube service command

- be happy :)
