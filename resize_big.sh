#!/bin/bash
for f in images/big/*.png
do
    echo "Processing $f file..."
    convert  -resize 25% $f resized/$f
done
