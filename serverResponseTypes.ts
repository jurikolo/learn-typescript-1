export interface MyPayment {
    sum: number,
    from: number,
    to: number
}

export enum MyPaymentStatus {
    Success = "success",
    Failed = "failed"
}

export interface MyDataSuccess {
    databaseId: number
}

export interface MyDataFailed extends MyPayment {
    errorMessage: string,
    errorCode: number
}

export interface MyRequest extends MyPayment { }

export interface MyResponse {
    status: MyPaymentStatus,
    data: MyDataSuccess | MyDataFailed
}

// solution above is not the best, as TypeScript cannot understand which data interface to use depending on status value
// see better approach below
export interface MyResponseSuccess {
    status: MyPaymentStatus.Success;
    data: MyDataSuccess;
}

export interface MyResponseFailed {
    status: MyPaymentStatus.Failed;
    data: MyDataFailed;
}

// function get(): MyResponseSuccess | MyResponseFailed {}

// type guarding the response
function isMyResponseSuccess(response: MyResponseSuccess | MyResponseFailed): response is MyResponseSuccess {
    if (response.status === MyPaymentStatus.Success) {
        return true;
    }
    return false;
}

function getIdFromResponse(response: MyResponseSuccess | MyResponseFailed): number {
    if (isMyResponseSuccess(response)) {
        return response.data.databaseId;
    } else {
        throw new Error(response.data.errorMessage);
    }
}