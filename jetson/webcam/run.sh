#!/bin/bash


# bash scripts to execute both scripts simultaneously
# Debashish Buragohain

# before running have to make the scripts executable
# chmod +x run.sh

# define the paths to the python scripts
script1 = "./webcam_1.py"
script2 = "./webcam_2.py"

# running the first script in the background
python "$script1" &
# capture the PID of the firsts script
pid1=$!

# running the second script in the background
python "$script2" &
pid2=$!

# wait for both scripts to finish
wait $pid1
wait $pid2 


echo "Both webcam scripts have ended."
