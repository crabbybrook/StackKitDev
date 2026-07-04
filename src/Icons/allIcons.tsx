interface IconProp {
  size: 'sm' | 'md' | 'lg' | 'xl' | 'xs' | 'xxl'
}
const sizeVariable = {
  'xs': 'size-2',
  'sm': 'size-4',
  'md': 'size-6',
  'lg': 'size-8',
  'xl': 'size-12',
  'xxl': 'size-100',

}

export function Tools(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${sizeVariable[size]}`} viewBox="0 0 16 16">
    <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
  </svg>
}

export function Bolt(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${sizeVariable[size]}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>

}

export function Lock(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${sizeVariable[size]}`}>
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
  </svg>
}

export function Tick(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${sizeVariable[size]}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>


}

export function Cross(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${sizeVariable[size]}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
}

export function CsvTable(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${sizeVariable[size]}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
  </svg>

}

export function Shield(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${sizeVariable[size]}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>

}

export function Clock(props: IconProp) {
  const { size } = props

  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${sizeVariable[size]}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>

}

export function Json(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${sizeVariable[size]}`} viewBox="0 0 16 16">
    <path d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6M13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6" />
  </svg>
}

export function Regex(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${sizeVariable[size]}`} viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 1 1 .707.707m9.9-.707a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.314.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707M6 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0m5-6.5a.5.5 0 0 0-1 0v2.117L8.257 5.57a.5.5 0 0 0-.514.858L9.528 7.5 7.743 8.571a.5.5 0 1 0 .514.858L10 8.383V10.5a.5.5 0 1 0 1 0V8.383l1.743 1.046a.5.5 0 0 0 .514-.858L11.472 7.5l1.785-1.071a.5.5 0 1 0-.514-.858L11 6.617z" />
  </svg>
}

export function Arrow(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${sizeVariable[size]}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
  </svg>

}

export function Fire(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${sizeVariable[size]}`}>
    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" />
  </svg>

}

export function Heart(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${sizeVariable[size]}`}>
    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
  </svg>

}

export function BoltFill(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${sizeVariable[size]}`}>
    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
  </svg>

}

export function Link(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${sizeVariable[size]}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
  </svg>

}

export function Palette(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${sizeVariable[size]}`} viewBox="0 0 16 16">
    <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
    <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7" />
  </svg>
}

export function JSONFile(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${sizeVariable[size]}`} viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM4.151 15.29a1.2 1.2 0 0 1-.111-.449h.764a.58.58 0 0 0 .255.384q.105.073.25.114.142.041.319.041.245 0 .413-.07a.56.56 0 0 0 .255-.193.5.5 0 0 0 .084-.29.39.39 0 0 0-.152-.326q-.152-.12-.463-.193l-.618-.143a1.7 1.7 0 0 1-.539-.214 1 1 0 0 1-.352-.367 1.1 1.1 0 0 1-.123-.524q0-.366.19-.639.192-.272.528-.422.337-.15.777-.149.456 0 .779.152.326.153.5.41.18.255.2.566h-.75a.56.56 0 0 0-.12-.258.6.6 0 0 0-.246-.181.9.9 0 0 0-.37-.068q-.324 0-.512.152a.47.47 0 0 0-.185.384q0 .18.144.3a1 1 0 0 0 .404.175l.621.143q.326.075.566.211a1 1 0 0 1 .375.358q.135.222.135.56 0 .37-.188.656a1.2 1.2 0 0 1-.539.439q-.351.158-.858.158-.381 0-.665-.09a1.4 1.4 0 0 1-.478-.252 1.1 1.1 0 0 1-.29-.375m-3.104-.033a1.3 1.3 0 0 1-.082-.466h.764a.6.6 0 0 0 .074.27.5.5 0 0 0 .454.246q.285 0 .422-.164.137-.165.137-.466v-2.745h.791v2.725q0 .66-.357 1.005-.355.345-.985.345a1.6 1.6 0 0 1-.568-.094 1.15 1.15 0 0 1-.407-.266 1.1 1.1 0 0 1-.243-.39m9.091-1.585v.522q0 .384-.117.641a.86.86 0 0 1-.322.387.9.9 0 0 1-.47.126.9.9 0 0 1-.47-.126.87.87 0 0 1-.32-.387 1.55 1.55 0 0 1-.117-.641v-.522q0-.386.117-.641a.87.87 0 0 1 .32-.387.87.87 0 0 1 .47-.129q.265 0 .47.129a.86.86 0 0 1 .322.387q.117.255.117.641m.803.519v-.513q0-.565-.205-.973a1.46 1.46 0 0 0-.59-.63q-.38-.22-.916-.22-.534 0-.92.22a1.44 1.44 0 0 0-.589.628q-.205.407-.205.975v.513q0 .562.205.973.205.407.589.626.386.217.92.217.536 0 .917-.217.384-.22.589-.626.204-.41.205-.973m1.29-.935v2.675h-.746v-3.999h.662l1.752 2.66h.032v-2.66h.75v4h-.656l-1.761-2.676z" />
  </svg>
}

export function Incognito(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${sizeVariable[size]}`} viewBox="0 0 16 16">
    <path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205l-.014-.058-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5s-1.411-.136-2.025-.267c-.541-.115-1.093.2-1.239.735m.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a30 30 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274M3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5m-1.5.5q.001-.264.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085q.084.236.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5" />
  </svg>
}

