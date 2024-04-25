import os
import pandas as pd
from dateutil import parser
from fastapi import UploadFile

##########################################################################################
# This Class is responsible for handling a pletera of operations that involve files
# and directories. Many methods depend on a center directory, that directory is created
# when the object is initiated if the directory did not exist before hand.
#
#
##########################################################################################


class FileHandler:
    """
    This Class is responsible for handling a pletera of operations that involve files and directories.
    Many methods depend and refer to a center directory, which is created when the object is initiated, if the directory does not exist.
    Attributes:
        directory: The centeral directory that will be used. If the directory does not exist it will be created when the FileHandler object is created.
        logDirPath:
        file_names: The list of all the files in the directory
    """

    def __init__(self, directory_name: str):
        """
        Constructor for FileHandler Class\n
        Parameter:
            directory_name (str): The name of the directory that will be used with FileHandler
        """
        self.directory = directory_name
        self.logDirPath = os.path.join(directory_name)
        self.file_names = []
        self._create_directory()

    def get_log_paths(self):
        """
        Traverses the entire FileHandler directory to find files whose filetype is associated with logs. Such as csv files.\n
        Returns:
            log_files: It returns a list of all the filepaths.
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

    def get_files_in_directory(self):
        """
        Finds all the files inside the FileHandler's directory.\n
        Returns:
            files: a list of all the files inside the directory associated with FileHandler.
        """
        files = []
        for item in os.listdir(self.directory):
            item_path = os.path.join(self.directory, item)
            if os.path.isfile(item_path):
                files.append(item_path)
        return files

    def _create_directory(self):
        """
        Creates a new directory, if it doesn't exist.
        """
        if not self._directory_exist():
            os.makedirs(self.directory)

    def _directory_exist(self) -> bool:
        """
        Checks if the FileHandler's directory exists.
        Returns:
            True -> If the directory exist.\n
            False -> If it does not exist.
        """
        return os.path.exists(self.directory)

    def save_file_in_directory(self, uploaded_file: UploadFile):
        """
        Saves the given file into the FileHandler's directory.\n
        It Generates a safe filename to prevent directory traversal attacks.
        Parameter:
            uploaded_file (UploadFile): The file that will be saved into the directory.
        """
        # Generate a safe filename to prevent directory traversal attacks
        safe_filename = os.path.basename(uploaded_file.filename)
        target_file_path = os.path.join(self.directory, safe_filename)

        # Ensure the directory exists
        if not self._directory_exist():
            self._create_directory()

        with open(target_file_path, "wb+") as new_file:
            contents = uploaded_file.file.read()  # Read the file's contents as binary
            new_file.write(contents)
            uploaded_file.file.close()

        return self.directory

    def get_file_type(self, filepath: str) -> str:
        """
        Checks the given file's type and returns it as a string.\n
        Parameter:
            filepath (str): The file's path that will be checked.
        Returns:
            file_type (str): A string subset that only includes the file's type. (.csv, .txt, etc)
        """
        file_type = filepath.split(".")[-1]
        return file_type

    def is_empty(self):
        """
        Checks if the FileHandler's directory is empty.
        """
        return not os.listdir(self.directory)

    def delete_file(self, filepath: str):
        """
        Deletes a single file matching the given filepath.\n
        Parameter:
            filepath (str): The file's path that will be deleted.
        """
        try:
            if os.path.isfile(filepath):
                os.remove(filepath)
        except Exception as e:
            print(f"Error deleting file: {filepath} - {e}")

    def delete_all_files(self):
        """
        Delete all files within the FileHandler's directory.\n
        """
        for filename in os.listdir(self.directory):
            file_path = os.path.join(self.directory, filename)
            try:
                if os.path.isfile(file_path):
                    os.remove(file_path)
            except Exception as e:
                print(f"Error deleting file: {file_path} - {e}")

    def delete_directory(self):
        """
        Deletes all the files inside the FileHandler's directory and then deletes the directory itself.
        """
        if not self.is_empty():
            self.delete_all_files()
        self._delete_empty_directory()

    def _delete_empty_directory(self):
        """
        Delete the FileHandler's directory if it's empty. Mainly used when the FileHandler's function is complete.
        """
        try:
            if os.path.isdir(self.directory) and not os.listdir(self.directory):
                os.rmdir(self.directory)
        except Exception as e:
            print(f"Error deleting directory: {self.directory} - {e}")

    def get_earliest_latest_timestamps(self):

        timestamps = []

        csv_files = self.get_log_paths()

        if not csv_files:
            return {"message": "No CSV files found in the directory."}

        for file_path in csv_files:
            try:
                df = pd.read_csv(file_path)
                timestamp_column = None
                # Determine which timestamp column is present
                if "Timestamp" in df.columns:
                    timestamp_column = "Timestamp"
                elif "dateCreated" in df.columns:
                    timestamp_column = "dateCreated"

                if timestamp_column:
                    # Attempt to parse each value in the chosen timestamp column as a datetime, handling errors gracefully
                    parsed_timestamps = []
                    for ts in df[timestamp_column].astype(str):
                        try:
                            parsed_timestamps.append(parser.parse(ts))
                        except ValueError:
                            # If parsing fails, skip this value
                            continue
                    if parsed_timestamps:  # Ensure the list is not empty
                        timestamps.extend(parsed_timestamps)
                else:
                    print(
                        f"Neither 'Timestamp' nor 'dateCreated' column found in {file_path}"
                    )
            except Exception as e:
                print(f"Error processing file {file_path}: {e}")

        if timestamps:
            earliest = min(timestamps)
            latest = max(timestamps)
            return {
                "earliest_timestamp": earliest.strftime("%Y-%m-%d %H:%M:%S"),
                "latest_timestamp": latest.strftime("%Y-%m-%d %H:%M:%S"),
            }
        else:
            return {"message": "No suitable timestamp data found across all files."}
