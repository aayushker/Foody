from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path,include
from django.conf import settings
from userAuth.views import Heartbeat
from . import api_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_urls)),
    path('', Heartbeat, name='heartbeat')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)