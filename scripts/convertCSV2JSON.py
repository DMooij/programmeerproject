#!/usr/bin/env python
# Dewi Mooij
# 10752978
# Converts a csvfile to a json

import csv
import json

# open csv file and json file
csvfile = open('avo_pp_year_data.csv', 'r')
jsonfile = open('consumption_avo_pp_year.json', 'w')

# assign fieldnames
fieldnames = ("CODE","DECLARANT","YEAR","QUANTITY_TON","PRODUCTION", "QUANTITY_TON","CONSUMPTION_TON","CONSUMPTION_G","CONSUMPTION_AVO","POPULATION","AVO_PP_YEAR")

# read csvfile
reader = csv.DictReader(csvfile, fieldnames)

# write data to json
data = json.dumps( [ row for row in reader ] )
jsonfile.write(data);

# close csvfile and jsonfile
csvfile.close()
jsonfile.close()
