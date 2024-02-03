import os
import glob
import csv

class LogIngestor:
    def __init__(self, directory):
        self.directory = directory
        self.errors = []
        self.newFilesIngested = []
    

    def ingestLogs(self):
        # The LogIngestor shall ingest logs from the analyst provided directory (Table 3.2.2–7 (# 1)), ignoring those files already ingested 
        # Check if file has already been ingested or not
        # Parse each CSV file in the directory that has not already been ingested into EventRepresenter
        # Parse each Log file in the directory that has not already been ingested into EventRepresenter
        # Parse each TXT file in the directory that has not already been ingested into EventRepresenter
        # Store each parsed file into newFilesIngest (Table 3.2.27 (#3)). 

    def parseCSVFile(self, fileName):
        # The LogIngestor shall parse a CSV file into EventRepresenters by the following steps: 
        # For each entry in the file, create an EventRepresenter. 
        # For each entry in the file, store the attributes (Table 3.2.2-8 (#1 - #8)) that can be found 
        # in the corresponding EventRepresenter. 
        # If an entry cannot be parsed, has invalid field values, or is missing values in Table 3.2.2-8 
        # (#1 - #8), mark the EventRepresenter as malformed (Table 3.2.2-8 (#9)). 
        # For each EventRepresenter, assign the data source (Table 3.2.2-8 (#10)) to the path of the CSV file. 
        # For each EventRepresenter, assign it the default action title and icon for its team (Table 3.2.2-8) that is stored in the TOAManager. 
        # Use the UserActivityLogger to log the file ingestion. 

        
    def parseLogFile(self, fileName):
        #similar as csv file
    
    def parseTXTFile(self, fileName):
        #similar as csv file
    
    def parseScreenshot(self, fileName):
        #from class diagram
    
    def displayErrors(self):
        # The LogIngestor shall allow the analyst to view the errors (Table 3.2.2–7 (#2) errors) 
        #that occurred when ingesting logs. 

    def getNewFilesIngeted(self):
        # The LogIngestor shall allow the new files that were ingested (Table 3.2.2–7 (#3) newFilesIngested)
        # to be retrieved.
