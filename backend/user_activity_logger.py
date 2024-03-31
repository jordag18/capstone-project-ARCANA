class UserActivityLogger:
    user_activity_log_list = []  

    @staticmethod
    def add_user_activity_log(initials, timestamp, statement, data_source=None):
        log_entry = f"[{initials}] [{timestamp}] {data_source} {statement}" if data_source else f"[{initials}] [{timestamp}] {statement}"
        UserActivityLogger.user_activity_log_list.append(log_entry)

    @classmethod
    def view_user_activity_logs(cls):
        return cls.user_activity_log_list