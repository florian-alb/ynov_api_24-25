export interface MessageCreateBody {
  sender: string;
  recipients: string[];
  subject: string;
  body: string;
}

export interface MessageUpdateBody {
  sender?: string;
  recipients?: string[];
  subject?: string;
  body?: string;
  folderId?: string;
}
