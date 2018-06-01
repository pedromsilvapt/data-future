export enum FutureState {
    Pending, Fulfilled, Rejected
};

export class Future<T> {
    readonly promise : Promise<T>;

    private _state : FutureState;

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
