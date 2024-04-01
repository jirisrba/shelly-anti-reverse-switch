# Shelly anti reverse power switch

Shelly anti reverse switch is a simple project that uses a Shelly relay to control a switch that is connected to a Solar inverter.

The Shelly Pro 3em measures the power of the inverter sending to a grid and when the power goes over `maxNegativePower`, the Shelly relay `urlSwitch` is turned off.
