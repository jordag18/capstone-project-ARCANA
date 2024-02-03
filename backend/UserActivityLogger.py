class UserActivityLogger:
    def __init__(self):
        self.userActivityLogsList = []
    

    def addUserActivityLog(self, log):
    # The UserActivityLogger shall allow a user activity log 
    # to be added to the current userActivityLogList with a value that complies with the value. 
    # Required; Editable; Value = {initials + timestamp + statement} 
        self.userActivityLogList.append(log)

    def displayUserActivity(self):
        # The UserActivityLogger shall allow the analyst to view the user activity logs
        # by displaying the userActivityLogList defined in Table 3.2.2-3 (#1).
        return self.userActivityLogList