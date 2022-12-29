# IntelliBrotherhood Assassin Manager 2022
> There is no better framework than the one you will find within yourself.  ***- Arno Victor Dorian***

Developed by the acclaimed JuliePro in collaboration with dozens of brotherhoods worldwide, IntelliBrotherhood empowers your Mentors to keep track of their Assassins' progress at all times. Create contracts, manage your assassins, and send them across the globe to perilous voyages in the name of liberty. Whether your brotherhood is a local effort or an international contract agency, it will benefit from the great gain in efficiency brought by JuliePro's next-gen engineering.

<img width="959" alt="image" src="https://user-images.githubusercontent.com/43908636/210015733-5a586db0-d108-45c1-ad59-f7274d8e1afe.png">

## What this is
A truly enlightening Angular and ASP.Net Core college assignment, featuring cringeworthy storytelling and careless use of Ubisoft IP.  
(I might come back one day and sweep the dozens of AC artworks I used to populate the database)  
  
  See also: https://github.com/Thurinum/brotherhood-server

### Technologies
- Angular
- Angular Material
- owl-carousel-o

### Guest features
- View public contracts
- View cities
- View statistics
- Log in

### Assassin features
- Log in to access assigned contracts
- View targets of public and assigned contracts
- Create new target and add to assigned contract
- Add existing target to assigned contract
- Create a contract
- View detaills of contract
- Cancel an assigned contract
- View, edit, and remove targets of assigned contracts
- Pardon a target (keep in database)
- Mark a target as eliminated (remove from database; fictitious scenario)
- Set a target as contract cover (its image is used as thumbnail)
- View other assassins
- Log out

### Mentor special features
- View public and private contracts alike
- Edit and remove any contract
- Edit and remove any target
- Add and remove assassins

### More features
- Asynchronous loading with visual feedback
- Image uploading on server
- Statistics on the database displayed as welcome screen
- Graphical management of database user management (MS Identity)
- Graphical handling of error responses returned by server

## Screenshots
### Private contracts
<img width="961" alt="image" src="https://user-images.githubusercontent.com/43908636/210015384-d3e42717-c8d7-41b6-b9be-75f009a5db41.png">

### Contract details
<img width="959" alt="image" src="https://user-images.githubusercontent.com/43908636/210014931-97dc4e41-c671-4668-922e-14934dc72ad7.png">

### Contract request for aid
<img width="580" alt="image" src="https://user-images.githubusercontent.com/43908636/210014996-43c1ea07-b5eb-42e0-9989-dde0b4bc6d0f.png">

### Contract add existing target
<img width="383" alt="image" src="https://user-images.githubusercontent.com/43908636/210015213-1fed9874-f96f-4fde-9b41-8e4cd1e95659.png">

### Target upsert
<img width="325" alt="image" src="https://user-images.githubusercontent.com/43908636/210015052-fc95e527-c5fd-4276-9d28-dac226f2eddc.png">

### Target disposal
<img width="510" alt="image" src="https://user-images.githubusercontent.com/43908636/210015277-a7592f26-9a6a-4c0d-8929-7f824f301b97.png">

### Authentication widget
<img width="292" alt="image" src="https://user-images.githubusercontent.com/43908636/210015148-d388794f-8bd0-4c19-b8ca-fefca2ea4ed2.png">

### Authentication role messages
<img width="365" alt="image" src="https://user-images.githubusercontent.com/43908636/210015331-5a01a62f-3d82-4112-b691-e245f6f52c4e.png">
<img width="349" alt="image" src="https://user-images.githubusercontent.com/43908636/210015322-6ede56c1-e73d-4bd5-b55a-b52e36df6bfd.png">

### Example of error handling
<img width="515" alt="image" src="https://user-images.githubusercontent.com/43908636/210015452-44dd1159-e142-4cae-8694-2c85af3c517f.png">



### Cities
Unused within the database (leftover from JulieSphere 2022). Images are fetched from a remote service.  
<img width="959" alt="image" src="https://user-images.githubusercontent.com/43908636/210015078-27ba22b3-e60d-491f-97a5-8d49eec5166b.png">


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

### Users (Passwords)
Arno (elise69)  
Ezio (requiescat in pace)  
Theodore (dioxus420)  

## Next steps
Stop using Angular, or any web frameworks, and install Qt.
