export enum FutureState {
    Pending, Fulfilled, Rejected
};

export class Future<T> {
    public static resolve <T> ( value ?: T | PromiseLike<T> ) : Future<T> {
        const future = new Future<T>();

        future.resolve( value );

        return future;
    }

    public static reject <T = never> ( reason ?: any ) : Future<T> {
        const future = new Future<T>();

        future.reject( reason );

        return future;
    }

    readonly promise : Promise<T>;

    private _state : FutureState = FutureState.Pending;

    public get isPending () : boolean { return this._state == FutureState.Pending }

    public get isFulfilled () : boolean { return this._state == FutureState.Fulfilled }

    public get isRejected () : boolean { return this._state == FutureState.Rejected }

    public get isResolved () : boolean { return this.isFulfilled || this.isRejected }

    constructor () {
        this.promise = new Promise<T>( ( resolve, reject ) => {
            this.resolve = ( value ) => {
                if ( this.isPending ) {
                    this._state = FutureState.Fulfilled;
                    
                    resolve( value );                    
                }
            };

            this.reject = ( reason ) => {
                if ( this.isPending ) {
                    this._state = FutureState.Rejected;
                    
                    reject( reason );
                }
            };
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
