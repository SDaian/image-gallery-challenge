# ImageGalleryChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Technologies used

Built from the AngularCLI from scratch using v10.0.5, also using addons like 'url-template', ngx-spinner and rxJS.

## What I built

A grid view using css GRID layout, like you can see on the photos below, in this grid I'm using the cropped_picture which seems to be more ligthweight than the full_picture.
This grid view is encapsulated under the parent component named **grid-view.component**.

This component contain the main logic to show/hide, make animations or display the full image, which is displayed on a popup.

The other main parts of the app are the **auth.service** and **image-search.service** which contain the logic to renew/get the token to make the search and also the logic to maintain in the scope the pagination or the flag to search.

Also was implemented a **fully functional pagination** like we can see on the pictures below.

### Desktop views

![image](https://user-images.githubusercontent.com/14813235/109697825-759ff100-7b6d-11eb-977c-b9f52535e3ef.png)
![image](https://user-images.githubusercontent.com/14813235/109697969-9ff1ae80-7b6d-11eb-8b0f-36550722457f.png)


### Mobile views

![image](https://user-images.githubusercontent.com/14813235/109698298-08409000-7b6e-11eb-8341-ec3f304ff1bc.png)
![image](https://user-images.githubusercontent.com/14813235/109698076-be57aa00-7b6d-11eb-8826-ae696351b5f3.png)


## API Used

> POST /auth

> GET /images?page=2

> GET /images/${id}


## Any suggestion or feedback will be really welcome.
