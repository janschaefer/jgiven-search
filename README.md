# jgiven-search

An HTML5 app to search for JGiven reports indexed by Elasticsearch

## Setup

### Install and start Elasticsearch docker image
```
$ ./elasticsearch/pullDockerImage.sh
$ ./elasticsearch/runElasticsearch.sh
```

### Upload JGiven JSON files to Elasticsearch

```
$ ./scripts/uploadToES.py testdata
```

### Open JGiven-Search

```
$ firefox app/jgiven-search.html
```