#!/usr/bin/python

import json,sys,os
from glob import glob
from pprint import pprint
import requests


def updateScenario(scenario):
    name = scenario["testMethodName"]
    print "Uploading " + name
    response = requests.put('http://' + IP + ':9200/r14.9/scenario/'+name, data=json.dumps(scenario))
    print response.text


IP = "localhost"
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


