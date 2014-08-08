# Setup

## Install and start Elasticsearch docker image
```
$ ./elasticsearch/pullDockerImage.sh
$ ./elasticsearch/runElasticsearch.sh

## Upload JGiven JSON files to Elasticsearch

```
$ ./scripts/uploadToES.py testdata
```

## Open JGiven-Search

$ firefox app/jgiven-search.html
