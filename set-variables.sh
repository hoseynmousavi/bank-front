#!/bin/bash
source .env
sed -i "s~NAME~$REACT_APP_NAME~g" build/index.html
sed -i "s~DESCRIPTION~$REACT_APP_DESCRIPTION~g" build/index.html
sed -i "s~KEYWORDS~$REACT_APP_KEYWORDS~g" build/index.html
sed -i "s~PRECONNECT~$REACT_APP_REST_URL~g" build/index.html
sed -i "s~NAME~$REACT_APP_NAME~g" build/manifest.json
sed -i "s~DESCRIPTION~$REACT_APP_DESCRIPTION~g" build/manifest.json
sed -i "s~BACKGROUND_COLOR~$REACT_APP_BACKGROUND_COLOR~g" build/manifest.json
sed -i "s~THEME_COLOR~$REACT_APP_THEME_COLOR~g" build/manifest.json
echo "VARIABLES SET SUCCESSFULLY"