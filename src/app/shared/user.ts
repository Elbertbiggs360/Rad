export class User {
	constructor (
		public _id: string,
		public email: string,
		public first_name: string,
		public last_name: string,
		public profile_pic_url: string,
		public gender: string,
		public is_active: boolean,
		public role: string,
		public senior: string
	) {}
}