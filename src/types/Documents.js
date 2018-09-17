// @flow

export type Document = {
  id: number,
  name: string,
  description: string,
  tx_hash: string,
  signature: string,
  registered: Date,
  doc_hash: string,
  dataId: string,
  mimeType: string,
}

export type EditingDocument = {
  id: number | null,
  name: string,
  description: string,
  dataId: string,
  mimeType: string,
}

export type PanthalassaDocument = {
  id: number,
  title: string,
  mime_type: string,
  content: string,
  description: string,
  tx_hash: string,
  signature: string,
}
