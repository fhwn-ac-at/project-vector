from machine import Pin
from boot import i2c
import time

# Button connected on D7 = Pin 10
button = Pin(10, Pin.IN, Pin.PULL_UP)

# Read a button every 500ms
while True:
  value = button.value()
  print(value)
  time.sleep(0.5)

  if value == 1:
    print("Button pressed")

  # Write value to I2C bus
  i2c.writeto(0x08, bytes(value))
