
import { QuickLink, QuickLinks } from '@/components/QuickLinks'
import  Requestappointments  from '@/components/Quotes/Requestappointments'
import  UserIdentity  from '@/components/Quotes/UserIdentity'
import  PdfViewerWithSignature  from '@/components/Quotes/PdfViewerWithSignature '
import  {ShiftNumber}  from '@/components/Quotes/ShiftNumber'

const tags = {
 
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = '', caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
  'quick-links': {
    render: QuickLinks,
  },
  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
  
 
  'request-appointments': {
     render: Requestappointments,
    
  },

  'user-identity': {
    render: UserIdentity,
   
 },

 'pdf-viewer-with-signature': {
  render: PdfViewerWithSignature,
 
},

 
'shift-number': {
  render: ShiftNumber,
 
},





 
}

export default tags
