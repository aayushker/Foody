from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
# Create your views here.

def form(request):
    if request.method == 'POST':
        message = request.POST.get('message', '')
        subject = request.POST.get('subject', '')
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        send_mail(
            subject='Contact Form',  # Email subject
            message=message,  # Email message
            from_email=settings.EMAIL_HOST_USER,  # Sender email
            recipient_list=[email, 'gdaskiet@gmail.com'],  # Recipients list
            fail_silently=False,
        )
        print(request.POST)
        return render(request, 'SMTP/form.html', {'data': request.POST})
    return render(request, 'SMTP/form.html', {})