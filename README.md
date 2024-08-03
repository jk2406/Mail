# Welcome to Mail
Mail is a website build using Javascript,django framework of python,HTML abd CSS.
It includes almost every feature you know so far if you have used any mailing website or app.Those features are listed as follows:
- Every user's account is secured by a password,of which no other user has access to.
- If user doesn't have any account,user can create it and login into his/her account.
- User has access to multiple boxes like:
     - Inbox
     - Archived
     - Sent
- User can send mail to anyone he/she wants(If that email id also exists).
- User can "view" mail and also reply to it(Any replied mail will have subject beginning with string "Re:" and body with beginning with "On {date},{user} wrote:").
- Each mail has time at which the mail was sent,with respect to user's timezone.
## API
- The API used here is seamlessly integrated with JSON
- JSON (JavaScript Object Notation) is a data interchange format that's based on JavaScript syntax
- It returns data of a particular entry as shown below:
  {
        "id": 100,
        "sender": "foo@example.com",
        "recipients": ["bar@example.com"],
        "subject": "Hello!",
        "body": "Hello, world!",
        "timestamp": "Aug 2 2024, 12:00 AM",
        "read": false,
        "archived": false
    }
- Every entry has its unique "id" to keep track of it and to extract it with ease.
**Some features of this API:**
  - Sending a GET request to /emails/<mailbox> where <mailbox> is either inbox, sent, or archive will return back to you (in JSON form) a list of all emails in that mailbox, in reverse chronological order.
  - Sending a GET request to /emails/email_id where email_id is an integer id for an email will return a JSON representation of the email,as shown above.
  - To send an email, you can send a POST request to the /emails route. The route requires three pieces of data to be submitted: a recipients value (a comma-separated string of all users to send an email to), a subject string, and a body string.
  - To  mark any email read/unread or archived/unarchived, send a PUT request (instead of a GET) request to /emails/<email_id> where email_id is the id of the email you’re trying to modify.
Look it JavaScript file,to get insights of how it is used.
## Running the Website
To run the website,you should have django installed on your computer.After downloading,strictly in the give order,in the terminal, type:
- py manage.py makemigrations mail
- py manage.py migrate
- py manage.py runserver
