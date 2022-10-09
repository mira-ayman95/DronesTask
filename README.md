# Drone Manager

We have a fleet of 10 drones. A drone is capable of carrying devices, other than cameras, and capable of delivering small loads. For our use case the load is medications.


## prerequisite
you need to install the following packages :-
- npm 
- node 16
- docker 


## Setup env
 Make sure that you have environment files, I will be sending it along with the project.

## Run application
run the following command to get the server and the database up 
```
npm run docker:up
```
## Run tests
 If you want to run the tests please run the following commands 
 ```
 npm i
 npm test 
 ```

## Design notes
 Drone state should change when loading medication for example 
- at the beginning drone state will be idle
- when load medications drone state will be loading
- when drone reached max weight limit drone state will be loaded 
- also the rest of states didn't implemented in my APIs (DELIVERING, DELIVERED, RETURNING)

## Notes: 
https://www.postman.com/collections/6ab2624bf271d2a644b3