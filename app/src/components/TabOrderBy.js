import React, { Component } from 'react'
import FlatButton from 'material-ui/lib/flat-button'

class TabOrderBy extends Component {
    constructor(props) {
        super(props)
    }
    
    onTabClick(e) {
        console.log('on tab order click');
        this.props.onClick(this.props.orderBy)
    }
    
    render() {
        let selected = this.props.selectedTab === this.props.orderBy
        
        return (
            <FlatButton primary={selected} secondary={!selected} onFocus={this.onTabClick.bind(this)}>{this.props.text}</FlatButton>
        )
    }
}

export default TabOrderBy