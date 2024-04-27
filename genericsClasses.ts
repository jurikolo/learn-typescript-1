class GenericResponse<D, E> {
    data?: D;
    error?: E;

    constructor(data?: D, error?: E) {
        if(data) {
            this.data = data;
        }
        if(error) {
            this.error = error;
        }
    }
}

const myGenericResponse = new GenericResponse<string, number>('data', 0);
const myGenericResponseWithoutError = new GenericResponse<string, number>('data');

class GenericHttpResponse<F> extends GenericResponse<string, number> {
    code: number;
    customMessage: F;

    setCode(code: number) {
        this.code = code;
    }
}

const myHttpResponse = new GenericHttpResponse<string>('aaa', 5);
myHttpResponse.setCode(55);
myHttpResponse.customMessage = 'my message';