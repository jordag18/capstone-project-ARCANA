from mongoengine import (
    Document,
    StringField,
    DateTimeField,
    EmbeddedDocument,
    EmbeddedDocumentListField,
)
from datetime import datetime
from mongoengine import connect


connect("ARCANA", host="localhost", port=27017)


class LogEmbedded(EmbeddedDocument):
    initials = StringField(required=True, max_length=3)
    timestamp = DateTimeField(default=datetime.now)
    statement = StringField()

    meta = {"ordering": ["-timestamp"]}


class UserActivityLogger(Document):
    user_activity_log_list = EmbeddedDocumentListField(LogEmbedded)

    meta = {"collection": "UserActivityLogs", "ordering": ["-timestamp"]}

    def add_user_activity_log(self, initials, timestamp, statement):
        try:
            # checks if initials and timestamp are provided
            if not initials or not timestamp:
                raise ValueError("Initials and timestamp are required")
            # construct log entry with optional data source

            log_entry = LogEmbedded(
                initials=initials,
                timestamp=datetime.now(),
                statement=statement,
            )

            self.user_activity_log_list.append(log_entry)
            self.save()
        except ValueError as e:
            print(f"Error adding a user activity log: {e}")

    def get_log_list(self):
        return self.user_activity_log_list


# userActivityLogger = UserActivityLogger()
if UserActivityLogger.objects.first() == None:
    userActivityLogger = UserActivityLogger()
else:
    userActivityLogger = UserActivityLogger.objects.first()


def create_project(initials, timestamp):
    userActivityLogger.add_user_activity_log(initials, timestamp, "Project created")


def delete_project(initials, timestamp):
    userActivityLogger.add_user_activity_log(initials, timestamp, "Project deleted")


def save_project(initials, timestamp):
    userActivityLogger.add_user_activity_log(initials, timestamp, "Project saved")


def update_project(initials, timestamp):
    userActivityLogger.add_user_activity_log(initials, timestamp, "Project Updated")


# LogIngestor
def ingest_logs(initials, timestamp):
    userActivityLogger.add_user_activity_log(initials, timestamp, "Logs ingested")


# EventManager
def create_event(initials, timestamp):
    userActivityLogger.add_user_activity_log(initials, timestamp, "Event Created")


def save_event(initials, timestamp):
    userActivityLogger.add_user_activity_log(initials, timestamp, "Event saved")


def delete_event(initials, timestamp):
    userActivityLogger.add_user_activity_log(initials, timestamp, "Event deleted")


def edit_event(initials, timestamp):
    userActivityLogger.add_user_activity_log(initials, timestamp, "Event edited")


# EventGraph
def export_event(initials, timestamp):
    userActivityLogger.add_user_activity_log(initials, timestamp, "Event exported")


def import_event(initials, timestamp):
    userActivityLogger.add_user_activity_log(initials, timestamp, "Event imported")
