# Future

> Simple TypeScript/ES2015 class to allow to create a promise and to be resolved/rejected later

# Installation
```shell
npm install --save data-future
```

# Usage
```typescript
import { Future } from 'data-future';

const future = new Future<number>();

futrue.promise.then( number => console.log( number ) ); // 1

// Can be called anytime after instantiating a Future object
future.resolve( 1 );
```

```typescript
import { Future } from 'data-future';

const future = new Future<number>();

futrue.promise.catch( err => console.error( err ) ); // Error {}

// Can be called anytime after instantiating a Future object
future.reject( new Error() );
```
