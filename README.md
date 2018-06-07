# Project

Dewi Mooij 10752978
[Project](https://DMooij.github.io/programmeerproject/)

# Problem

Since the rise of fitgirls, avocados have become a very popular food. However, the circumstances in Europe are unsuitable for avocado farming, which is why large amounts of avocados are imported throughout the year from avocado producing countries such as Mexico and Peru. As avocados are a superfood and considered to be very healthy, it is interesting to try an find a relation between the amount of avocados imported by a country for consumption and the health perception of its inhabitants.  

This project aims to visualize the amount of avocados imported and exported in Europe throughout a year and to explore the connection between the amount of avocados consumed by a country and the health perception of its inhabitants.

# Features

The webpage is initialized with a map of Europe. On this map the countries are coloured in different shades of green, reflecting the amount of avocados the country imports/exports (what is shown depends on what is selected from a checkbox). On hovering over a country the exact amount of avocados imported/exported is shown. On click two new graphs appear. A calendar view shows how many avocados where consumed each month. The second chart that appears is a donut chart displaying the health perception indicated as percentage of one of the 3 categories bad/very bad - fair - good/very good. This chart can be updated according to gender using a dropdown menu. All these features will be part of the minimum viable product, an extra feature that might be added later is a slider to select the year of which data will be displayed.

# Sketch
![sketch](doc/sketch.PNG)

The hardest part for now is to process the data used for making the calendar view. The data to be used for this chart can only be exported in separate files for each month and country. I need to figure out an efficient way to merge the data together in one dataset.

# Data sources

http://madb.europa.eu/madb/statistical_form.htm

http://www.fao.org/faostat/en/#data

http://stats.oecd.org/#

# Libraries

Required libraries are d3-tooltip and d3-worldmaps
