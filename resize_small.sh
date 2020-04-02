#!/bin/bash
for f in images/small/*.png
do
    echo "Processing $f file..."
    convert  -resize 100% $f resized/$f
done
