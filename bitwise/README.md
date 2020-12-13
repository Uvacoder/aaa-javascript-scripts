# bitwise 

## javascript bitwise operator

```&```	AND	Sets each bit to 1 if both bits are 1\
```|```	OR	Sets each bit to 1 if one of two bits is 1\
```^```	XOR	Sets each bit to 1 if only one of two bits is 1\
```~```	NOT	Inverts all the bits\
```<<```	Zero fill left shift	Shifts left by pushing zeros in from the right and let the leftmost bits fall off\
```>>``	Signed right shift	Shifts right by pushing copies of the leftmost bit in from the left, and let the rightmost bits fall off\
```>>>``	Zero fill right shift

## bitwise AND
**one bit**\
```0 & 0```	 = 0\
```0 & 1```	 = 0\
```1 & 0```	 = 0\
```1 & 1```	 = 1\
**four bit**\
```1111 & 0000```	 = 0000\
```1111 & 0001```	 = 0001\
```1111 & 0010```	 = 0010\
```1111 & 0100```	 = 0100

## bitwise OR
**one bit**\
```0 | 0```	 = 0\
```0 | 1```	 = 1\ 
```1 | 0```	 = 1\
```1 | 1```	 = 1\
**four bit**\
```1111 | 0000```	 = 1111\
```1111 | 0001```	 = 1111\
```1111 | 0010```	 = 1111\
```1111 | 0100```	 = 1111

## bitwise XOR
**one bit**\
```0 ^ 0```	 = 0\
```0 ^ 1```	 = 1\
```1 ^ 0```	 = 1\
```1 ^ 1```	 = 0

