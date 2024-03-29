# Skinet
Course repository for the Skinet app created on .Net 5.0 and Angular 12.
Guided by Neil Cummings. Udemy Course here:

[Udemy course](https://www.udemy.com/course/learn-to-build-an-e-commerce-app-with-net-core-and-angular/?couponCode=FD17A0D1131925BE0179)

## Projects

API - Contains the controllers

Core - Contains all the entities + Interfaces

Infrastructure - Contains all the Repository, DbContext and Services classes.

## Very Useful Resources applied for this project

Csv to Json
```
https://csvjson.com/csv2json
```

Ngx Bootstrap
```
https://valor-software.com/ngx-bootstrap/
```

Bootstrap (4.6)
```
https://getbootstrap.com/docs/4.6/getting-started/introduction/
```

Flexbox Froggy - Juego para aprender Flexbox
```
https://flexboxfroggy.com/
```

JSON to TS
```
http://json2ts.com/
```

ngxToast
```
https://github.com/scttcper/ngx-toastr
```

xng-breadcrum
```
https://github.com/udayvunnam/xng-breadcrumb
```

bootswatch
```
https://bootswatch.com/
```

ngx-spinner
```
https://www.npmjs.com/package/ngx-spinner
```

Redis.io. 
```
https://redis.io/
```

Nota: En este proyecto se usa docker con un archivo docker-compose.yml.
De modo que se ejecuta en raiz de la solucion lo siguiente
```
docker-compose up --detach
```

uuid package
```
https://www.npmjs.com/package/uuid
```

Regular Expression Library
```
https://regexlib.com/
```

Disable Typescript's strict property initialization flag
```
https://www.angularjswiki.com/angular/property-has-no-initializer-and-is-not-definitely-assigned-in-the-constructor/
```

Stripe Dev dashboard
```
https://dashboard.stripe.com/test/developers
```

Testing Cards:
```
Success:                4111111111111111
Insufficient funds:     4000000000009995
With 3D Secure Page:    4000002760003184
``` 

For testing
```
stripe listen -f https://localhost:5001/api/payments/webhook -e payment_intent.succeeded,payment_intent.payment_failed
``` 
