import csv

class FileHandler:
    def __init__(self):
        pass

    def readCSV(self, file_name):
        try:
            with open(file_name, 'r', newline='') as csv_file:
                csv_reader = csv.DictReader(csv_file, delimiter=';')
                return csv_reader
        except FileNotFoundError:
            print(f"File {file_name} not found.")
    
    def getFileType(self, file_name):
        file_type = file_name.split(".")[-1]
        return file_type