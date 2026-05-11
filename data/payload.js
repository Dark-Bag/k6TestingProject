
export const PAYLOAD ={
    login: {
    "email": "admin@gmail.com",
    "password": "@12345678"
    },

    
  testimonial: {

    "title": "Ndosi Automation Rocks!",
    "content": "Ndosi Automation is amazing!",
    "rating": 5,
    "isPublic": true

  },

  approvalStatus: {
    "isActive": true
  }
}

export function registrationPayload(email) {

    return {
        firstName: "QA",
        lastName: "InABag",
        email: email,
        password: "SecurePass#123",
        confirmPassword: "SecurePass#123",
        groupId: "1deae17a-c67a-4bb0-bdeb-df0fc9e2e526"
    };

}

export function newUserLoginPayload(email) {

    return {
        
        email: email,
        password: "SecurePass#123",
     
    };

}

