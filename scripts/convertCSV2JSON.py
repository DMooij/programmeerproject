#!/usr/bin/env python
# Dewi Mooij
# 10752978
# Converts a csvfile to a json

import csv
import json

# open csv file and json file
csvfile = open('Health_2010_2015.csv', 'r')
jsonfile = open('health_2010_2015.json', 'w')

# assign fieldnames
fieldnames = ("VAR", "Variable", "Gender", "COU", "Country", "Year", "Value")

# read csvfile
reader = csv.DictReader(csvfile, fieldnames)

# write data to json
data = json.dumps( [ row for row in reader ] )
jsonfile.write(data);

# close csvfile and jsonfile
csvfile.close()
jsonfile.close()
