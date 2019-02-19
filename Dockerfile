FROM jrottenberg/ffmpeg:3.3

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get install -y python \
    && apt-get install -y imagemagick \
    && apt-get install -y iputils-ping \
    && apt-get -y autoclean \
    && apt-get install -y apt-transport-https \
    && apt-get install -y build-essential \
    && apt-get install -y libssl-dev

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 8.9.4

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Add Yarn repository
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Install Yarn
RUN apt-get update && apt-get install yarn -y

RUN npm install -g forever
WORKDIR /root/assignment-3
COPY ./ ./
RUN yarn install
WORKDIR /root/assignment-3/bin
ENV NODE_ENV development
EXPOSE 3000

ENTRYPOINT [ ]
CMD forever -a -l ~/dev/null www