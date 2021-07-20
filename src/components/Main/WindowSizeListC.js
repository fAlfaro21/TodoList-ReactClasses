class WindowSizeListC extends React.Component {
    constructor(props) {
      super(props)
      this.state = { 
        windowWidth: window.innerWidth, 
        items: [] }
      this.updateWindowWidth = this.updateWindowWidth.bind(this);
    }
  
    updateWindowWidth() {
      this.setState({ windowWidth: window.innerWidth })
    }
  
    componentDidMount() {
      window.addEventListener('resize', this.updateWindowWidth)
      this.setState({ items: CustomApi.getList(this.props.url) })
    }
  
    componentDidUpdate(prevProps) {
      if (prevProps.url !== this.props.url) {
        this.setState({ items: CustomApi.getList(this.props.url) })
      }
    }
  
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowWidth)
    }
  
    render() {
      return (
        <>
          <div>Window Width: {this.state.windowWidth}</div>
          {this.state.items.map(item => {
            return <div key={item}>{item}</div>
          })}
        </>
      )
    }
  }