# node-rest-invoke
* `git clone https://github.com/jnk5y/node-rest-invoker.git`
* cd into node-rest-invoker and run `bash ./make-root-ca-and-certificates.sh localhost` and this will create a certs folder with your root keys and certs - from https://git.daplie.com/Daplie/nodejs-self-signed-certificate-example
* Update index.js username and password to whatever you want and modify the routes to call the scripts you want to call
* Add scripts to scripts folder
* To build - `docker build -t node-rest-image .`
* To run - `docker run -e pass=YOURPASSWORDHERE -it --rm -p 8888:8888 --name node-rest-container node-rest-image`
* If everything is working you should be able to visit https://username:password@localhost.com:8888/trigger/action and you'll get an Authorized message. If you use the wrong username:password you will get Not Authorized!
