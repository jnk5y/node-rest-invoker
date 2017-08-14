# node-rest-invoke
* `git clone https://github.com/jnk5y/node-rest-invoker.git`
* cd into node-rest-invoker and run `bash ./make-root-ca-and-certificates.sh localhost` and this will create a certs folder with your root keys and certs - from https://git.daplie.com/Daplie/nodejs-self-signed-certificate-example
* Create a server key using the following command. `echo -n YOURPASSWORD | sha256sum | awk '{print $1}'` You will use this in the docker run call.
* Add trigger scripts to the node-rest-scripts folder or use -v command in the docker run call below to use a folder from outside of your docker container. This is helpful because you can add/modify scripts without having to restart your REST server.
* To build - `docker build -t node-rest-image .`
* To run - `docker run -e SERVER_KEY=YOURKEYFROMABOVE -it --rm -p 8888:8888 -v /path/to/your/triggers/folder:/usr/src/app/node-rest-scripts:Z --name node-rest-container node-rest-image`
* If everything is working you should be able to visit https://username:password@localhost.com:8888/trigger/action and you'll get an Authorized message. If you use the wrong username:password you will get Not Authorized!
* Now you can go to IFTTT maker platform https://platform.ifttt.com/maker/ and create an applet that uses a webhook to make the GET call to your REST server. The front end can be your choice (Google Assistant, Amazon Echo...) to link to the webhook.

Thanks to:
Shane Rowley - https://github.com/smrowley
