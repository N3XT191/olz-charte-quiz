#!/bin/bash
for f in images/big/*.png
do
  echo "Processing $f file..."

for i in $(seq 0 1 1)
do
    for j in $(seq 0 1 1)
    do 
        mogrify +repage $f
       convert +repage -extract 1000x1000+$(( $i*1000 ))+$(( $j*1000  )) $f "${f}_${i}_${j}.png" 
       mv "${f}_${i}_${j}.png" images/medium/
    done
done
done
