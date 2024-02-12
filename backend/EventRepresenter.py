import mongoengine


class EventRepresenter(mongoengine.EmbeddedDocument):
    def __init__(self, initials, team, vectorID, description, dataSource, icon, actionTitle, sourceHost=None, targetHostList=None, location=None, posture=None, timestamp=None, isMalformed=None):
        # Required attributes
        self.initials = mongoengine.StringField(required=True)
        self.team = mongoengine.StringField(required=True)
        self.vectorID = mongoengine.StringField(required=True)
        self.description = mongoengine.StringField(required=True)
        self.dataSource = mongoengine.StringField(required=True)
        self.icon = icon
        self.actionTitle = mongoengine.StringField(required=True)

        # Optional attributes
        self.sourceHost = mongoengine.StringField()
        self.targetHostList = mongoengine.ListField(mongoengine.StringField())
        self.location = mongoengine.StringField()
        self.posture = mongoengine.StringField()
        self.timestamp = mongoengine.DateTimeFieldField()
        self.isMalformed = mongoengine.BooleanField()
    
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
        
    @dataSource.setter
    def dataSource(self, value):
        self._dataSource = value

    @property
    def icon(self):
        return self._icon
        
    @icon.setter
    def icon(self, value):
        self._icon = value

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

    