import {Img} from 'react-image'
var ellipsis = require('text-ellipsis');

export default function PublisherRow({entity}) {
    let url = `/publisher/${entity.handle}`
    return (
      <a key={entity.handle} href={url} className="block flex flex-row rounded-lg shadow-lg overflow-hidden">
        <h3 className="p-5 mt-2 text-xl leading-7 font-semibold text-gray-900">
          {entity.name}
        </h3>
      </a>
    )
  }