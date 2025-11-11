# WebApp ToDO




## Activate Backend:

In Terminal inside : \TaskTracker\Backend\
```powershell
.\.vevn\Scripts\activate
uvicorn main:app --reload --port 8000
```


## Activate Frontend:
In Terminal inside : \TaskTracker\Frontend\dist

```powershell
python -m http.server 5173
```

---
---

# What do I have to do?

    - make a functional backend in "fastAPI"
    - make a functional frontend int "react"
    - document the procces (if possible)
    - make a functioning DockerFile (if possible)
    - Make a somewhat readable filesystem 
    - database????? - SPL Light ???? MySQL ?:??? --Jelszó: CsokiKeksz
    - use tailwind



#### DockerFile:
    - Builds React frontend
    - Copies the compiled static assets int FastApi app
    - Runs FastApi with venv

### Backend:
How to start running the main.py:
```powershell
python -m venv venv
venv\Scripts\activate
python -m venv main.py
pxython main.py
```
To deactivate the virtual machien
```powershell
deactivate
```
To run fastAPI with uvicorn:
```powershell
uvicorn main:app --reload
```

