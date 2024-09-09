
`Python v3.12.5`

`Create env (windows)`
 - python3 -m venv venv
 - Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
 - .\venv\Scripts\activate

`Run `
 - python manage.py makemigrations
 - python manage.py migrate
 - python manage.py runserver