import mongoengine

def global_int():
    mongoengine.register_connection(alias='core', name='arcana')