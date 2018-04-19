export class Future<T> {
    readonly promise : Promise<T>;

    protected internalResolve : ( value ?: T | PromiseLike<T> ) => void;

    protected internalReject : ( reason ?: any ) => void;

    constructor () {
        this.promise = new Promise<T>( ( resolve, reject ) => {
            this.resolve = resolve;
            this.reject = reject;
        } );
    }

    resolve ( value ?: T | PromiseLike<T> ) {
        setTimeout( () => {
            this.resolve( value );
        }, 0 );
    }

    reject ( reason ?: any ) {
        setTimeout( () => {
            this.reject( reason );
        }, 0 );
    }
}
