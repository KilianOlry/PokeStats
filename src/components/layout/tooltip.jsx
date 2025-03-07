const Tooltip = ({content}) => {
  return (
    <div
      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out
                   absolute -bottom-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                   w-24 text-sm shadow-sm text-white font-medium rounded-bl-xl rounded-tr-xl py-2 px-1 text-center
                   gradient-red">
      {content}
    </div>
  )
}

export default Tooltip;