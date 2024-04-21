from log_ingestor import LogIngestor
from event_representer import EventRepresenter
from events_manager import EventsManager
from user_activity_logger import UserActivityLogger
import datetime
from typing import List, Optional
from mongoengine import Document, StringField, ListField, DictField, DateTimeField, ReferenceField, EmbeddedDocumentField


##########################################################################################
#
#
#
#
#
##########################################################################################

#TODO Create functions to make a project representer, save project representer to database, make project representer with ingested logs and save representer.

class ProjectRepresenter(Document):
    
    name = StringField(required=True)
    start_date = DateTimeField(default=datetime.datetime.now)
    end_date = DateTimeField(default=datetime.datetime.now)
    location = StringField(default="")
    initials = StringField(default="")
    event_list = ListField(EmbeddedDocumentField(EventRepresenter), default = [])
    toa_icon_library = DictField(default={
        'blue': {
            "detect": {"image": "detect.png", "isDefault": False},
            "react": {"image": "react.png", "isDefault": False},
            "protect": {"image": "protect.png", "isDefault": False},
            "restore": {"image": "restore.png", "isDefault": False},
            "blue team activity": {"image": "BlueTeam_Activity.png", "isDefault": True}
        },
        'red': {
            "failed attempt": {"image": "RedTeam_Activity.png", "isDefault": False},
            "red team activity": {"image": "RedTeam_Activity.png", "isDefault": True}
        },
        'white': {
            "white team activity": {"image": "Whitecard.png", "isDefault": True}
        }
    })
    project_graph = DictField(default={})


    meta = {
        'collection': 'Projects',  # Specifies the collection name in MongoDB
        'ordering': ['-timestamp']  # Documents will be ordered by timestamp descending by default
    }

    def __init__(self, *args, **values):
        super(ProjectRepresenter, self).__init__(*args, **values)
        self.event_manager = EventsManager()
        if not self.id:
            self.ingestLogsToProject("uploads")
        
        
    def ingestLogsToProject(self, directory):
        log_ingestor = LogIngestor(directory, self.event_manager)
        log_ingestor.ingest_logs()
    
        # Log activity when logs are ingested

        timestamp = datetime.datetime.now()
        print("timestamp", timestamp)
        statement = f"HardcodedFileName ingested log in Project {self.name}"  # Adjust statement
        UserActivityLogger.add_user_activity_log(self.initials, timestamp, statement, directory)
        
        for event in self.event_manager.event_representer_list.events:
            #event.save() removed as it returns an empty array of events
            self.event_list.append(event)
        self.save()


    def get_event_representers_info(self):
        # Retrieve all information about each EventRepresenter within the project's event_list
        event_representers_info = []
        for event in self.event_list:
            event_info = {
                'location': event.location,
                'initials': event.initials,
                'team': event.team,
                'vector_id': event.vector_id,
                'description': event.description,
                'data_source': event.data_source,
                'action_title': event.action_title,
                'last_modified': event.last_modified,
                'icon': event.icon,
                'source_host': event.source_host,
                'target_host_list': event.target_host_list,
                'posture': event.posture,
                'timestamp': event.timestamp,
                'is_malformed': event.is_malformed
            }
            event_representers_info.append(event_info)
        return event_representers_info
    
    def group_events_by(self, attrs: List[str]) -> List[List[EventRepresenter]]:
            # If no attribute is passed, all events are returned in a group
            if len(attrs) == 0:
                return [self.event_list]

            output_list = EventsManager.group_events_by(self.event_list, attrs[0]).values()

            for group_by in attrs[1:]:
                input_list = output_list
                output_list = []
                for group in input_list:
                    output_list.extend(
                        EventsManager.group_events_by(group, group_by).values()
                    )

            return output_list
    
    def add_toa_icon(self, team, action_title, icon_filename, is_default=False):
        try:
            # Retrieve the current TOA icon library for the project
            toa_icon_library = self.toa_icon_library

            # Check if the team exists in the TOA icon library
            if team.lower() not in toa_icon_library:
                toa_icon_library[team.lower()] = {}

            # Check if the action title already exists for the team
            if action_title.lower() in toa_icon_library[team.lower()]:
                raise ValueError(f"Action title '{action_title}' already exists for the {team.lower()} team.")

            # Add the icon to the TOA icon library
            toa_icon_library[team.lower()][action_title.lower()] = {"image": icon_filename, "isDefault": is_default}
            
            # Update the TOA icon library in the database
            self.toa_icon_library = toa_icon_library
            self.save()

            print("Icon added to TOA icon library:", icon_filename)
            return {"message": "Icon added to TOA icon library successfully"}

        except Exception as e:
            return {"error_message": f"Error occurred: {e}"}

    def edit_toa_icon(self, old_team, old_action_title, new_team, new_action_title, new_icon_filename, new_is_default):
        try: 

            # Check if the old team and action title exist in the library
            if old_team in self.toa_icon_library and old_action_title in self.toa_icon_library[old_team]:
                
                # Remove the old action title from the old team
                old_icon_info = self.toa_icon_library[old_team].pop(old_action_title)
                
                # If the new team does not exist in the library, create it
                if new_team and new_team not in self.toa_icon_library:
                    self.toa_icon_library[new_team] = {}
                
                # Update the icon info with the new values
                old_icon_info['image'] = new_icon_filename if new_icon_filename else old_icon_info['image']
                old_icon_info['isDefault'] = new_is_default if new_is_default is not None else old_icon_info['isDefault']
                
                # Add the updated icon info to the new team under the new action title
                self.toa_icon_library[new_team if new_team else old_team][new_action_title if new_action_title else old_action_title] = old_icon_info
                
                # If the action title or image was changed, update the events
                if new_action_title or new_icon_filename:
                    for event in self.event_list:
                        if event.team == old_team and event.action_title == old_action_title:
                            event.action_title = new_action_title if new_action_title else old_action_title
                            event.icon_filename = new_icon_filename if new_icon_filename else old_icon_info['image']
                self.save()
            else:
                print(f"Team '{old_team}' with action title '{old_action_title}' does not exist in the library.")
        except Exception as e:
            return {"error_message": f"Error occurred: {e}"}