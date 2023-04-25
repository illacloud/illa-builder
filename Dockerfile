# ------------------
# build illa-fontend
FROM node:18-bullseye as builder-for-frontend

## clone frontend
WORKDIR /opt/illa/illa-builder-frontend
RUN cd /opt/illa/illa-builder-frontend
RUN pwd

COPY ./ ./
ARG BUILDER_ENV=production
ENV ILLA_APP_ENV ${BUILDER_ENV}
ARG GOOGLE_MAP_KEY=key
ENV ILLA_GOOGLE_MAP_KEY ${GOOGLE_MAP_KEY}
ARG MIXPANEL_API_KEY=0
ENV ILLA_MIXPANEL_API_KEY ${MIXPANEL_API_KEY}
ARG SENTRY_AUTH_TOKEN=0
ENV ILLA_SENTRY_AUTH_TOKEN ${SENTRY_AUTH_TOKEN}
RUN npm install -g pnpm@8.3.1
RUN whereis pnpm
RUN whereis node

## build

RUN pnpm install
RUN pnpm build-cloud


# -------------------
# build runner images
FROM nginx:stable-alpine as runner
RUN ls -alh /etc/nginx/

RUN apk add --no-cache \
    bash \
    sed 


## copy frontend
COPY nginx.conf /etc/nginx/nginx.conf
COPY illa-builder-frontend.conf /etc/nginx/conf.d/illa-builder-frontend.conf
COPY --from=builder-for-frontend /opt/illa/illa-builder-frontend/apps/builder/dist/index.html /opt/illa/illa-builder-frontend/index.html
COPY --from=builder-for-frontend /opt/illa/illa-builder-frontend/apps/builder/dist/assets /opt/illa/illa-builder-frontend/assets
RUN rm /etc/nginx/conf.d/default.conf

# test nginx
RUN nginx -t



RUN ls -alh /opt/illa/illa-builder-frontend/

## add main scripts
COPY illa-builder-frontend-main.sh /opt/illa/
COPY illa-builder-frontend-config-init.sh /opt/illa/
RUN chmod +x /opt/illa/illa-builder-frontend-main.sh 
RUN chmod +x /opt/illa/illa-builder-frontend-config-init.sh

# HEALTHCHECK --interval=5s --timeout=3s CMD curl -fs http://127.0.0.1:80/status?src=docker_health_check -H"Host:localhost" || exit 1

# run
EXPOSE 80
CMD ["/opt/illa/illa-builder-frontend-main.sh"]
