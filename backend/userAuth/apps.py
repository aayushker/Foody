from django.apps import AppConfig


class UserauthConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'userAuth'
    
    def ready(self):
        import userAuth.signals
