#!/bin/bash
for f in images/medium/*.png
do
  echo "Processing $f file..."

for i in $(seq 0 1 1)
do
    for j in $(seq 0 1 1)
    do 
        mogrify +repage $f
       convert +repage -extract 500x500+$(( $i*500 ))+$(( $j*500  )) $f "${f}_${i}_${j}.png" 
       mv "${f}_${i}_${j}.png" images/small/
    done
done
done
