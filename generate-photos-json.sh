ls ./images/wedding/*.JPG | jq -R -s 'split("\n")[:-1]' >photos.json
