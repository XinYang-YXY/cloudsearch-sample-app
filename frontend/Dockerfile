FROM node:14.15.5-alpine3.13 as js-builder

WORKDIR /usr/src/app/

COPY package.json ./
COPY public public
COPY src src

ENV NODE_ENV production
ENV REACT_APP_BACKEND_API_URL https://cloudsearch-be.dev.e01.app.gov.sg
RUN env

# Build assets
RUN npm i
RUN npm run build

FROM bitnami/nginx

ENV NODE_ENV production

# Remove keys
USER 0
RUN rm /certs/server.key
USER 1001

COPY nginx.conf /opt/bitnami/nginx/conf/nginx.conf

# All static assets.
COPY --from=js-builder /usr/src/app/build /app

EXPOSE 8080