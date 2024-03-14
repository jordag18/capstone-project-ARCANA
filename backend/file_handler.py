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
        """
        Traverses the entire directory to find files whose filetype is associated with logs.\n
        It returns a list of all the filepaths.
        """
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
    
    def _create_directory(self):
        """
        Creates a directory to be associated with the FileHandler if it doesn't exist already.
        """
        if not self._directory_exist():
            os.makedirs(self.directory)
    
    def _directory_exist(self):
        """
        Checks if a directory exists.
        """
        return os.path.exists(self.directory)

    
    def save_file_in_directory(self, file: UploadFile):
        """
        Saves the given file into the FileHandlers directory.\n
        Generating a safe filename to prevent directory traversal attacks.
        """
        # Generate a safe filename to prevent directory traversal attacks
        safe_filename = os.path.basename(file.filename)
        target_file_path = os.path.join(self.directory, safe_filename)

        # Ensure the directory exists
        if not self._directory_exist():
            self._create_directory()

        with open(target_file_path, 'wb+') as new_file:
            contents = file.file.read()  # Read the file's contents as binary
            new_file.write(contents)
            file.file.close()  # It's a good practice to close the file object explicitly


    def get_file_type(self, file):
        """
        Checks the given file's type and returns it as a string.
        """
        file_type = file.split(".")[-1]
        return file_type
    
    def is_empty(self):
        """
        Checks if the FileHandler's directory is empty.
        """
        if directory is None: 
            directory = self.directory
        return not os.listdir(directory)
    
    def delete_file(self,filepath):
        """
        Delete a single file matching the given filepath.
        """
        try:
            if os.path.isfile(filepath):
                os.remove(filepath)
                print(f"Deleted file: {filepath}")
        except Exception as e:
            print(f"Error deleting file: {filepath} - {e}")
    
    def delete_all_files(self):
        """
        Delete all files within the directory asociated with the FileHandler.\n
        """
        if directory is None:
            directory = self.directory
        for filename in os.listdir(directory):
            file_path = os.path.join(directory, filename)
            try:
                if os.path.isfile(file_path):
                    os.remove(file_path)
                    print(f"Deleted file: {file_path}")
            except Exception as e:
                print(f"Error deleting file: {file_path} - {e}")

    def delete_directory(self):
        """
        Deletes all the files inside the FileHandler's associated directory and then deletes the directory itself.
        """
        if not self.is_empty(self.directory):
            self.delete_all_files()
        self.delete_empty_directory()
    
    
    def _delete_empty_directory(self):
        """
        Delete a directory if it's empty.\n
        The directory to be deleted is the directory associated with the FileHandler.
        """
        try:
            if os.path.isdir(self.directory) and not os.listdir(self.directory):
                os.rmdir(self.directory)
                print(f"Deleted directory: {self.directory}")
        except Exception as e:
            print(f"Error deleting directory: {self.directory} - {e}")

    