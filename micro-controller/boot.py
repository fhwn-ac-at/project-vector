from machine import Pin, I2C

# Initialize I2C
global i2c
i2c = I2C(0, scl=Pin(8), sda=Pin(9))

print("I2C initialized")
