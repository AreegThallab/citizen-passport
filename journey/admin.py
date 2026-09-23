from django.contrib import admin
from .models import Passport, Stamp
admin.site.register(Passport)
admin.site.register(Stamp)
admin.site.site_header = 'إدارة جواز المواطن'
