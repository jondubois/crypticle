# Crypticle

[![Join the chat at https://gitter.im/crypticle-io/community](https://badges.gitter.im/crypticle-io/community.svg)](https://gitter.im/crypticle-io/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## This project is in alpha and has not yet been battle-tested.

A multi-tenant off-chain payment microservice with support for transaction sharding. Crypticle lets users convert value between blockchain tokens and pegged credit which can be efficiently spent and/or transferred between accounts within the context of a centralized service/platform. The credit is entrusted to the service provider and is pegged to the value of the underlying blockchain tokens - This credit can be used to support an unlimited rate of off-chain transactions. Any unused credit can be converted back into trustless blockchain tokens at any time.

The goal of this project is to provide a fast, simple and scalable off-chain mechanism for spending and receiving blockchain tokens.
By reducing the friction involved in converting back and forth between trustless blockchain tokens and entrusted pegged credit, users can choose their level of risk exposure when it comes to their spending money.

Some potential use cases:

- Exchange
- Marketplace
- SaaS platform
- Game currency
- Centralized currency which is pegged to a cryptocurrency

After a Crypticle node has been attached to a specific Blockchain and has started accepting deposits from users, it becomes difficult for a Crypticle service provider to move away from that blockchain without violating the implicit agreement that they have with their users. Attaching services to a specific blockchain using Crypticle should therefore help to create sustainable demand for the underlying blockchain token.

## Setup

### Software requirements

- Node.js v11.13 or higher: https://nodejs.org/en/
- RethinkDB v2.3 or higher: https://rethinkdb.com/

### Run from source

- Launch the RethinkDB server in a separate terminal (e.g. using the `rethinkdb` command)
- `git clone git@github.com:SocketCluster/crypticle.git`
- `cd crypticle && npm install`
- `cd public && npm install ; cd ..`
- `cd blockchains && npm install ; cd ..`
- `npm start`

## Deploy and scale on Kubernetes from the command line

The service is designed to be deployed and scaled on a Kubernetes cluster.

### Software requirements

You will need the following software installed in order to deploy to a K8s cluster:
- Node.js version 11 or higher. [Download Node.js](https://nodejs.org/en/).
- `docker` CLI. [Install Docker](https://docs.docker.com/install/).
- `kubectl` CLI. [Install Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

- If using Rancher, you will need to install the Rancher server on a remote machine of your choice; you will then be able to create your cluster from the Rancher control panel. [Install Rancher](https://rancher.com/quick-start/).
- If using GKE, you will need the `gcloud` command from the Google Cloud SDK. [Install Google Cloud SDK](https://cloud.google.com/sdk/docs/quickstarts).

### Deployment steps

Once you have the required software, follow these steps to deploy Crypticle to a K8s cluster (this approach works best with [Rancher](https://rancher.com/)):

- Setup your Kubernetes cluster with multiple nodes on your provider (3 is ideal for testing).
- Get the `Kubeconfig` from your K8s control panel (or cloud provider) and paste it into the `~/.kube/config` file on your local machine (replace the whole file content).
- Open a new terminal window/tab to make sure that `kubectl` has the latest environment.
- Install the `crypticle` CLI tool with `npm install -g crypticle`.
- Create your project directory with `crypticle create myproject`.
- Navigate to your project directory with `cd myproject`.
- Make sure that your production config file (e.g. `blockchains/rise/config.prod.json` for a Rise project) contains the correct values; this config is the one which will be used by default in the K8s cluster.
- Upload configs to your K8s cluster using `kubectl create configmap crypticle-config --from-file=blockchains/rise/config.prod.json --from-file=blockchains/rise/config.dev.json` (replace `/rise/` with your blockchain name).
- Upload secrets to your K8s cluster with `kubectl create secret generic crypticle-secret --from-literal=SECRET_SIGNUP_KEY=313e7cc1-ad75-4030-a927-6a09f39c1603 --from-literal=AUTH_KEY=15d16361-6402-41a5-8840-d2a330b8ea40 --from-literal=STORAGE_ENCRYPTION_KEY=0111394e-3b3e-4eb3-9759-21741cf055c7 --from-literal=BLOCKCHAIN_WALLET_PASSPHRASE="drastic spot aerobic web wave tourist library first scout fatal inherit arrange"` (replace the values with your own).
- If your custom `adapter.js` file has any dependencies, make sure that they are all inside the `blockchains/node_modules/` directory (to allow them to build correctly).
- Use `crypticle deploy` to build your Docker image containing your custom adapter logic and your config files and then deploy it to your K8s cluster.
- To access the Crypticle app (after deployment has completed), use `kubectl describe ingress agc-ingress` to get ingress IP addresses; you can copy and paste any of them directly into your browser's address bar.

### GKE differences

- Before you execute any of the commands above, make sure that you have the `gcloud` command installed (see [quickstart guides](https://cloud.google.com/sdk/docs/quickstarts)). Check that `gcloud` is installed using the `gcloud -v` command (it should show you a list of version numbers).
- Create a K8s cluster from your GKE control panel.
- Once your cluster is ready, go to the `Clusters` section and click on the `Connect` button next to your cluster; then run the provided `gcloud container clusters ...` command in your terminal.
- Follow all the deployment steps from the section above with the following differences:
  - Skip the step where you need to set the `~/.kube/config` file content; the `gcloud` command above from GKE should take care of this automatically.
  - Instead of `crypticle deploy`, use `crypticle deploy --gke` (this will cause `.yaml` files from the `kubernetes/gke/` directory to override those in the main `kubernetes/` directory).
  - To access the Crypticle app (after deployment has completed), go to the `Services & Ingress` section and click on the link from the `ingress-nginx` service.

## Scaling on K8s

You can scale any `Deployment` or the RethinkDB `StatefulSet` using standard `kubectl scale ... --replicas=...` commands.
Be very careful when scaling down the RethinkDB `StatefulSet` as this may cause data loss if the underlying persistent volumes are removed.

## Sharding transaction processing in the database

The RethinkDB admin control panel lets you shard any table at the click of a button.
After you've scaled your `rethinkdb` service to multiple hosts, you will be able to increase the number of shards for the `Transaction` table.

## Contributions

This software is distributed under the `AGPL-3.0` license. You are free to use and distribute the code so long as the code which uses or is derived from this project is made public under the same license. If you want to make a contribution to Crypticle then you must grant the Crytpicle project owners the right to use and redistribute your contributed code, content or media under any license. In addition to the main `AGPL-3.0` license, the Crypticle project owners reserve the right to distribute Crypticle (along with contributions made by any third parties) under alternate licenses for commercial purposes.

## Enterprise licenses

If the terms of the `AGPL-3.0` license are not suitable for your use case, please contact a Crypticle project owner to discuss alternative options.
