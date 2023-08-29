#!/usr/bin/env bash
set -Eeo pipefail

# check to see if this file is being run or sourced from another script
_is_sourced() {
	# https://unix.stackexchange.com/a/215279
	[ "${#FUNCNAME[@]}" -ge 2 ] \
		&& [ "${FUNCNAME[0]}" = '_is_sourced' ] \
		&& [ "${FUNCNAME[1]}" = 'source' ]
}


_main() {

    echo 
    echo 'config init.'
    echo 

    echo "CLOUD_PATH = $CLOUD_PATH"

    # replace frontend repo
    if [ ! -n "$RELEASE_VERSION" ]; then
        echo "RELEASE_VERSION not defined, skip."
    else
        sed -i "s#<head>#<head><meta release-version=\"$RELEASE_VERSION\" />#g" /opt/illa/illa-builder-frontend/index.html
    fi

    if [ ! -n "$CLOUD_PATH" ]; then
        echo "CLOUD_API_PATH not defined, skip."
    else
        sed -i "s#CLOUD_PATH#$CLOUD_PATH#g" /opt/illa/illa-builder-frontend/assets/*.js
    fi

    if [ ! -n "$CLOUD_API_PATH" ]; then
        echo "CLOUD_API_PATH not defined, skip."
    else
        sed -i "s/CLOUD_API_PATH/$CLOUD_API_PATH/g" /opt/illa/illa-builder-frontend/assets/*.js
    fi


    if [ ! -n "$BUILDER_PATH" ]; then
        echo "BUILDER_PATH not defined, skip."
    else
        sed -i "s/BUILDER_PATH/$BUILDER_PATH/g" /opt/illa/illa-builder-frontend/assets/*.js
    fi

    

    echo 
    echo 'config init done.'
    echo 

}






if ! _is_sourced; then
	_main "$@"
fi

