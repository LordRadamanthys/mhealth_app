export default interface RecentsInterface {

    exam: {
        id: number,
        id_user: number,
        doctors_name: string,
        date: string
    }


    vaccine: {
        id: number,
        id_user: number,
        title: string,
        date: string,
        local: string
    }


    gym: {
        id: number,
        id_users: number,
        name: string,
        day: string
    }
}

