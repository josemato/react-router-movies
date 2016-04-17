import React, { Component } from 'react'
import FlatButton from 'material-ui/lib/flat-button'

class TabOrderBy extends Component {
    constructor(props) {
        super(props)
    }
    
    onTabClick(e) {
        this.props.onClick(this.props.orderBy)
    }
    
    render() {
        return (
            <FlatButton primary={this.props.selected} secondary={!this.props.selected} onFocus={this.onTabClick.bind(this)}>{this.props.text}</FlatButton>
        )
    }
}

TabOrderBy.propTypes = {
    selected: React.PropTypes.bool.isRequired,
    text: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
}

export default TabOrderBy