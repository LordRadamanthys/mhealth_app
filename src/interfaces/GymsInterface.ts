export default interface GymsInterface{
    _id:string
    id_user:string
    name:string
    week:[WeekInterface]
}


export interface WeekInterface {
    name: string
	training :[TrainingModel]
}


export interface TrainingModel{
    name_training    :string
	number_series    :number    
	number_moviments :number
}