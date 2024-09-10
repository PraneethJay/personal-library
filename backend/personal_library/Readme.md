
`Python v3.12.5`

`Create env (windows)`
 - python3 -m venv venv
 - Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
 - .\venv\Scripts\activate

`Run `
 - cd backend/personal_library
 - create env
 - pip install -r requirements.txt
 - python manage.py makemigrations
 - python manage.py migrate
 - python manage.py runserver 0.0.0.0:8080
