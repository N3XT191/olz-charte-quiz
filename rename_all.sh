#!/bin/bash
#i=0
#for f in resized/images/big/*.png; do
#    i=$(( i + 1 ))
#    echo index $i $f
#  cp $f "renamed/big/big_$i.png"
#done

#i=0
#for f in resized/images/medium/*.png; do
#    i=$(( i + 1 ))
#    echo index $i $f
#     cp $f "renamed/medium/medium_$i.png"
#done
i=0
for f in resized/images/small/*.png; do
    i=$(( i + 1 ))
    echo index $i $f
    cp $f "renamed/small/small_$i.png"
done