export function Copyright(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${sizeVariable[size]}`} viewBox="0 0 16 16">
    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512" />
  </svg>
}

export function House(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${sizeVariable[size]} sm:${sizeVariable[size]}`}>
    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
  </svg>

}

export function ChevonUp(props: IconProp) {
  const { size } = props

  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${sizeVariable[size]}`}>
    <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
  </svg>

}
export function ChevonDown(props: IconProp) {
  const { size } = props

  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${sizeVariable[size]}`}>
    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
  </svg>

}

export function Key(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${sizeVariable[size]}`}>
    <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
  </svg>

}

export function Timezone(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${sizeVariable[size]}`}>
    <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
    <path fillRule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clipRule="evenodd" />
  </svg>

}

export function Rgb(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${sizeVariable[size]}`} viewBox="0 0 16 16">
    <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708zM2 12.707l7-7L10.293 7l-7 7H2z" />
  </svg>
}

export function Hex(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${sizeVariable[size]}`}>
    <path fillRule="evenodd" d="M11.097 1.515a.75.75 0 0 1 .589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 1 1 1.47.294L16.665 7.5h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.2 6h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103H3.75a.75.75 0 0 1 0-1.5h3.885l1.2-6H5.25a.75.75 0 0 1 0-1.5h3.885l1.08-5.397a.75.75 0 0 1 .882-.588ZM10.365 9l-1.2 6h4.47l1.2-6h-4.47Z" clipRule="evenodd" />
  </svg>

}

export function Sample(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${sizeVariable[size]}`} viewBox="0 0 16 16">
    <path d="M6.646 5.646a.5.5 0 1 1 .708.708L5.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708zm2.708 0a.5.5 0 1 0-.708.708L10.293 8 8.646 9.646a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708z" />
    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
  </svg>
}
export function Validate(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${sizeVariable[size]}`} viewBox="0 0 16 16">
    <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
  </svg>
}

export function Minify(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${sizeVariable[size]}`} viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707" />
  </svg>
}

export function Clear(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${sizeVariable[size]}`} viewBox="0 0 16 16">
    <path d="M9.854 5.146a.5.5 0 0 1 0 .708L7.707 8l2.147 2.146a.5.5 0 0 1-.708.708L7 8.707l-2.146 2.147a.5.5 0 0 1-.708-.708L6.293 8 4.146 5.854a.5.5 0 1 1 .708-.708L7 7.293l2.146-2.147a.5.5 0 0 1 .708 0" />
    <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.08a2 2 0 0 0 1.519-.698l4.843-5.651a1 1 0 0 0 0-1.302L10.6 1.7A2 2 0 0 0 9.08 1zm7.08 1a1 1 0 0 1 .76.35L14.682 8l-4.844 5.65a1 1 0 0 1-.759.35H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
  </svg>
}

export function Copy(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${sizeVariable[size]}`} viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
  </svg>
}

export function Run(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${sizeVariable[size]}`} viewBox="0 0 16 16">
    <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.8 1.8 0 0 1-.088.395l-.318.906.213.242a.8.8 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z" />
    <path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.8.8 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843.006-.067 1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z" />
  </svg>
}

export function Date(props: IconProp) {
  const { size } = props
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${sizeVariable[size]}`} viewBox="0 0 16 16">
    <path d="M6.445 11.688V6.354h-.633A13 13 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23" />
    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
  </svg>
}