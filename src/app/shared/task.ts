export class Task {
	constructor (
		//task identity
		public _id: any,
		public taskName: string,

		//task details
		public parent_id: string,
		public category: string,
		public description: string,
		public status: string,
		public priority: string,
		public duration: number,

		//task users
		public created_by: string,
		public finished_by: string,
		public assigned_to: string,
		
		//task timing
		public start_date: number,
		public created_at: number,
		public updated_at: number,
		public completed_at: number,
		public finish_date: number,

		public progress: number,
		public activity: any,

		public __v: any
	) {}

}