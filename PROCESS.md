# Process

## Day 4

- filtered the data for the variables I want to use and merged some datasets for easier use later on
- converted the data from CSV to JSON format
- built a prototype in which the different html pages of the project are linked
- loaded the data
- started with implementing the first visualisation, the datamap
- Problem: assuming a very little amount of avocados is produced in Europe because of the unsuitable climate conditions, I calculated consumption as import - export. However, for a few countries in some months this number becomes negative. So probably some countries do produce their own avocados. Therefore I wanted to change the consumption calculation to (import + production) - export. But, for example in the Netherlands in December the calculated consumption is negative, but the FAOSTAT data states that no avocados are produced in the Netherlands at all, so this is weird. Also avocado production data is only available per year
- Remark: when calculating the consumption per person per month the population size remains the same throughout the year as there was no dataset of population size per month available, also I think the difference between the months is negligible.

## Day 5

- presented idea in weekly meeting
- discussed negative consumption problem for avocado producing countries in meeting. Outcome: make a different graph showing production for countries that would otherwise have a negative consumption OR put missing data in the calendar view

## Day 6

- managed to make a map containing the import data for the year 2015
- starting working on the checkbox to update the map from import to export. The value is selected but the data does not get updated
- started coupling the health data to the map data on location code
