---
name: get-weather-skill
description: Retrieves current weather forecasts for a given US city.
---

# Weather Forecast Skill

Use this skill when the user asks for current weather conditions or forecasts.

## Usage

```python
import json
import urllib.request

def get_forecast(lat: float, lon: float) -> dict:
    """Fetch public weather forecast from the National Weather Service API."""
    url = f"https://api.weather.gov/points/{lat},{lon}"
    req = urllib.request.Request(url, headers={"User-Agent": "WeatherAgent/1.0"})
    with urllib.request.urlopen(req, timeout=5) as resp:
        return json.loads(resp.read().decode("utf-8"))
```
