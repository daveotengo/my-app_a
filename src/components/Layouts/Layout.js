import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

// const layout = (props) => (
//     <Aux>
        
//         <ToolBar />
//         <SideDrawer />

//         <main className={classes.Content}>{props.children}</main>
//     </Aux>
// );

class Layout extends React.Component {
    state = {
      showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
      this.setState({
        showSideDrawer: false
      })
    }
  
    //use prevState as the clean way to set state when it depends on the old state
    sideDrawerToggleHandler = () => {
      this.setState((prevState) => {
        return {showSideDrawer: !prevState.showSideDrawer}
      });
    }

    render(){ 
        return(
    <Aux>
        
        <ToolBar 
        isAuth={this.props.isAuthenticated}
        drawerToggleClick={this.sideDrawerToggleHandler} />
        <SideDrawer 
        isAuth={this.props.isAuthenticated}
        open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />

        <main className={classes.Content}>{this.props.children}</main>
    </Aux>
        )
    
}
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}
export default connect(mapStateToProps)(Layout);
//export default  Layout;