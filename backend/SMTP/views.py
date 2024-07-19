from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
import json

@csrf_exempt
def form(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        message = data.get('message', '')
        subject = data.get('subject', '')
        name = data.get('name', '')
        email = data.get('email', '')

        send_mail(
            subject=subject,
            message=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email, 'gdaskiet@gmail.com'],
            fail_silently=False,
        )

        return JsonResponse({'status': 'success'})
    return JsonResponse({'error': 'Invalid request'}, status=400)
