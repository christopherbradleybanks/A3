#How To Build

**Development**

* run yarn / npm install to install dependencies in the project root
* run yarn / npm run start to start the application

**Docker**

* docker build -t a3-docker . 
* docker run --name a3 --rm -p 80:3000 -itd a3-docker 