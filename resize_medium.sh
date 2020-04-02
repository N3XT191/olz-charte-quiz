#!/bin/bash
for f in images/medium/*.png
do
    echo "Processing $f file..."
    convert  -resize 50% $f resized/$f
done
