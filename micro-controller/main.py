from machine import Pin
import time

# Button connected on D6 = Pin 9
button = Pin(9, Pin.IN, Pin.PULL_UP)

# Read a button every 500ms
while True:
  value = button.value()
  print(value)
  time.sleep(0.5)

  if value == 1:
    print("Button pressed")
