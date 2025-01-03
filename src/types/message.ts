export interface MessageCreateBody {
  recipients: string[];
  subject: string;
  body: string;
}

export interface MessageUpdateBody {
  recipients?: string[];
  subject?: string;
  body?: string;
}
