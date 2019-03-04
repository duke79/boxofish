cd ..
cd client
call npm run build
cd ..
call robocopy client\build hybrid\www /MIR
call sed -i "s/\"\//\"/g" hybrid\www\index.html
cd hybrid
call cordova run android --release