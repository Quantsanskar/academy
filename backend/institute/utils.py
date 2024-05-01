from twilio.rest import Client
from django.conf import settings
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

TWILIO_ACCOUNT_SID = "AC98836b5ddd3648eec8b6589f8f9ab47d"
TWILIO_AUTH_TOKEN = "ac422cc664ed016e695e6048669a30ae"
from_phonenumber = +12564624142


def send_sms(phone_number, message):
    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    message = client.messages.create(
        from_=from_phonenumber,
        to=phone_number,
        body=message,
    )
    return message.sid


def send_email(body):
    sender_email = "querysendersp@gmail.com"
    receiver_email = "studyphora@gmail.com"
    password = "ijslzduzbpbqciva"

    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = "StudyPhora Contact Form Queries"

    message.attach(MIMEText(body, "plain"))

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()

    server.login(sender_email, password)

    server.sendmail(sender_email, receiver_email, message.as_string())

    server.quit()
