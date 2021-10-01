const dummyLoginResponse = {
    name: 'Raghav',
    dateOfBirth: '01/01/2000',
    email: 'raghav@email.com',
    contactNumber: '1234567890',
    gender: 'M',
    martialStatus: 'single',
    identityDocType: 'PAN Card',
    identityDocNumber: 'PANINDIA1234'
}

export async function postRegisterForm(data){
    return new Promise((resolve, reject) => {
        if(data?.failFlag){
            reject({message: 'Testing Error Display'})
        }else{
            resolve(data)
        }
    })
}

export async function postUpdateForm(data){
    return new Promise((resolve, reject) => {
        if(data?.failFlag){
            reject({message: 'Testing Error Display'})
        }else{
            resolve(data)
        }
    })
}

export async function postLoginForm(data){
    return new Promise((resolve, reject) => {
        if(data.username.trim().toLowerCase() === 'admin' && data.password.trim().toLowerCase() === '123'){
            resolve(dummyLoginResponse)
        }
        else{
            reject({message: 'Invalid Username/Password'})
        }
    })
}
