FROM node:lts-alpine3.12

# PLEASE UPDATE TO UNIQUE UID/GID FOR EACH PROJECT
ENV HOME=/app-root
ENV APP_UID=1879
ENV APP_USERNAME=container-user
ENV APP_GID=1879
ENV APP_GROUPNAME=container-group

WORKDIR ${HOME}

# Update
RUN apk update upgrade 
RUN apk --no-cache add curl
RUN apk add --upgrade apk-tools && apk upgrade --available

# Set timezone to Singapore
RUN apk add tzdata

# Add Default Application User
RUN addgroup -g ${APP_GID} ${APP_GROUPNAME} && \
    adduser -S -u ${APP_UID} -h ${HOME} -s /sbin/nologin -G ${APP_GROUPNAME} ${APP_USERNAME}

COPY ./container-fix-permission /usr/local/bin/container-fix-permission
COPY . ${HOME}
RUN rm container-fix-permission

# Fix permission for HOME and certificate location
RUN chown ${APP_UID}:${APP_GID} /usr/local/bin/container-fix-permission && \
    chmod og+rwx /usr/local/bin/container-fix-permission && \
    chown -R ${APP_UID}:${APP_GID} ${HOME} && \
    chmod -R og+rwx ${HOME} && \
    chmod -R 0777 /tmp

# Clear cache
RUN rm -rf /var/cache/apk/*

######### This may needs to be used in subsequent Dockerfile to run as non-root #########
######### Layer to fix permission for non-root https://github.com/sclorg/s2i-base-container/blob/master/bin/fix-permissions. #########
# You can add additional folders to fix-permission. e.g. 'RUN container-fix-permission "/{your-folder1} /{your-folder2}"'
RUN container-fix-permission > /dev/null
USER ${APP_UID}

RUN npm install

EXPOSE 8080 8888 9000

CMD ["npm", "run", "live"]