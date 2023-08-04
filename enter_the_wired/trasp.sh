#!/bin/bash

# Split the GIF into individual frames
convert ln2.gif 'frame%04d.png'

# Make each frame semi-transparent
for frame in frame*.png; do
    convert "$frame" -alpha set -channel Alpha -evaluate set 50% "$frame"
done

# Reassemble frames back into a GIF
convert -delay 20 -loop 0 frame*.png output.gif

# Remove the individual frame PNGs
rm frame*.png
#!/bin/bash

# Split the GIF into individual frames
convert ln2.gif 'frame%04d.png'

# Make each frame semi-transparent
for frame in frame*.png; do
    convert "$frame" -alpha set -channel Alpha -evaluate set 70% "$frame"
done

# Reassemble frames back into a GIF
convert -delay 20 -loop 0 frame*.png output.gif

# Remove the individual frame PNGs
rm frame*.png
