FROM nginx
# This Nginx config ensures nginx listens on port 8080. Google App Engine expects
# the runtime to respond to HTTP requests at port 8080.
COPY nginx.conf /etc/nginx/nginx.conf

# # create log dir configured in nginx.conf
RUN mkdir -p /var/log/app_engine

# # For App Engine deployment
# RUN mkdir -p /usr/share/nginx/www/_ah && \
#     echo "healthy" > /usr/share/nginx/www/_ah/health

# Finally, all static assets.
ADD ./build  /usr/share/nginx/www/
RUN chmod -R a+r /usr/share/nginx/www

EXPOSE 8080