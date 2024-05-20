# -------------------
# build runner images
FROM nginx:stable-alpine as runner
RUN ls -alh /etc/nginx/

RUN apk add --no-cache \
    bash \
    sed


## copy frontend
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./apps/builder/dist /opt/illa/illa-builder-frontend

# test nginx
RUN nginx -t

# HEALTHCHECK --interval=5s --timeout=3s CMD curl -fs http://127.0.0.1:80/status?src=docker_health_check -H"Host:localhost" || exit 1

# run
EXPOSE 80
