

export function verifyPassword(password: string) {
    if (password.length < 4 ) {
        return false
    } else {
        return true
    }
}


export function verifyEmail(email: string) {
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!email.match(regex)) {
        return false
    } else {
        return true
    }
}