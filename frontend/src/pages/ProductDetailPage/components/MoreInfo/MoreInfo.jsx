import React from 'react'
import Config from '../../../../components/config'

export default function MoreInfo({more_info}) {
  return (
    <> 
<ul className="icon-with-text">
    
{more_info.map((item) => (
 <li key={item.id} className="icon-with-text__item">
<img  src={`${Config.baseURL}${item?.image}`} alt={item?.name}  height="auto"width="auto" />
<div> <span className="h4 inline-richtext">  {item?.name}  </span>
<p className="inline-richtext">{item?.description}  </p>
</div> </li> ))}

 </ul>
 </>
  )
}
