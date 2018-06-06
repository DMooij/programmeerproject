# Design

# Data sources

## Map: import/export
Data on the monthly avocado import and export is available on http://epp.eurostat.ec.europa.eu/. Datasets are available per country per month, I have merged these datasets together in one dataset because I think that is easier to use. The dataset needs to be converted from a CSV to a JSON for use in Javascript.

## Calander view: monthly consumption per person
A countries import - export is used as a measure of avocado consumption as this is the amount of avocados that remains in the country. The dataset used for the map will be used for this part as well. To calculate the consumption per person, a dataset containing the population size of the European country is used. Monthly consumption per person is calculated as the following: (import - export) / population size. The dataset needs to be converted from a CSV to a JSON for use in Javascript.
population data: http://appsso.eurostat.ec.europa.eu/nui/show.do?dataset=demo_pjan&lang=en

## Donut chart: health perception per gender
This information is all available in one dataset, it only needs to be converted from a CSV to a JSON.
health perception data: http://stats.oecd.org/#

# Diagram

![sketch](doc/diagram.PNG)

# Components

## Javascript
To load the datasets a function using d3.queue will be made. The page is initialized with the map of Europe displaying the avocado import data. To make the map a function make_map will be implemented, to create the map d3 worldmaps will be used with Europe as scope. The data will be visualized in the map by colouring the countries according to scales of the amount of avocados imported. For instance countries importing more than 100 000 tonnes per year are coloured dark green, between 50 000 and 100 000 tonnes green and less than 50 000 tonnes light green. The exact numbers for the scales are not defined yet, analysis of the data will determine this. The scales will be shown in a legend. On hovering over a country a tooltip appears in which the exact amount is given. A checkbox will be made to differentiate between showing export/import data, for this to work a function is necessary that returns the data for the selected option in the map.  

When a country is clicked two new graphs appear displaying data that belongs to the selected country.
For each graph a function will be implemented. For the calendar view the function make_calendar will be called and for the donut chart the function make_donut will be called. The calendar view shows the monthly consumption of avocados per person. Again colours will be used to indicate amounts and the exact amount will also be shown. The donut chart that appear at the same time shows how a countries inhabitants rated there health. This is done using percentages in 3 different categories bad/fair/good, the total amount is always 100% which is why the donut chart is suitable to visualize the data. The donut chart that appears has the default settings, which is the total data of both genders. From a dropdown menu male/female/total can be selected and the chart will be updated accordingly.

When a different country is clicked on the worldmap, both the calendar view and the donut chart will be updated to show the corresponding data.

If all goes well and there is still time left, a slider will be implemented to change the year of which all data is displayed. All datasets have data from the period 2010-2015. The default setting will the year 2015 without the slider. Once the slider is implemented the data does not only visualize differences in avocado consumption and health perception between European countries but also developments throughout a time period will be visualised. By increasing the year the growing popularity of the avocado should become apparent.  

# D3 plugins

D3 -  worldmaps
