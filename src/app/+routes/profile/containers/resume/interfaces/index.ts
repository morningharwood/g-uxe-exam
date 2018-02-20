export interface ResumeHeader {
  title: string;
  jobTitle: string;
  description: string;
  website: string;
  email: string;
  phoneNumber: string;
}



export interface ResumeAsideBlock {
  headline: string;
  description: string[];
}

export interface ResumeAsideBlock {
  headline: string;
  description: string[];
}

export interface ResumeAsideSocial {
  title: string;
  link: string;
}

export interface Resume {
  header: ResumeHeader;
  body: ResumeBlock[];
  aside: ResumeAsideBlock[] | ResumeAsideSocial[];
}


export interface ResumeBlock {
  place: string;
  dateRange: string;
  title: string;
  jobDescription?: string;
  url?: string;
}
