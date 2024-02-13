import csv
import os

class FileHandler:
    def __init__(self):
        self.logDirPath = os.path.join("..","pdrr")
        self.logDir = open(self.logDirPath,'r+')

    def get_log_paths(root_dir):
        log_files = []
    
        for subdir, dirs, files in os.walk(root_dir):
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

    
    def getFileType(self, file_name):
        file_type = file_name.split(".")[-1]
        return file_type