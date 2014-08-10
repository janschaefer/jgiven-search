#!/usr/bin/python

import json,sys,os
from glob import glob
from pprint import pprint
import requests


def updateScenario(scenario):
    name = scenario["testMethodName"]
    print "Uploading " + name
    response = requests.put( HOST + '/'+INDEX+'/scenario/'+name, data=json.dumps(scenario))
    print response.text



HOST = "http://localhost:9200"
INDEX = "testindex"
inputdir = "."

if len(sys.argv) > 1:
    inputdir = sys.argv[1]

print "Using inputdir: " + inputdir

for f in glob( inputdir + "/*Test.json"):
    json_data = open(f)
    data = json.load( json_data )
    print "Handling file " + f
    for scenario in data["scenarios"]:
        updateScenario(scenario)
    json_data.close()


