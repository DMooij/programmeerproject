# Process

## Day 4 - 7 June 2018

- filtered the data for the variables I want to use and merged some datasets for easier use later on
- converted the data from CSV to JSON format
- built a prototype in which the different html pages of the project are linked
- loaded the data
- started with implementing the first visualisation, the datamap
- Problem: assuming a very little amount of avocados is produced in Europe because of the unsuitable climate conditions, I calculated consumption as import - export. However, for a few countries in some months this number becomes negative. So probably some countries do produce their own avocados. Therefore I wanted to change the consumption calculation to (import + production) - export. But, for example in the Netherlands in December the calculated consumption is negative, but the FAOSTAT data states that no avocados are produced in the Netherlands at all, so this is weird. Also avocado production data is only available per year
- Remark: when calculating the consumption per person per month the population size remains the same throughout the year as there was no dataset of population size per month available, also I think the difference between the months is negligible.

## Day 5 - 8 June 2018

- presented idea in weekly meeting
- discussed negative consumption problem for avocado producing countries in meeting. Outcome: make a different graph showing production for countries that would otherwise have a negative consumption OR put missing data in the calendar view

## Day 6 - 11 June 2018

- managed to make a map containing the import data for the year 2015
- starting working on the checkbox to update the map from import to export. The value is selected but the data does not get updated
- started coupling the health data to the map data on location code

## Day 7 - 12 June 2018

- checkbox to update the data on the map from import to export works. However remove is used instead of update
- Coupled map data to health data, so on-click on a country on the map a donut chart appears displaying the health perception in that country. When a different country is clicked the chart changes, however this is also done with remove instead of update
- made the dropdown button to select data the gender for donut chart works also by remove instead update

## Day 8 - 13 June 2018

- started working on the calendar view. Turns out to be too difficult and not very useful as I only have data per month instead of per day so a barchart with each month as a bar is better even though this chart type seems a bit boring. The plan is to add animations like sort by value to the barchart to make it more special.

## Day 9 - 14 June 2018

- started working on a barchart that for a country clicked on the worldmap shows the number of avocados consumed per inhabitant in the time period 2010-2015.
- with this deviation form the original plan, I should implement the slider to select the year for the map and donut chart as well to make it fit better with the barchart.
- added the legend to the datamap
- TO DO: clean-up code! + add title to donut chart
