import datetime

from mongoengine import *
from EventRepresenter import EventRepresenter


def create_event_representer(initials, team, vector_id, description, data_source, icon, action_title=None,
                             source_host=None, target_host_list=None, location=None, posture=None, timestamp=None,
                             is_malformed=False):
    event = EventRepresenter(
        initials=initials,
        team=team,
        vector_id=vector_id,
        description=description,
        data_source=data_source,
        icon=icon,
        action_title=action_title,

        source_host=source_host if source_host is not None else "",
        target_host_list=target_host_list if target_host_list else [],
        location=location if location is not None else "",
        posture=posture if posture is not None else "",
        timestamp=timestamp if timestamp is not None else datetime.datetime.now,
        is_malformed=is_malformed
    )

    event.save()
    return event
