function WindowSizeListF({ url }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [items, setItems] = useState([])
  
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth)
    }
  
    // TODO: Update list when url changes or on mount
    // TODO: Setup resize event listener on mount
    // TODO: Cleanup resize event listener on un-mount
  
    return (
      <>
        <div>Window Width: {windowWidth}</div>
        {items.map(item => {
          return <div key={item}>{item}</div>
        })}
      </>
    )
  }