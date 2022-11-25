# IntelliBrotherhood Assassin Manager 2022
Developed by the acclaimed JuliePro, IntelliBrotherhood allows your Mentors to track the progress of their Assassins at all times. Assign assassins to cities, where you can preview their contracts. Whether your brotherhood be a local effort or a worldwide contract agency, it will benefit from the great gain in efficiency and 

<img width="949" alt="image" src="https://user-images.githubusercontent.com/43908636/199856046-124a3cb3-0620-4dad-9d10-44c300e73cee.png">

## What this is
A truly enlightening Angular and ASP.Net Core assignment which does *not*, this time, contain a bunch of silly furry jokes. Assumedly.

### Technologies
- Angular frontend
- Angular Material
- ASP.Net Core Web API backend

### Mentor Features
- View cities with pending contracts
- Register new cities as your Brotherhood's zone of influence increases
- Assign assassins to a city, where they will hunt Templars

### Assassin features
- View public cities with pending contracts
- Log in to access your assigned cities
- Request backup in one of your assigned cities

## How to run
```powershell
mkdir client server

# Setup server
# Open solution in Visual Studio. Microsoft SQL Server must be installed (free Express version is ok).
# Run Brotherhood_Server project (not IISExpress)
cd server
git clone https://github.com/Thurinum/brotherhood-server.git

# Setup client
cd client
git clone https://github.com/Thurinum/brotherhood-client.git
npm install
ng serve --open
```

## Next steps
Stop using Angular, or any web frameworks, and install Qt.

## More screenshots
TBD
