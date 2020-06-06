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

more details are available here https://docs.docker.com/engine/install/ubuntu/

2- download dashClientImage docker image from the docker hub

docker pull aljoby/selenium_docker_new:dashClientImage

3- After pulling the image, you can check it out in your machine with this command: docker images, then you should see

aljoby/selenium_docker_new.   dashClientImage.  9f16ef5e64e6.  2 months ago.  1.25GB


4- Before you run an instance of docker image (i.e, container), recall you have to specify data to be used by the container and to get the data generated by it, hence "mount volume" technique managed by docker can do that, so use flag -v to mount a directory in the host machine to a container. Example, use -v /home/walid/test/containers/container-data1:/usr/src/app, where /home/walid/test/containers/container-data1 is host directory and /usr/src/app is default contain directory. 
This dashClient image needs an input of DASH server URL, client's virtual dispaly, type of bowser, and others of interest. Input is defined in "example.py". It also needs to wite output information of the dashClient such as logs about streaming, Output is defined under directory "chrome_user_dir_real". 
Thus, in the host directory /home/walid/test/containers/container-data1 the input "example.py" should be available to read from, and output empty output directory "chrome_user_dir_real" should be available to write to.
 
5- Run the docker image 

sudo docker run --privileged -p 4000:4000 -v /home/walid/test/containers/container-data1:/usr/src/app -t aljoby/selenium_docker_new


Second: Setup DASH server

The setup of DASH server is like to any Apache web server. Make sure Apache web server by command: service apache2 status, if it is running, then replace default /var/www/html directory by "html" in this repository. This diretory is prepared of dash.js client player, associated streaming techniques, metrics and logs. Also, video segments to be streamed are by default stored in /var/www/html/t1 directory.

Another way to Setup DASH server is here 
https://www.instructables.com/id/Making-Your-Own-Simple-DASH-MPEG-Server-Windows-10/


Then, you are ready to start video streaming between the client and the server
