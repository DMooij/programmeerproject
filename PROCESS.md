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

## Day 10 - 15 June 2018

- presented the project in the weekly presentation meeting
- added the slider with avocado icon

## Day 11 - 18 June 2018

- managed to put the graphs in columns and rows
- set default donut and bar chart to show when the page is opened
- added title to donut chart
- started working on a hover on the donut chart
- map legend updates values depending on import/export
- clean up code to make it more general and useable for the slider, if I have time to implement it
- TO DO: Hover for donut chart, slider?

## Day 12 - 19 June 2018

- Hover on donut to enlarge the segment works, enlarging the text on hover does not work yet
- Slider to change year data for the map works for import
- TO DO: slider after selecting export and then sliding it changes back to import. Donut - clicking on country and then changing year goes back to default as location is unknown.

## Day 13 - 20 June 2018

- Update function with transition for Barchart and donut
- fixed the slider import/export change and slide issue
- slider works on donut as well
- ISSUE: if the year is 2015 and another country is clicked before sliding, the donut and barchart can't be made because the location is unknown

## Day 14 - 21 June 2018

- fixed the default situation change country slider issue
- function to make a legend once, the legend doesn't change when the map is updated
- created space to add text about the figures
- implemented carousel on the main page

## Day 15 - 22 June 2018

- presented progress in weekly meeting
- TO DO: remove .0 in legend, donut update (arctween?), size donut?, add text below legend

## Day 16 - 25 June 2018

- fixed legend .0 problem
- made the donut smaller so no scrolling is necessary to view all three visualisations
- added a soundtrack with play/pause to the home page
- TO DO: donut when country with no data is clicked

## Day 17 - 26 June 2018

- fixed the issue with errors in the console when a country without data is clicked
- updated README and added PROPOSAL.md
- fixed the slider issue that changed the gender back to total when sliding from male/

## Day 18 - 27 June 2018

- Did a code review with Sylvie
- improved and commented my code
- managed to avoid nesting of functions in Barchart
- avoiding nesting in map and donut ruins everything, so decided to work on report instead
- added info text to home page
- added sources page

## Day 19 - 28 June 2018

- Finished and submitted code
- worked on report and update README
