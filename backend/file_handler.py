import csv
import os
from fastapi import UploadFile

class FileHandler:
    def __init__(self,directory_name):
        self.directory = directory_name
        self.logDirPath = os.path.join(directory_name)
        self.file_names = []
        self.create_directory()

    def get_log_paths(self):
        log_files = []
    
        for subdir, dirs, files in os.walk(self.logDirPath):
            for file in files:
                file_path = os.path.join(subdir, file)
                if file_path.endswith(".csv") and file_path not in log_files:
                    log_files.append(file_path)
            if "red" in dirs:
                red_dir = os.path.join(subdir, "red")
                for red_subdir, red_dirs, red_files in os.walk(red_dir):
                    for red_file in red_files:
                        file_path = os.path.join(red_subdir, red_file)
                        if file_path.endswith(".csv") and file_path not in log_files:
                            log_files.append(file_path)
            if "white" in dirs:
                white_dir = os.path.join(subdir, "white")
                for white_file in os.listdir(white_dir):
                    file_path = os.path.join(white_dir, white_file)
                    if file_path.endswith(".csv") and file_path not in log_files:
                        log_files.append(file_path)

        return log_files
    
    def create_directory(self):
        # creates the directory if it doesn't exist
        if not os.path.exists(self.directory):
            os.makedirs(self.directory)

    
    def save_file_in_directory(self, file: UploadFile):
        # Generate a safe filename to prevent directory traversal attacks
        safe_filename = os.path.basename(file.filename)
        target_file_path = os.path.join(self.directory, safe_filename)

        # Ensure the directory exists
        os.makedirs(self.directory, exist_ok=True)

        with open(target_file_path, 'wb+') as new_file:
            contents = file.file.read()  # Read the file's contents as binary
            new_file.write(contents)
            file.file.close()  # It's a good practice to close the file object explicitly


    #grabs the files from the file handlers dir
    def get_files_in_directory(self):
        with open(os.path.join(self.directory),'r') as d:
            pass


    def getFileType(self, file_name):
        file_type = file_name.split(".")[-1]
        return file_type