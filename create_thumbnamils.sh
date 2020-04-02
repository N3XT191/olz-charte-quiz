#!/bin/bash
for f in map_png/*.png
do
    echo "Processing $f file..."
    convert  -resize x200 $f thumb/$f
done
