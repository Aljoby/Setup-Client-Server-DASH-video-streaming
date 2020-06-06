# Setup-Client-Server-DASH-video-streaming

Steps to setup a DASH client in a Docker Container for downloading video segments from DASH server. 

First: Setup DASH client in a Docker Container

1- Install docker engine into your machine

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce
sudo apt-cache policy docker-ce


2- download DASH_client docker image from the docker hub

docker pull aljoby/selenium_docker_new:dashClientImage

3- After pulling the image, you can check it out in your machine with this command: docker images, then you should see

aljoby/selenium_docker_new   dashClientImage     9f16ef5e64e6        2 months ago        1.25GB


4- Load the docker image into your machine

sudo docker load < selenium_docker.tar

5- Run the docker image 

sudo docker run --privileged -p 4000:4000 -v /home/wf/Desktop/docker/dockerImage/container-data:/usr/src/app -t selenium_docker


Second: Setup DASH server




Finally: Start video streaming between the client and the server
