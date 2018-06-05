# Project

Dewi Mooij 10752978

# Problem

Since the rise of fitgirls, avocados have become a very popular food. However, the circumstances in Europe are unsuitable for avocado farming, which is why large amounts of avocados are imported throughout the year from avocado producing countries such as Mexico and Peru. As avocados are a superfood and considered to be very healthy, it is interesting to try an find a relation between the amount of avocados imported by a country for consumption and the health perception of its inhabitants.  

This project aims to visualize the amount and origin of avocados imported to Europe throughout a year and to explore the connection between the amount of avocados imported by a country and the health perception of its inhabitants.

# Features

The webpage is initialized with a map of Europe. On this map the countries are coloured in different shades of green, reflecting the amount of avocados the country imports. On hovering over a country the exact amount of avocados imported is shown as well as what percentage this is of the total avocado import to Europe. On click two new graphs appear. A calender view shows how many avocados where imported each month from an avocado exporting country. This avocado exporting country can be selected from a menu. The second chart that appears is a donut chart displaying the health perception. This chart can be updated according to gender. All these features will be part of the minimum viable product, an extra feature that might be added later is a slider to select the year of which data will be displayed.

Sketch

The hardest part for now is to process the data used for making the calander view. The data to be used for this chart can only be exported in seperate files for each month and country. I need to figure out an efficient way to merge the data together in one dataset.

# Data sources

http://madb.europa.eu/madb/statistical_form.htm

http://www.fao.org/faostat/en/#data

http://stats.oecd.org/#

# Libraries

Required libraries are d3-tooltip and d3-worldmaps
