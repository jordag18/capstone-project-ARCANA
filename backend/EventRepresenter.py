#Based on SRS section 3.2.2.6 & Table 3.2.2 - 8 

class EventRepresenter:
    def __init__(self, initials, team, vectorID,description,dataSource, icon, actionTitle, 
                 sourceHost = None, targetHostList = None, location = None, 
                 posture = None, timestamp = None, isMalformed = False):
        self.initials = initials
        self.team = team
        self.sourceHost = sourceHost
        self.targetHostList = targetHostList
        self.location = location
        self.posture = posture
        self.vectorID = vectorID
        self.description = description
        self.timestamp = timestamp
        self.isMalformed = isMalformed
        self.dataSource = dataSource
        self.icon = icon
        self.actionTitle = actionTitle
        