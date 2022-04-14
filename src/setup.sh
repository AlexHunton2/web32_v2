# make library fold
mkdir lib

# clone ace lib
git clone https://github.com/ajaxorg/ace-builds.git lib/ace-builds
mv lib/ace-builds/src-min-noconflict lib
chmod -R +w lib
rm -r lib/ace-builds
