### namespace related commands

```bash

# get list of namespaces
> kubectl get namespaces

```

### pod related commands

```bash

# get the list of pods
> kubectl get pods

# create a pod
> kubectl create -f <name of the yaml file>

# get information of the selected pod
> kubectl describe <kind> <object name>
> kubectl describe pod mypod

# remove the pod
> kubectl delete <kind> <object name>
> kubectl delete pod mypod

```

### replica set

```bash

# get list of replica sets
> kubectl get replicasets
> kubectl get rs

# create a replica set
> kubectl create -f <name of the yaml file>

# update the configuration
> kubectl apply -f <name of the yaml file>

# delete replica set
> kubectl delete replicatset <replica set name>
> kubectl delete rs <replica set name>

```

### replication controller

```bash

# get list of replica sets
> kubectl get replicationcontroller
> kubectl get rc

# create a replica set
> kubectl create -f <name of the yaml file>

# update the configuration
> kubectl apply -f <name of the yaml file>

# delete replica set
> kubectl delete replicationcontroller <replica set name>
> kubectl delete rc <replica set name>

```
