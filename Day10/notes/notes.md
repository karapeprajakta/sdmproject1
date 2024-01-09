## minikube commands

```bash

# start the minikube cluster
> minikube start

# stop the minikube cluster
> minikube stop

# ssh into minikube
> minikube ssh

# create a service tunnel to access the nodeport service outside of minikube
> minikube service <service name> --url

```

## service

```bash

# get the list of services
> kubectl get service

# create a service
> kubectl create -f <file name>

# delete the service
> kubectl delete service <service name>
> kubectl delete service httpd-service

```
