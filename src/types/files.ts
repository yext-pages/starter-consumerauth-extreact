export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export enum LinkType {
	OTHER = "Other",
	URL = "URL",
	PHONE = "Phone",
	EMAIL = "Email",
}

export interface C_primaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_secondaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export default interface File {
	answer?: string,
	landingPageUrl?: string,
	nudgeEnabled?: boolean,
	primaryConversationContact?: any,
	question: string,
	slug?: string,
	logo?: ComplexImage,
	name: string,
	c_activeOnAnswers?: boolean,
	c_primaryCTA?: C_primaryCTA,
	c_secondaryCTA?: C_secondaryCTA,
	c_category?: string,
	keywords?: string[],
	id: string,
	timezone?: any,
}
