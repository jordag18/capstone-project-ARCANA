from mongoengine import connect
from data_services import create_event_representer
from LogIngestor import LogIngestor
from EventsManager import EventsManager

# Connect to MongoDB
connect('ARCANA', host='localhost', port=27017)

#event = create_event_representer(initials="JA", team="Red", vector_id="1234567", description="Wow an event happened!",
                                 #data_source="UTEP", icon="Icon I guess", action_title="Attack")

test_event_manager = EventsManager()
test_ingestor = LogIngestor(test_event_manager)
test_ingestor.ingestLogs("20240116.csv")

