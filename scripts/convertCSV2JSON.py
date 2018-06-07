#!/usr/bin/env python
# Dewi Mooij
# 10752978
# Converts a csvfile to a json

import csv
import json

# open csv file and json file
csvfile = open('2015_consumption.csv', 'r')
jsonfile = open('2015_consumption.json', 'w')

# assign fieldnames
fieldnames = ("DECLARANT", "PERIOD", "QUANTITY_IMPORT", "QUANTITY_EXPORT", "CONSUMPTION_TON", "CONSUMPTION_G", "CONSUMPTION_AVOCADOS", "POPULATION", "AVOCADO_PP", "AVOCADO_PP_G")

# read csvfile
reader = csv.DictReader(csvfile, fieldnames)

# write data to json
data = json.dumps( [ row for row in reader ] )
jsonfile.write(data);

# close csvfile and jsonfile
csvfile.close()
jsonfile.close()
