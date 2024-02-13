class EventRepresenter:
    def __init__(self, initials, team, vectorID, description, dataSource, icon, lastModified, actionTitle, 
                 sourceHost= None, targetHostList = None, location = None, 
                 posture= None, timestamp=None, isMalformed = False):
        # Required attributes
        self._initials = initials 
        self._team = team 
        self._vectorID = vectorID 
        self._description = description
        self._dataSource = dataSource #Uneditable, 
        self._icon = icon
        self._actionTitle = actionTitle
        self._lastModified = lastModified
    

        # Optional attributes
        self._sourceHost = sourceHost
        self._targetHostList = targetHostList if targetHostList else []
        self._location = location
        self._posture = posture
        self._timestamp = timestamp
        self._isMalformed = isMalformed
    
    @property
    def initials(self):
        return self._initials
    
    @initials.setter
    def initials(self, value):
        assert len(value) in [2, 3], "Initials must be 2 or 3 characters long"
        self._initials = value
    
    @property
    def team(self):
        return self._team
    
    @team.setter
    def team(self, value):
        assert value in ["Red", "White", "Blue", "Unknown"], "Team must be 'Red', 'White', 'Blue', or 'Unknown'"
        self._team = value

    @property
    def vectorID(self):
        return self._vectorID
        
    @vectorID.setter
    def vectorID(self, value):
        self._vectorID = value
    
    @property
    def description(self):
        return self._description
        
    @description.setter
    def description(self, value):
        self._description = value

    @property
    def dataSource(self):
        return self._dataSource
        
    @property
    def icon(self):
        return self._icon
        
    @icon.setter
    def icon(self, value):
        self._icon = value

    @property
    def lastModified(self):
        return self._lastModified
        
    @lastModified.setter
    def lastModified(self, value):
        self._lastModified = value

    @property
    def actionTitle(self):
        return self._actionTitle
        
    @actionTitle.setter
    def actionTitle(self, value):
        self._actionTitle = value
    
    @property
    def sourceHost(self):
        return self._sourceHost
        
    @sourceHost.setter
    def sourceHost(self, value):
        self._sourceHost = value

    @property
    def targetHostList(self):
        return self._targetHostList
        
    @targetHostList.setter
    def targetHostList(self, value):
        self._targetHostList = value
    
    @property
    def location(self):
        return self._location
        
    @location.setter
    def location(self, value):
        self._location = value

    @property
    def posture(self):
        return self._location
        
    @posture.setter
    def posture(self, value):
        self._posture = value

    @property
    def timestamp(self):
        return self._timestamp
        
    @timestamp.setter
    def timestamp(self, value):
        self._timestamp = value

    @property
    def isMalformed(self):
        return self._isMalformed
        
    @isMalformed.setter
    def isMalformed(self, value):
        self._isMalformed= value
