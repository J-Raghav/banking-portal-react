const baseUrl = 'http://localhost:25625';

export async function postRegisterForm(data){
    return new Promise(async (resolve, reject) => {
        try{
            let response = await fetch(baseUrl + '/api/customer/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            let responseBody  = await response.json()

            if(response.ok){
                resolve(responseBody)
            }else{
                reject({
                    message: responseBody.error 
                })
            }
        }catch(e){
            reject(e)
        }
    })
}

export async function postUpdateForm(data, options){
    return new Promise(async (resolve, reject) => {
        try{
            let response = await fetch(baseUrl + '/api/customer/update', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${options.token}` 
                },
                body: JSON.stringify(data)
            })
            console.log(response)
            let responseBody  = await response.json()
            console.log(responseBody)
            if(response.ok){
                resolve(responseBody)
            }else{
                reject({
                    message: responseBody.message 
                })
            }
        }catch(e){
            reject(e)
        }
    })
}

export async function postLoginForm(data){
    return new Promise(async (resolve, reject) => {
        try{
            let response = await fetch(baseUrl + '/api/customer/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            let responseBody  = await response.json()

            if(response.ok){
                resolve(responseBody)
            }else{
                reject({
                    message: responseBody.message 
                })
            }
        }catch(e){
            reject(e)
        }
    })
}

export async function postApplyLoanForm(data, options){
    return new Promise(async (resolve, reject) => {
        try{
            let response = await fetch(baseUrl + `/api/loan/apply/${data.loanType}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${options.token}` 

                },
                body: JSON.stringify(data)
            })
            let responseBody  = await response.json()
            if(response.ok){
                resolve(responseBody)
            }else{
                reject({
                    message: responseBody.message  
                    || <div>
                        {Object.keys(responseBody.errors).map((key, i) => 
                        <div key={i}>
                            {responseBody.errors[key][0]} 
                        </div>)}
                    </div>
                })
            }
        }catch(e){
            reject(e)
        }
    })
}