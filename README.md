Create a regex that matches an Integer range
============================================

This is a JavaScript implementation of https://github.com/dimka665/range-regex.

It's not yet optimized (regex could be shorter) but it works.



Usage
------
    
    regex4range(12, 34)

generates ``"1[2-9]|2\d|3[0-4]"``