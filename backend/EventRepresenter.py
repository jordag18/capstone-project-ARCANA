
class EventRepresenter:
    def __init__(self, initials, team, vectorID, description, dataSource, icon, actionTitle, sourceHost=None, targetHostList=None, location=None, posture=None, timestamp=None, isMalformed=None):
            # Required attributes
            assert len(initials) in [2, 3], "Initials must be 2 or 3 characters long"
            self.initials = initials
            assert team in ["Red", "White", "Blue", "Unknown"], "Team must be 'Red', 'White', 'Blue', or 'Unknown'"
            self.team = team
            self.vectorID = vectorID
            self.description = description
            self.dataSource = dataSource
            self.icon = icon
            self.actionTitle = actionTitle

            # Optional attributes
            self.sourceHost = sourceHost
            self.targetHostList = targetHostList if targetHostList else []
            self.location = location
            self.posture = posture
            self.timestamp = timestamp
            self.isMalformed = isMalformed

    def displayEvent(self):
        # Display the event's data to the analyst including attributes from Table 3.2.2-8 (#1 to #10)
        data = {
            "Initials": self.initials,
            "Team": self.team,
            "Source Host": self.sourceHost,
            "Target Host List": self.targetHostList,
            "Location": self.location,
            "Posture": self.posture,
            "Vector ID": self.vectorID,
            "Description": self.description,
            "Timestamp": self.timestamp,
            "Is Malformed": self.isMalformed,
        }
        return data

    def drawEventNode(self):
        # Draw itself as a node in the event graph to the analyst including attributes from Table 3.2.2-8 #2 (team), #5 (location), #6 (posture), the first 5 words of #7 (vectorID), #8 (Description), #9 (timestamp), #10 (isMalformed), #11 (dataSource), #12 (icon))
