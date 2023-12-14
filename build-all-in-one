#
# build illa-builder-backend & illa-builder-backend-ws
#

FROM --platform=$BUILDPLATFORM golang:1.20-bullseye as illa-builder-backend

## set env
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ARG TARGETPLATFORM
ARG BUILDPLATFORM
ARG TARGETARCH
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=${TARGETARCH}

## build
WORKDIR /opt/illa/illa-builder-backend
RUN cd  /opt/illa/illa-builder-backend
RUN ls -alh

ARG BE=main
RUN git clone -b ${BE} https://github.com/illacloud/builder-backend.git ./

RUN cat ./Makefile

RUN make all

RUN ls -alh ./bin/*



#
# build illa-supervisor-backend & illa-supervisor-backend-internal
#

FROM --platform=$BUILDPLATFORM golang:1.20-bullseye as illa-supervisor-backend

## set env
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ARG TARGETPLATFORM
ARG BUILDPLATFORM
ARG TARGETARCH

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=${TARGETARCH}

## build
WORKDIR /opt/illa/illa-supervisor-backend
RUN cd  /opt/illa/illa-supervisor-backend
RUN ls -alh

ARG SBE=main
RUN git clone -b ${SBE} https://github.com/illacloud/illa-supervisor-backend.git ./

RUN cat ./Makefile

RUN make all

RUN ls -alh ./bin/*


#
# build redis
#
FROM redis:6.2.7 as cache-redis

RUN ls -alh /usr/local/bin/redis*


#
# build minio
#
FROM minio/minio:edge as drive-minio

RUN ls -alh /opt/bin/minio

#
# build nginx
#
FROM nginx:1.24-bullseye as webserver-nginx

RUN ls -alh /usr/sbin/nginx; ls -alh /usr/lib/nginx; ls -alh /etc/nginx; ls -alh /usr/share/nginx;

#
# build envoy
#
FROM envoyproxy/envoy:v1.18.2 as ingress-envoy

RUN ls -alh /etc/envoy

RUN ls -alh /usr/local/bin/envoy*
RUN ls -alh /usr/local/bin/su-exec
RUN ls -alh /etc/envoy/envoy.yaml
RUN ls -alh  /docker-entrypoint.sh


#
# Assembly all-in-one image
#
FROM postgres:14.5-bullseye as runner


#
# init environment & install required debug & runtime tools
#
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    netbase \
    wget \
    telnet \
    gnupg \
    dirmngr \
    dumb-init \
    procps \
    gettext-base \
    ; \
    rm -rf /var/lib/apt/lists/*




#
# init working folder and users
#
RUN mkdir /opt/illa
RUN addgroup --system --gid 102 nginx \
    && adduser --system --disabled-login --ingroup nginx --no-create-home --home /nonexistent --gecos "nginx user" --shell /bin/false --uid 102 nginx \
    && adduser --group --system envoy \
    && adduser --group --system minio \
    && adduser --group --system redis \
    && adduser --group --system illa \
    && cat /etc/group

#
# copy illa-builder-backend bin
#
COPY --from=illa-builder-backend /opt/illa/illa-builder-backend /opt/illa/illa-builder-backend

#
# copy illa-supervisor-backend bin
#
COPY --from=illa-supervisor-backend /opt/illa/illa-supervisor-backend /opt/illa/illa-supervisor-backend

#
# copy illa-builder-frontend
#
COPY ./builder /opt/illa/illa-builder-frontend
COPY ./cloud /opt/illa/illa-cloud-frontend



#
# copy gosu
#

RUN gosu --version; \
	gosu nobody true

#
# copy redis
#
RUN mkdir -p /opt/illa/cache-data/; \
    mkdir -p /opt/illa/redis/; \
    chown -fR redis:redis /opt/illa/cache-data/; \
    chown -fR redis:redis /opt/illa/redis/;


COPY --from=cache-redis /usr/local/bin/redis-benchmark /usr/local/bin/redis-benchmark
COPY --from=cache-redis /usr/local/bin/redis-check-aof /usr/local/bin/redis-check-aof
COPY --from=cache-redis /usr/local/bin/redis-check-rdb /usr/local/bin/redis-check-rdb
COPY --from=cache-redis /usr/local/bin/redis-cli       /usr/local/bin/redis-cli
COPY --from=cache-redis /usr/local/bin/redis-sentinel  /usr/local/bin/redis-sentinel
COPY --from=cache-redis /usr/local/bin/redis-server    /usr/local/bin/redis-server

COPY scripts/redis-entrypoint.sh    /opt/illa/redis
RUN chmod +x /opt/illa/redis/redis-entrypoint.sh


#
# copy minio
#
RUN mkdir -p /opt/illa/drive/; \
    mkdir -p /opt/illa/minio/; \
    chown -fR minio:minio /opt/illa/drive/; \
    chown -fR minio:minio /opt/illa/minio/;


COPY --from=drive-minio /opt/bin/minio /usr/local/bin/minio

COPY scripts/minio-entrypoint.sh /opt/illa/minio
RUN chmod +x /opt/illa/minio/minio-entrypoint.sh


#
# copy nginx
#
RUN mkdir /opt/illa/nginx

COPY --from=webserver-nginx /usr/sbin/nginx  /usr/sbin/nginx
COPY --from=webserver-nginx /usr/lib/nginx   /usr/lib/nginx
COPY --from=webserver-nginx /etc/nginx       /etc/nginx
COPY --from=webserver-nginx /usr/share/nginx /usr/share/nginx

COPY config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY config/nginx/illa-builder-frontend.conf /etc/nginx/conf.d/
COPY config/nginx/illa-cloud-frontend.conf /etc/nginx/conf.d/
COPY scripts/nginx-entrypoint.sh /opt/illa/nginx

RUN set -x \
    && mkdir /var/log/nginx/ \
    && chmod 0777 /var/log/nginx/ \
    && mkdir /var/cache/nginx/ \
    && ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log \
    && touch /tmp/nginx.pid \
    && chmod 0777 /tmp/nginx.pid \
    && rm /etc/nginx/conf.d/default.conf \
    && chmod +x /opt/illa/nginx/nginx-entrypoint.sh \
    && chown -R $UID:0 /var/cache/nginx \
    && chmod -R g+w /var/cache/nginx \
    && chown -R $UID:0 /etc/nginx \
    && chmod -R g+w /etc/nginx

RUN nginx -t


#
# copy envoy
#
ENV ENVOY_UID 0 # set to root for envoy listing on 80 prot
ENV ENVOY_GID 0

RUN mkdir -p /opt/illa/envoy \
    && mkdir -p /etc/envoy

COPY --from=ingress-envoy  /usr/local/bin/envoy* /usr/local/bin/
COPY --from=ingress-envoy  /usr/local/bin/su-exec  /usr/local/bin/
COPY --from=ingress-envoy  /etc/envoy/envoy.yaml  /etc/envoy/

COPY config/envoy/illa-unit-ingress.yaml /opt/illa/envoy
COPY scripts/envoy-entrypoint.sh /opt/illa/envoy

RUN chmod +x /opt/illa/envoy/envoy-entrypoint.sh \
    && ls -alh /usr/local/bin/envoy* \
    && ls -alh /usr/local/bin/su-exec \
    && ls -alh /etc/envoy/envoy.yaml


#
# init database
#
RUN mkdir -p /opt/illa/database/ \
    && mkdir -p /opt/illa/postgres/

COPY scripts/postgres-entrypoint.sh  /opt/illa/postgres
COPY scripts/postgres-init.sh /opt/illa/postgres
RUN chmod +x /opt/illa/postgres/postgres-entrypoint.sh \
    && chmod +x /opt/illa/postgres/postgres-init.sh


#
# add main scripts
#
COPY scripts/main.sh /opt/illa/
COPY scripts/pre-init.sh /opt/illa/
COPY scripts/post-init.sh /opt/illa/
RUN chmod +x /opt/illa/main.sh
RUN chmod +x /opt/illa/pre-init.sh
RUN chmod +x /opt/illa/post-init.sh

#
# modify global permission
#
COPY config/system/group /opt/illa/
RUN cat /opt/illa/group > /etc/group; rm /opt/illa/group
RUN chown -fR illa:root /opt/illa
RUN chmod 775 -fR /opt/illa

#
# run
#
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
EXPOSE 2022
CMD ["/opt/illa/main.sh"]