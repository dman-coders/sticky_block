A micro-module that allows you to keep blocks from scrolling off the screen,
by using css position:fixed ONLY when needed, but move around normally the rest 
of the time.

Add the css class 'sticky-block' to a block to have it remain in a fixed position 
when scrolling.
This can work for more than one element, but you'd better avoid letting them
pile up.

Use something like block_class.module, or do it in your theme.

This module built as a tiny experiment, just to see if it was at all hard.
Based on some code lifted from a working example on the net - it turns out
to be almost trivial.

TODO - maybe add the option to anchor bottom as well. Logic is almost the same.