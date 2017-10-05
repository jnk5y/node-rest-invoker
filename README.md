# node-rest-invoke
* `git clone https://github.com/jnk5y/node-rest-invoker.git`
* Add your ssl certificates in the certs folder or use -v /etc/letsencrypt:/usr/src/app/certs:Z on your docker run command
* Update the index.js file to point to your certs
* Add trigger scripts to the node-rest-scripts folder or use -v command in the docker run call below to use a folder from outside of your docker container. This is helpful because you can add/modify scripts without having to restart your REST server.
* To build - `docker build -t node-rest-image .`
* To run - `docker run -e USERNAME=YOURUSERNAME -e PASSWORD=YOURPASSWORD -it --rm -p 8888:8888 -v /path/to/your/triggers/folder:/usr/src/app/node-rest-scripts:Z --name node-rest-container node-rest-image`
* If everything is working you should be able use a REST client to visit https://localhost.com:8888/trigger/action adding your username and password to the authentication header and you'll get an Authorized message. If you use the wrong username or password you will get Not Authorized!
* Now you can go to IFTTT maker platform https://platform.ifttt.com/maker/ and create an applet that uses a webhook to make the GET call to your REST server. The front end can be your choice (Google Assistant, Amazon Echo...) to link to the webhook.

Thanks to:
Shane Rowley - https://github.com/smrowley
