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
		public finished_by: any,
		public assigned_to: string,
		
		//task timing
		public start_date: any,
		public created_at: any,
		public updated_at: any,
		public completed_at: any,

		public __v: any
	) {}

}