import type { StructureResolver } from 'sanity/structure'

/**
 * Desk structure. siteSettings is presented as a singleton (one editable
 * document, no list), and everything else is a normal document list.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings'),
        ),
      S.divider(),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('topic').title('Topics'),
      S.documentTypeListItem('prediction').title('Predictions'),
      S.documentTypeListItem('signal').title('Signals'),
    ])
