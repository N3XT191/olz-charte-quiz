#!/bin/bash
for f in map_png/*.png
do
  echo "Processing $f file..."

for i in $(seq 0 1 8)
do
    for j in $(seq 0 1 7)
    do 
        convert -extract 2000x2000+$(( $i*2200 ))+$(( $j*2200  )) $f "images/${f}_${i}_${j}.png"
    done
done
done
